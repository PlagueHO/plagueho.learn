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

function addClass(token, className) {
  const classes = new Set(
    (token.attrGet('class') ?? '').split(/\s+/).filter(Boolean),
  );
  classes.add(className);
  token.attrSet('class', [...classes].join(' '));
}

export function configureTaskLists(md) {
  md.core.ruler.after('inline', 'labs-task-lists', (state) => {
    const duplicateCounts = new Map();
    const listStack = [];
    const sourcePath = String(
      state.env.frontmatter?.sourcePath
        ?? state.env.relativePath
        ?? state.env.path
        ?? 'unknown-page',
    ).replaceAll('\\', '/');

    for (let index = 0; index < state.tokens.length; index += 1) {
      const inline = state.tokens[index];
      if (
        inline.type === 'bullet_list_open'
        || inline.type === 'ordered_list_open'
      ) {
        listStack.push(inline);
        continue;
      }
      if (
        inline.type === 'bullet_list_close'
        || inline.type === 'ordered_list_close'
      ) {
        listStack.pop();
        continue;
      }
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

      addClass(state.tokens[index - 2], 'task-list-item');
      addClass(listStack.at(-1), 'task-list');
    }
  });
}
