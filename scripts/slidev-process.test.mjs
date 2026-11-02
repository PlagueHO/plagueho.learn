/**
 * Purpose: Check shell-free Slidev execution, output, failures, and timeouts.
 * Parameters: none. Tests use an isolated fake Slidev package.
 * Usage: node --test scripts/slidev-process.test.mjs
 */
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { runSlidev, spawnSlidev } from '../.github/extensions/slidev-presentation-studio/slidev-process.mjs';

async function workspace(t, script) {
  const root = await mkdtemp(path.join(tmpdir(), 'slidev space & %PATH%-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const packageRoot = path.join(root, 'node_modules', '@slidev', 'cli');
  await mkdir(path.join(packageRoot, 'bin'), { recursive: true });
  await writeFile(path.join(root, 'package.json'), '{}');
  await writeFile(path.join(packageRoot, 'package.json'), '{"name":"@slidev/cli"}');
  await writeFile(path.join(packageRoot, 'bin', 'slidev.mjs'), script);
  return root;
}

test('passes paths and metacharacters as literal arguments without a shell', async t => {
  const root = await workspace(t, 'console.log(JSON.stringify({ args: process.argv.slice(2), cwd: process.cwd() }));');
  const args = [
    'build', path.join(root, 'deck with spaces', 'slides.md'),
    '& echo injected', 'a|b', '$(echo injected)', '%PATH%', '"quoted"', 'line\nbreak',
  ];
  const result = await runSlidev(args, root);
  assert.equal(result.success, true);
  assert.deepEqual(JSON.parse(result.output), { args, cwd: root });
  assert.equal(result.timedOut, false);
});

test('runs the installed entry point even when PATH and ComSpec cannot launch a shell', async t => {
  const root = await workspace(t, 'console.log("installed Slidev");');
  const previousPath = process.env.PATH;
  const previousComSpec = process.env.ComSpec;
  t.after(() => {
    if (previousPath === undefined) delete process.env.PATH;
    else process.env.PATH = previousPath;
    if (previousComSpec === undefined) delete process.env.ComSpec;
    else process.env.ComSpec = previousComSpec;
  });
  process.env.PATH = '';
  process.env.ComSpec = path.join(root, 'missing-shell.exe');
  const result = await runSlidev(['build'], root);
  assert.equal(result.success, true);
  assert.equal(result.output, 'installed Slidev');
});

test('captures stderr and reports a failed build', async t => {
  const root = await workspace(t, 'console.error("Invalid deck"); process.exitCode = 2;');
  const result = await runSlidev(['build'], root);
  assert.equal(result.success, false);
  assert.equal(result.output, 'Invalid deck');
  assert.equal(result.timedOut, false);
});

test('limits retained command output', async t => {
  const root = await workspace(t, 'process.stdout.write("x".repeat(20_000));');
  const result = await runSlidev(['build'], root);
  assert.equal(result.success, true);
  assert.equal(result.output, 'x'.repeat(12_000));
});

test('kills a build at its timeout and does not report success', async t => {
  const root = await workspace(t, 'setInterval(() => {}, 1_000);');
  const result = await runSlidev(['build'], root, 100);
  assert.equal(result.success, false);
  assert.equal(result.timedOut, true);
});

test('reports a missing Slidev dependency instead of falling back to a global command', async t => {
  const root = await workspace(t, '');
  await rm(path.join(root, 'node_modules'), { recursive: true });
  await assert.rejects(runSlidev(['build'], root), { code: 'MODULE_NOT_FOUND' });
});

test('reports a failed process launch without waiting for the timeout', async t => {
  const root = await workspace(t, '');
  const previousExecPath = process.execPath;
  t.after(() => { process.execPath = previousExecPath; });
  process.execPath = path.join(root, 'missing-node.exe');
  const result = await runSlidev(['build'], root);
  assert.equal(result.success, false);
  assert.match(result.output, /ENOENT/);
  assert.equal(result.timedOut, false);
});

test('returns the direct process handle for preview shutdown', async t => {
  const root = await workspace(t, 'console.log("ready"); setInterval(() => {}, 1_000);');
  const child = spawnSlidev(['--port', '12345'], root);
  t.after(() => { if (child.exitCode === null) child.kill(); });
  const [chunk] = await once(child.stdout, 'data');
  assert.equal(chunk.toString().trim(), 'ready');
  const closed = once(child, 'close');
  assert.equal(child.kill(), true);
  await closed;
});
