/**
 * Serve the built HVE presentation on the local loopback interface.
 * Parameters: optional port argument (default 3043).
 * Usage: npm run preview -- 3043
 */
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createPreviewServer as createServer, startPreviewServer } from '../../scripts/serve-presentation.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), 'dist');

export function createPreviewServer() {
  return createServer(root);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  startPreviewServer(root, Number(process.argv[2] ?? 3043));
}
