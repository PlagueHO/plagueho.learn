/**
 * Check the dependency-free server copied into presentation release ZIP files.
 * Parameters: none.
 * Usage: node --test scripts/serve-presentation.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn, execFile } from 'node:child_process';
import { once } from 'node:events';
import { cp, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { createPreviewServer, startPreviewServer } from './serve-presentation.mjs';

const execute = promisify(execFile);

async function fixture() {
  const folder = await mkdtemp(join(tmpdir(), 'presentation-server-'));
  const deck = join(folder, 'deck');
  await mkdir(deck);
  await writeFile(join(deck, 'index.html'), '<html><body>Offline presentation</body></html>');
  await writeFile(join(deck, 'presentation.mjs'), 'export const offline = true;\n');
  await cp(new URL('./serve-presentation.mjs', import.meta.url), join(deck, 'serve.mjs'));
  return {
    folder, deck,
    remove: () => rm(folder, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }),
  };
}

async function closeServer(server) {
  await new Promise(resolve => {
    server.close(resolve);
    server.closeAllConnections();
  });
}

test('server serves an explicit folder and rejects traversal, invalid URLs, and writes', async t => {
  const { deck, remove } = await fixture();
  const server = createPreviewServer(deck);
  t.after(async () => {
    await closeServer(server);
    await remove();
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  const home = await fetch(`${base}/?print-pdf`);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Offline presentation/);
  const module = await fetch(`${base}/presentation.mjs`);
  assert.equal(module.status, 200);
  assert.equal(module.headers.get('content-type'), 'text/javascript; charset=utf-8');
  assert.equal(module.headers.get('x-content-type-options'), 'nosniff');
  const head = await fetch(`${base}/presentation.mjs`, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  for (const path of ['/..%2findex.html', '/..%5cindex.html']) {
    assert.equal((await fetch(`${base}${path}`)).status, 403, path);
  }
  const invalidUrlLog = t.mock.method(console, 'error', () => {});
  try {
    assert.equal((await fetch(`${base}/%zz`)).status, 400);
    assert.equal(invalidUrlLog.mock.callCount(), 1);
    assert.equal(invalidUrlLog.mock.calls[0].arguments[0], 'Invalid preview request URL:');
  } finally {
    invalidUrlLog.mock.restore();
  }
  assert.equal((await fetch(`${base}/missing`)).status, 404);
  assert.equal((await fetch(`${base}/`, { method: 'POST' })).status, 405);
});

test('copied release server uses its own folder without npm packages or repository imports', {
  timeout: 15000,
}, async t => {
  const { folder, deck, remove } = await fixture();
  const reservation = createPreviewServer(deck);
  reservation.listen(0, '127.0.0.1');
  await once(reservation, 'listening');
  const port = reservation.address().port;
  await closeServer(reservation);
  const child = spawn(process.execPath, [join(deck, 'serve.mjs'), String(port)], {
    cwd: folder, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  });
  t.after(async () => {
    if (child.exitCode === null && child.signalCode === null) {
      const closed = once(child, 'close');
      child.kill();
      await closed;
    }
    await remove();
  });
  let stderr = '';
  child.stderr.on('data', data => { stderr += data; });
  const output = await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', code => reject(new Error(`Server exited with ${code}: ${stderr}`)));
    child.stdout.once('data', data => resolve(data.toString()));
  });
  assert.match(output, new RegExp(`http://127\\.0\\.0\\.1:${port}`));
  const response = await fetch(`http://127.0.0.1:${port}/`);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Offline presentation/);
  const module = await fetch(`http://127.0.0.1:${port}/presentation.mjs`);
  assert.equal(module.status, 200);
  assert.match(module.headers.get('content-type'), /javascript/);
  assert.equal(stderr, '');
});

test('invalid ports fail before the server starts', async t => {
  const { deck, remove } = await fixture();
  t.after(remove);
  for (const value of [0, -1, 65536, 1.5, NaN]) {
    assert.throws(() => startPreviewServer(deck, value), /Port must be an integer from 1 to 65535/);
  }
  await assert.rejects(execute(process.execPath, [join(deck, 'serve.mjs'), 'invalid']), error => {
    assert.equal(error.code, 1);
    assert.match(error.stderr, /Port must be an integer from 1 to 65535/);
    return true;
  });
});

test('an occupied port produces a visible startup error and a failing exit code', async t => {
  const { deck, remove } = await fixture();
  const server = createPreviewServer(deck);
  t.after(async () => {
    await closeServer(server);
    await remove();
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  await assert.rejects(execute(process.execPath, [
    join(deck, 'serve.mjs'), String(server.address().port),
  ]), error => {
    assert.equal(error.code, 1);
    assert.match(error.stderr, /Presentation preview failed:[\s\S]*EADDRINUSE/);
    return true;
  });
});
