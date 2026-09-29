/**
 * Purpose: Verify the rendered markup contract for production lab task lists.
 * Parameters: Executed by Node's built-in test runner using VitePress's Markdown renderer.
 * Usage: node --test scripts/lab-task-lists.test.mjs
 */

import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { createMarkdownRenderer } from 'vitepress';
import { configureTaskLists } from './lab-task-lists.mjs';

test('renders accessible persistent task controls without flattening task content', async () => {
  const renderer = await createMarkdownRenderer(
    path.resolve('labs-site'),
    { config: configureTaskLists },
    '/',
  );
  const markdown = `- [ ] Read **the guide** and \`run\`.
- [x] Read **the guide** and \`run\`.
  - [ ] Verify [the result](https://example.com).
- [ ] Read **the guide** and \`run\`.
`;
  const html = await renderer.render(markdown, {
    frontmatter: { sourcePath: 'labs/example/01-module/README.md' },
  });

  assert.equal((html.match(/class="task-list-item-checkbox"/g) ?? []).length, 4);
  assert.equal((html.match(/ checked>/g) ?? []).length, 1);
  assert.match(
    html,
    /aria-label="Read the guide and run\." data-task-id="6f1eea3f7d7457b0">/,
  );
  assert.match(
    html,
    /aria-label="Read the guide and run\." data-task-id="080b5facfb47c628" checked>/,
  );
  assert.match(
    html,
    /aria-label="Read the guide and run\." data-task-id="cd598e97a20bf13f">/,
  );
  assert.match(
    html,
    /aria-label="Verify the result\." data-task-id="04a520ed8cbd7456">/,
  );
  assert.match(
    html,
    /<label class="task-control">.*?<\/label><span class="task-text">Read <strong>the guide<\/strong> and <code>run<\/code>\.<\/span>/s,
  );
  assert.match(
    html,
    /<li class="task-list-item">.*?<span class="task-text">Read .*?<\/span>\s*<ul class="task-list">\s*<li class="task-list-item">/s,
  );
  assert.match(
    html,
    /<span class="task-text">Verify <a href="https:\/\/example\.com"[^>]*>the result<\/a>\.<\/span>/,
  );
  assert.doesNotMatch(html, /class="task-list task-list"/);
});

test('classifies the actual bullet and ordered lists without changing unrelated lists', async () => {
  const renderer = await createMarkdownRenderer(
    path.resolve('labs-site'),
    { config: configureTaskLists },
    '/',
  );
  const markdown = `- Plain unrelated item
  - Also plain

Plain separator.

- Plain outer item
  - [ ] Nested task
- [ ] Outer task
  - Plain nested item

1. [ ] Ordered task
1. Plain ordered item
`;
  const html = await renderer.render(markdown, {
    frontmatter: { sourcePath: 'labs/example/02-lists/README.md' },
  });

  assert.equal((html.match(/<ul class="task-list">/g) ?? []).length, 2);
  assert.equal((html.match(/<ol class="task-list">/g) ?? []).length, 1);
  assert.equal((html.match(/class="task-list-item"/g) ?? []).length, 3);
  assert.match(html, /^<ul>\s*<li>Plain unrelated item\s*<ul>/);
  assert.match(html, /<\/ul>\s*<p>Plain separator\.<\/p>\s*<ul class="task-list">/);
  assert.match(html, /<li class="task-list-item">.*?Nested task.*?<\/li>/s);
  assert.match(
    html,
    /<li class="task-list-item">.*?Outer task.*?<\/span>\s*<ul>\s*<li>Plain nested item/s,
  );
  assert.match(
    html,
    /<ol class="task-list">\s*<li class="task-list-item">.*?Ordered task/s,
  );
  assert.doesNotMatch(html, /class="task-list task-list"/);
});
