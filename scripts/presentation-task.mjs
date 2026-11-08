/**
 * Purpose: Build or run a presentation from the GitHub Copilot app without a shell.
 * Parameters: build|run|test <deck>, build-all, or list. Test is available for Reveal.js.
 * Usage: node scripts/presentation-task.mjs run hypervelocity-engineering
 */
import { spawn } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSlidev } from '../.github/extensions/slidev-presentation-studio/slidev-process.mjs';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const presentations = [
  { name: 'agentic-development-evolution', format: 'slidev', port: 3030 },
  { name: 'agentic-dotnet-appmod', format: 'slidev', port: 3031 },
  { name: 'hypervelocity-engineering', format: 'slidev', port: 3032 },
  { name: 'microsoft-iq-foundry-agent-best-practices', format: 'slidev', port: 3033 },
  { name: 'speckit', format: 'slidev', port: 3034 },
  { name: 'template', format: 'slidev', port: 3035 },
  { name: 'hypervelocity-engineering-ai-sdlc-is-not-enough', format: 'reveal', port: 3043 },
];

export function presentationPlan(action, name, root = repositoryRoot) {
  if (!['build', 'run', 'test'].includes(action)) throw new Error(`Unknown action: ${action}. Use build, run, or test.`);
  const deck = presentations.find(item => item.name === name);
  if (!deck) throw new Error(`Unknown presentation: ${name}. Use list to see available decks.`);
  const folder = join(root, 'presentations', deck.name);
  if (deck.format === 'slidev') {
    if (action === 'test') throw new Error(`No test task is configured for ${name}.`);
    const entry = join(folder, 'slides.md');
    return [{
      format: 'slidev',
      args: action === 'build'
        ? ['build', entry, '--base', './', '--out', join(folder, 'dist')]
        : [entry, '--port', String(deck.port)],
      cwd: root,
    }];
  }
  const steps = [{ format: 'node', args: [join(folder, 'build.mjs')], cwd: folder }];
  if (action === 'run') steps.push({
    format: 'node', args: [join(folder, 'serve.mjs'), String(deck.port)], cwd: folder,
  });
  if (action === 'test') steps.push({
    format: 'node', args: ['--test', join(folder, 'deck.test.mjs'), join(folder, 'presenter-controls.test.mjs')],
    cwd: folder,
  });
  return steps;
}

export function runStep(step) {
  return new Promise((resolveStep, reject) => {
    const child = step.format === 'slidev'
      ? spawnSlidev(step.args, step.cwd)
      : spawn(process.execPath, step.args, { cwd: step.cwd, shell: false, windowsHide: true });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    const interrupt = () => child.kill('SIGINT');
    const terminate = () => child.kill('SIGTERM');
    process.on('SIGINT', interrupt);
    process.on('SIGTERM', terminate);
    child.once('error', reject);
    child.once('close', (code, signal) => {
      process.off('SIGINT', interrupt);
      process.off('SIGTERM', terminate);
      if (code === 0) resolveStep();
      else reject(new Error(`Presentation command ${signal ? `stopped by ${signal}` : `exited with code ${code}`}.`));
    });
  });
}

export async function main(args) {
  const [action, name, ...extra] = args;
  if (extra.length || (['list', 'build-all'].includes(action) && name !== undefined)) {
    throw new Error('Usage: presentation-task.mjs build|run|test <deck>, build-all, or list.');
  }
  if (action === 'list') {
    for (const deck of presentations) console.log(`${deck.name} (${deck.format}, preferred port ${deck.port})`);
    return;
  }
  if (action === 'build-all') {
    for (const deck of presentations) {
      console.log(`Building ${deck.name}`);
      for (const step of presentationPlan('build', deck.name)) await runStep(step);
    }
    return;
  }
  for (const step of presentationPlan(action, name)) await runStep(step);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch(error => {
    console.error(`Presentation task failed: ${error.message}`);
    process.exitCode = 1;
  });
}
