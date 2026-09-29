import { createHash } from 'node:crypto';
import { defineConfig, type PageData } from 'vitepress';
import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';
import labsSidebar from './labs-sidebar';

const productionBase = '/plagueho.learn/labs/';
const repositoryEditRoot = 'https://github.com/PlagueHO/plagueho.learn/edit/main/';

type SidebarItem = {
  link?: string;
  items?: SidebarItem[];
  [key: string]: unknown;
};

function siteRelativeLink(link: string): string {
  if (!link.startsWith(productionBase)) return link;
  return `/${link.slice(productionBase.length)}`;
}

function normalizeSidebarLinks(items: SidebarItem[]): SidebarItem[] {
  return items.map((item) => ({
    ...item,
    ...(item.link ? { link: siteRelativeLink(item.link) } : {}),
    ...(item.items ? { items: normalizeSidebarLinks(item.items) } : {}),
  }));
}

function normalizeTaskText(children: Token[]): string {
  return children
    .map((child) => child.content)
    .join(' ')
    .replace(/^\s*\[[ xX]\]\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function taskId(sourcePath: string, normalizedText: string, duplicateOrdinal: number): string {
  return createHash('sha256')
    .update(`${sourcePath}\0${normalizedText.toLocaleLowerCase('en')}\0${duplicateOrdinal}`)
    .digest('hex')
    .slice(0, 16);
}

function configureTaskLists(md: MarkdownIt): void {
  md.core.ruler.after('inline', 'labs-task-lists', (state) => {
    const duplicateCounts = new Map<string, number>();
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
        '<input',
        ' class="task-list-item-checkbox"',
        ' type="checkbox"',
        ` aria-label="${label}"`,
        ` data-task-id="${taskId(sourcePath, normalizedText, duplicateOrdinal)}"`,
        `${checked}> `,
      ].join('');
      inline.children.unshift(input);

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

function configureInlineCode(md: MarkdownIt): void {
  md.renderer.rules.code_inline = (tokens, index, _options, _env, renderer) => {
    tokens[index].attrSet('v-pre', '');
    return `<code${renderer.renderAttrs(tokens[index])}>${md.utils.escapeHtml(tokens[index].content)}</code>`;
  };
}

function applySourceMetadata(pageData: PageData): void {
  const sourcePath = pageData.frontmatter.sourcePath;
  if (typeof sourcePath === 'string' && sourcePath.length > 0) {
    pageData.filePath = sourcePath.replaceAll('\\', '/');
  }

  const lastUpdated = pageData.frontmatter.lastUpdated;
  if (typeof lastUpdated === 'string') {
    const timestamp = Date.parse(`${lastUpdated}T00:00:00Z`);
    if (!Number.isNaN(timestamp)) pageData.lastUpdated = timestamp;
  }
}

export default defineConfig({
  title: 'PlagueHO Lab Runbooks',
  description: 'Practical, guided runbooks for hands-on technical learning.',
  base: productionBase,
  cleanUrls: true,
  ignoreDeadLinks: 'localhostLinks',
  lastUpdated: true,
  transformPageData: applySourceMetadata,
  markdown: {
    config(md) {
      configureTaskLists(md);
      configureInlineCode(md);
    },
  },
  themeConfig: {
    nav: [
      { text: 'Labs', link: '/' },
      { text: 'Presentations', link: 'https://plagueho.github.io/plagueho.learn/' },
    ],
    sidebar: normalizeSidebarLinks(labsSidebar),
    editLink: {
      pattern: `${repositoryEditRoot}:path`,
      text: 'Edit this page on GitHub',
    },
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'long',
      },
    },
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/PlagueHO/plagueho.learn' },
    ],
  },
});
