/**
 * Purpose: Restore the pinned Impeccable skill link after submodule initialization.
 * Parameters: none. Windows uses a junction; other platforms use a relative symbolic link.
 * Usage: node scripts/link-impeccable.mjs
 */
import { lstat, readFile, realpath, symlink, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const destination = path.join(root, '.github', 'skills', 'impeccable');
const source = path.join(root, 'vendor', 'impeccable', '.github', 'skills', 'impeccable');
const target = path.relative(path.dirname(destination), source).split(path.sep).join('/');

await readFile(path.join(source, 'SKILL.md'), 'utf8');

let entry;
try {
  entry = await lstat(destination);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

if (entry?.isSymbolicLink() || entry?.isDirectory()) {
  if (await realpath(destination) !== await realpath(source)) {
    throw new Error(`Refusing to replace a different installation at ${destination}`);
  }
  console.log('Impeccable already links to the pinned submodule.');
} else {
  if (entry) {
    if (!entry.isFile() || (await readFile(destination, 'utf8')).trim() !== target) {
      throw new Error(`Refusing to replace an unrelated file at ${destination}`);
    }
    // Git writes the link target as a file when core.symlinks is false.
    await unlink(destination);
  }
  await symlink(process.platform === 'win32' ? source : target, destination,
    process.platform === 'win32' ? 'junction' : 'dir');
  console.log('Impeccable now links to the pinned submodule.');
}
