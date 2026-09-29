import { defineConfig, type PageData } from 'vitepress';
import type MarkdownIt from 'markdown-it';
import { configureTaskLists } from '../../scripts/lab-task-lists.mjs';
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
  title: 'Hands-on Labs',
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
