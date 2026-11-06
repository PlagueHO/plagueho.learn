/**
 * Minimal QR Code encoder for short links.
 * Purpose: draw dependency-free QR codes as static SVG when the deck is built.
 * Scope: byte mode (UTF-8), error correction level M, versions 1 to 6 (up to 106 bytes).
 * Parameters:
 *   qrMatrix(text, { mask }) returns { version, size, mask, modules }. Omit mask to pick the best one.
 *   qrSvg(text, { label, quiet }) returns an SVG string with an accessible name and a quiet zone.
 * Usage: import { qrSvg } from './qr.mjs'; qrSvg('https://example.com/', { label: 'Example site' });
 */

// Level M data codewords, error codewords per block, block count, and alignment pattern centre.
const VERSIONS = [
  { data: 16, ec: 10, blocks: 1, alignment: 0 },
  { data: 28, ec: 16, blocks: 1, alignment: 18 },
  { data: 44, ec: 26, blocks: 1, alignment: 22 },
  { data: 64, ec: 18, blocks: 2, alignment: 26 },
  { data: 86, ec: 24, blocks: 2, alignment: 30 },
  { data: 108, ec: 16, blocks: 4, alignment: 34 },
];

const MASKS = [
  (r, c) => (r + c) % 2 === 0,
  r => r % 2 === 0,
  (r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
];

const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
for (let i = 0, x = 1; i < 255; i++) {
  EXP[i] = x;
  LOG[x] = i;
  x <<= 1;
  if (x & 0x100) x ^= 0x11d;
}
for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];

const multiply = (a, b) => (a && b ? EXP[LOG[a] + LOG[b]] : 0);

function generator(degree) {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array(poly.length + 1).fill(0);
    poly.forEach((coefficient, j) => {
      next[j] ^= coefficient;
      next[j + 1] ^= multiply(coefficient, EXP[i]);
    });
    poly = next;
  }
  return poly;
}

function errorCodewords(data, degree) {
  const terms = generator(degree).slice(1);
  const result = new Array(degree).fill(0);
  for (const byte of data) {
    const factor = byte ^ result.shift();
    result.push(0);
    terms.forEach((term, i) => {
      result[i] ^= multiply(term, factor);
    });
  }
  return result;
}

function dataCodewords(bytes, spec) {
  const bits = [];
  const push = (value, length) => {
    for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1);
  };
  push(0b0100, 4);
  push(bytes.length, 8);
  bytes.forEach(byte => push(byte, 8));
  push(0, Math.min(4, spec.data * 8 - bits.length));
  while (bits.length % 8) bits.push(0);
  const words = [];
  for (let i = 0; i < bits.length; i += 8) words.push(parseInt(bits.slice(i, i + 8).join(''), 2));
  for (let pad = 0xec; words.length < spec.data; pad ^= 0xec ^ 0x11) words.push(pad);
  return words;
}

function interleave(bytes, spec) {
  const words = dataCodewords(bytes, spec);
  const length = spec.data / spec.blocks;
  const blocks = Array.from({ length: spec.blocks }, (_, i) => words.slice(i * length, (i + 1) * length));
  const checks = blocks.map(block => errorCodewords(block, spec.ec));
  const result = [];
  for (let i = 0; i < length; i++) blocks.forEach(block => result.push(block[i]));
  for (let i = 0; i < spec.ec; i++) checks.forEach(block => result.push(block[i]));
  return result;
}

function functionPatterns(version, spec) {
  const size = 17 + version * 4;
  const modules = Array.from({ length: size }, () => new Array(size).fill(false));
  const reserved = Array.from({ length: size }, () => new Array(size).fill(false));
  const set = (row, col, dark) => {
    modules[row][col] = dark;
    reserved[row][col] = true;
  };
  for (const [top, left] of [[0, 0], [0, size - 7], [size - 7, 0]]) {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const row = top + dr;
        const col = left + dc;
        if (row < 0 || col < 0 || row >= size || col >= size) continue;
        const ring = Math.max(Math.abs(dr - 3), Math.abs(dc - 3));
        set(row, col, ring !== 2 && ring !== 4);
      }
    }
  }
  for (let i = 8; i < size - 8; i++) {
    set(6, i, i % 2 === 0);
    set(i, 6, i % 2 === 0);
  }
  if (spec.alignment) {
    for (let dr = -2; dr <= 2; dr++) {
      for (let dc = -2; dc <= 2; dc++) {
        set(spec.alignment + dr, spec.alignment + dc, Math.max(Math.abs(dr), Math.abs(dc)) !== 1);
      }
    }
  }
  for (let i = 0; i < 9; i++) {
    reserved[8][i] = true;
    reserved[i][8] = true;
  }
  for (let i = 0; i < 8; i++) {
    reserved[8][size - 1 - i] = true;
    reserved[size - 1 - i][8] = true;
  }
  return { size, modules, reserved };
}

