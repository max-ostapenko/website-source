import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import llmsTxt from '@alexcarol/astro-llms-txt';

function sitemapAlias() {
  return {
    name: 'sitemap-alias',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDirPath = fileURLToPath(dir);
        const src = path.join(outDirPath, 'sitemap-index.xml');
        const dest = path.join(outDirPath, 'sitemap.xml');
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log('[sitemap-alias] Copied sitemap-index.xml to sitemap.xml');
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://maxostapenko.com',
  outDir: '_site',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/_drafts/'),
    }),
    sitemapAlias(),
    llmsTxt({
      name: 'Max Ostapenko',
      excludedPaths: ['404'],
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});

