/**
 * Purpose: Verify app task coverage, isolated builds, and attached process behavior.
 * Parameters: none. Tests use temporary fake presentation commands.
 * Usage: node --test scripts/presentation-task.test.mjs
 */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { presentationPlan, presentations } from './presentation-task.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const runner = join(root, 'scripts', 'presentation-task.mjs');
const processModule = new URL('./presentation-task.mjs', import.meta.url).href;
const reveal = 'hypervelocity-engineering-ai-sdlc-is-not-enough';

async function fixture(t, script) {
  const folder = await mkdtemp(join(tmpdir(), 'presentation task & spaces-'));
  t.after(() => rm(folder, { recursive: true, force: true }));
  const file = join(folder, 'command.mjs');
  await writeFile(file, script);
  return { folder, file };
}

function stepProcess(file, cwd) {
  return spawn(process.execPath, ['--input-type=module', '-e',
    `import { runStep } from ${JSON.stringify(processModule)};
     await runStep(${JSON.stringify({ format: 'node', args: [file], cwd })});`],
  { stdio: ['ignore', 'pipe', 'pipe'] });
}

test('every deck has build and run tasks and a unique preferred port', async () => {
  const entries = await readdir(join(root, 'presentations'), { withFileTypes: true });
  const decks = [];
  for (const entry of entries.filter(item => item.isDirectory())) {
    const files = await readdir(join(root, 'presentations', entry.name));
    if (files.includes('slides.md') || entry.name === reveal) decks.push(entry.name);
  }
  assert.deepEqual(presentations.map(item => item.name).sort(), decks.sort());
  assert.equal(new Set(presentations.map(item => item.port)).size, presentations.length);
  const config = (await readFile(join(root, '.github', 'github-app.yml'), 'utf8')).replaceAll('\r\n', '\n');
  for (const deck of presentations) {
    for (const action of ['build', 'run']) assert.ok(config.includes(`command: node scripts/presentation-task.mjs ${action} ${deck.name}\n`));
  }
  assert.doesNotMatch(config, /triggers:|session\.create|session\.archive/);
  assert.match(config, /auto_open_in_browser: true/);
  assert.match(config, /command: node --test scripts\/serve-presentation\.test\.mjs/);
  assert.ok(config.includes(`command: node scripts/presentation-task.mjs test ${reveal}\n`));
  const pattern = config.match(/server_ready_pattern: '([^']+)'/)[1];
  for (const output of ['Local: http://localhost:3032/', 'Presentation preview: http://127.0.0.1:3043']) {
    assert.match(output.match(new RegExp(pattern))[1], /^http:\/\/(?:localhost|127\.0\.0\.1):\d+\/?$/);
  }
});

test('Slidev builds have isolated portable outputs and previews do not open an external browser', () => {
  const folder = join(tmpdir(), 'workspace with spaces & symbols');
  for (const deck of presentations.filter(item => item.format === 'slidev')) {
    const [build] = presentationPlan('build', deck.name, folder);
    assert.deepEqual(build.args, ['build', join(folder, 'presentations', deck.name, 'slides.md'),
      '--base', './', '--out', join(folder, 'presentations', deck.name, 'dist')]);
    const [run] = presentationPlan('run', deck.name, folder);
    assert.deepEqual(run.args, [join(folder, 'presentations', deck.name, 'slides.md'), '--port', String(deck.port)]);
    assert.equal(run.cwd, folder);
    assert.ok(!run.args.includes('--open'));
    assert.ok(!run.args.includes('--remote'));
  }
});

test('Reveal run and test rebuild before serving or testing', () => {
  const folder = join(root, 'presentations', reveal);
  assert.deepEqual(presentationPlan('run', reveal), [
    { format: 'node', args: [join(folder, 'build.mjs')], cwd: folder },
    { format: 'node', args: [join(folder, 'serve.mjs'), '3043'], cwd: folder },
  ]);
  assert.deepEqual(presentationPlan('test', reveal), [
    { format: 'node', args: [join(folder, 'build.mjs')], cwd: folder },
    { format: 'node', args: ['--test', join(folder, 'deck.test.mjs'), join(folder, 'presenter-controls.test.mjs')],
      cwd: folder },
  ]);
  assert.equal(presentationPlan('build', reveal).length, 1);
});

test('unknown actions and deck names fail before any process starts', async () => {
  assert.throws(() => presentationPlan('stop', reveal), /Unknown action/);
  assert.throws(() => presentationPlan('build', '../anything'), /Unknown presentation/);
  assert.throws(() => presentationPlan('test', 'template'), /No test task is configured/);
  const child = spawn(process.execPath, [runner, 'build', 'missing-deck']);
  let errors = '';
  child.stderr.on('data', chunk => { errors += chunk; });
  const [code] = await once(child, 'close');
  assert.equal(code, 1);
  assert.match(errors, /Presentation task failed: Unknown presentation/);
});

test('attached steps preserve output, cwd, and failures', async t => {
  const { folder, file } = await fixture(t,
    'console.log("cwd=" + process.cwd()); console.error("build failed"); process.exitCode = 7;');
  const child = stepProcess(file, folder);
  let output = '', errors = '';
  child.stdout.on('data', chunk => { output += chunk; });
  child.stderr.on('data', chunk => { errors += chunk; });
  const [code] = await once(child, 'close');
  assert.notEqual(code, 0);
  assert.match(output, new RegExp(`cwd=${folder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
  assert.match(errors, /build failed/);
  assert.match(errors, /exited with code 7/);
});

test('stopping an attached step stops its server child', { timeout: 10000 }, async t => {
  const { folder, file } = await fixture(t,
    'console.log("ready " + process.pid); setInterval(() => {}, 1000);');
  const child = stepProcess(file, folder);
  t.after(() => { if (child.exitCode === null) child.kill(); });
  const [chunk] = await once(child.stdout, 'data');
  assert.match(chunk.toString(), /ready/);
  const serverPid = Number(chunk.toString().match(/ready (\d+)/)[1]);
  const closed = once(child, 'close');
  if (process.platform === 'win32') {
    const kill = spawn('taskkill', ['/PID', String(child.pid), '/T', '/F']);
    const [code] = await once(kill, 'close');
    assert.equal(code, 0);
  } else child.kill('SIGTERM');
  const [code] = await closed;
  assert.notEqual(code, 0);
  assert.throws(() => process.kill(serverPid, 0), { code: 'ESRCH' });
});