function placeData({ size, modules, reserved }, words) {
  const bits = words.flatMap(word => Array.from({ length: 8 }, (_, i) => (word >>> (7 - i)) & 1));
  let index = 0;
  let upward = true;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let n = 0; n < size; n++) {
      const row = upward ? size - 1 - n : n;
      for (const col of [right, right - 1]) {
        if (reserved[row][col]) continue;
        modules[row][col] = bits[index++] === 1;
      }
    }
    upward = !upward;
  }
}

function formatBits(mask) {
  const data = mask;
  let remainder = data;
  for (let i = 0; i < 10; i++) remainder = (remainder << 1) ^ ((remainder >>> 9) * 0x537);
  return ((data << 10) | remainder) ^ 0x5412;
}

function applyMask({ size, modules, reserved }, mask) {
  const result = modules.map((row, r) => row.map((dark, c) => (reserved[r][c] ? dark : dark !== MASKS[mask](r, c))));
  const bits = formatBits(mask);
  const bit = i => ((bits >>> i) & 1) === 1;
  for (let i = 0; i <= 5; i++) result[i][8] = bit(i);
  result[7][8] = bit(6);
  result[8][8] = bit(7);
  result[8][7] = bit(8);
  for (let i = 9; i < 15; i++) result[8][14 - i] = bit(i);
  for (let i = 0; i < 8; i++) result[8][size - 1 - i] = bit(i);
  for (let i = 8; i < 15; i++) result[size - 15 + i][8] = bit(i);
  result[size - 8][8] = true;
  return result;
}

function penalty(modules) {
  const size = modules.length;
  const columns = modules[0].map((_, c) => modules.map(row => row[c]));
  let score = 0;
  for (const line of [...modules, ...columns]) {
    const text = line.map(dark => (dark ? '1' : '0')).join('');
    for (const run of text.match(/0+|1+/g)) if (run.length >= 5) score += run.length - 2;
    score += 40 * (text.match(/(?=10111010000|00001011101)/g) ?? []).length;
  }
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const value = modules[r][c];
      if (modules[r][c + 1] === value && modules[r + 1][c] === value && modules[r + 1][c + 1] === value) score += 3;
    }
  }
  const dark = modules.flat().filter(Boolean).length;
  const total = size * size;
  return score + 10 * Math.floor(Math.abs(dark * 20 - total * 10) / total);
}

export function qrMatrix(text, { mask } = {}) {
  if (mask !== undefined && !(Number.isInteger(mask) && mask >= 0 && mask < MASKS.length)) {
    throw new RangeError('The mask must be an integer from 0 to 7.');
  }
  const bytes = [...new TextEncoder().encode(text)];
  const index = VERSIONS.findIndex(spec => bytes.length <= spec.data - 2);
  if (index < 0) {
    throw new RangeError(`The text is ${bytes.length} bytes. The encoder supports up to ${VERSIONS.at(-1).data - 2} bytes.`);
  }
  const version = index + 1;
  const grid = functionPatterns(version, VERSIONS[index]);
  placeData(grid, interleave(bytes, VERSIONS[index]));
  const candidates = (mask === undefined ? MASKS.map((_, i) => i) : [mask]).map(candidate => {
    const modules = applyMask(grid, candidate);
    return { mask: candidate, modules, score: penalty(modules) };
  });
  const best = candidates.reduce((winner, item) => (item.score < winner.score ? item : winner));
  return { version, size: grid.size, mask: best.mask, modules: best.modules };
}

const escapeAttribute = value => String(value).replace(/[&<>"]/g, char => `&#${char.charCodeAt(0)};`);

export function qrSvg(text, { label = `QR code for ${text}`, quiet = 4 } = {}) {
  const { size, modules } = qrMatrix(text);
  const total = size + quiet * 2;
  const path = modules.flatMap((row, y) =>
    [...row.map(dark => (dark ? '1' : '0')).join('').matchAll(/1+/g)].map(
      run => `M${run.index + quiet} ${y + quiet}h${run[0].length}v1h-${run[0].length}z`)).join('');
  return `<svg class="qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" role="img" ` +
    `aria-label="${escapeAttribute(label)}" shape-rendering="crispEdges">` +
    `<rect width="${total}" height="${total}" fill="#fff"/><path d="${path}" fill="#000"/></svg>`;
}
