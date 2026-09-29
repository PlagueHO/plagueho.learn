/**
 * Purpose: Configure rendered lab task lists with accessible, persistent checkbox controls.
 * Parameters: A Markdown-it compatible renderer supplied by VitePress.
 * Usage: Pass configureTaskLists to the VitePress Markdown config or focused renderer tests.
 */

import { createHash } from 'node:crypto';
import { normalizeTaskText } from './lab-task-text.mjs';

function taskId(sourcePath, normalizedText, duplicateOrdinal) {
  return createHash('sha256')
    .update(`${sourcePath}\0${normalizedText.toLocaleLowerCase('en')}\0${duplicateOrdinal}`)
    .digest('hex')
    .slice(0, 16);
}

export function configureTaskLists(md) {
  md.core.ruler.after('inline', 'labs-task-lists', (state) => {
    const duplicateCounts = new Map();
    const sourcePath = String(
      state.env.frontmatter?.sourcePath
        ?? state.env.relativePath
        ?? state.env.path
        ?? 'unknown-page',
    ).replaceAll('\\', '/');

    for (let index = 2; index < state.tokens.length; index += 1) {
      const inline = state.tokens[index];
      if (
        inline.type !== 'inline'
        || state.tokens[index - 1]?.type !== 'paragraph_open'
        || state.tokens[index - 2]?.type !== 'list_item_open'
        || !inline.children?.length
      ) {
        continue;
      }

      const firstText = inline.children.find((child) => child.type === 'text');
      const marker = firstText && /^\s*\[([ xX])\]\s+/.exec(firstText.content);
      if (!firstText || !marker) continue;

      const normalizedText = normalizeTaskText(inline.children);
      const duplicateKey = `${sourcePath}\0${normalizedText.toLocaleLowerCase('en')}`;
      const duplicateOrdinal = duplicateCounts.get(duplicateKey) ?? 0;
      duplicateCounts.set(duplicateKey, duplicateOrdinal + 1);

      firstText.content = firstText.content.slice(marker[0].length);
      const input = new state.Token('html_inline', '', 0);
      const checked = marker[1].toLocaleLowerCase('en') === 'x' ? ' checked' : '';
      const label = md.utils.escapeHtml(normalizedText || 'Lab task');
      input.content = [
        '<label class="task-control">',
        '<input',
        ' class="task-list-item-checkbox"',
        ' type="checkbox"',
        ` aria-label="${label}"`,
        ` data-task-id="${taskId(sourcePath, normalizedText, duplicateOrdinal)}"`,
        `${checked}>`,
        '<span class="task-control-mark" aria-hidden="true"></span>',
        '</label>',
        '<span class="task-text">',
      ].join('');
      const close = new state.Token('html_inline', '', 0);
      close.content = '</span>';
      inline.children.unshift(input);
      inline.children.push(close);

      state.tokens[index - 2].attrJoin('class', 'task-list-item');
      for (let parentIndex = index - 3; parentIndex >= 0; parentIndex -= 1) {
        if (state.tokens[parentIndex].type === 'bullet_list_open') {
          state.tokens[parentIndex].attrJoin('class', 'task-list');
          break;
        }
      }
    }
  });
}
