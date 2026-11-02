/**
 * Purpose: Check portable Impeccable setup without replacing unrelated files.
 * Parameters: none. Tests create isolated checkout layouts.
 * Usage: node --test scripts/link-impeccable.test.mjs
 */
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { copyFile, mkdtemp, mkdir, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import test from 'node:test';

const execFileAsync = promisify(execFile);
const linkTarget = '../../vendor/impeccable/.github/skills/impeccable';

async function workspace(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'impeccable-link-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const destination = path.join(root, '.github', 'skills', 'impeccable');
  const source = path.join(root, 'vendor', 'impeccable', '.github', 'skills', 'impeccable');
  await mkdir(path.dirname(destination), { recursive: true });
  await mkdir(source, { recursive: true });
  await mkdir(path.join(root, 'scripts'));
  await copyFile(path.resolve('scripts', 'link-impeccable.mjs'), path.join(root, 'scripts', 'link-impeccable.mjs'));
  await writeFile(path.join(source, 'SKILL.md'), 'Pinned skill\n');
  const run = () => execFileAsync(process.execPath, [path.join(root, 'scripts', 'link-impeccable.mjs')]);
  return { root, destination, source, run };
}

test('creates a usable link and is safe to rerun', async t => {
  const { destination, source, run } = await workspace(t);
  await run();
  assert.equal(await realpath(destination), await realpath(source));
  assert.equal(await readFile(path.join(destination, 'SKILL.md'), 'utf8'), 'Pinned skill\n');
  assert.match((await run()).stdout, /already links/);
});

test('restores a Git link placeholder when Windows disables symbolic links', async t => {
  const { destination, source, run } = await workspace(t);
  await writeFile(destination, linkTarget);
  await run();
  assert.equal(await realpath(destination), await realpath(source));
});

test('refuses to replace an unrelated file', async t => {
  const { destination, run } = await workspace(t);
  await writeFile(destination, 'User-owned file');
  await assert.rejects(run(), /Refusing to replace an unrelated file/);
  assert.equal(await readFile(destination, 'utf8'), 'User-owned file');
});

test('refuses to replace a different skill installation', async t => {
  const { destination, run } = await workspace(t);
  await mkdir(destination);
  await writeFile(path.join(destination, 'SKILL.md'), 'User-owned skill');
  await assert.rejects(run(), /Refusing to replace a different installation/);
  assert.equal(await readFile(path.join(destination, 'SKILL.md'), 'utf8'), 'User-owned skill');
});

test('does not remove the Git placeholder when the submodule is not initialized', async t => {
  const { destination, source, run } = await workspace(t);
  await rm(source, { recursive: true });
  await writeFile(destination, linkTarget);
  await assert.rejects(run(), /ENOENT/);
  assert.equal(await readFile(destination, 'utf8'), linkTarget);
});
