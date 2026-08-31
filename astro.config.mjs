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
        const sitemap0 = path.join(outDirPath, 'sitemap-0.xml');
        const sitemapIndex = path.join(outDirPath, 'sitemap-index.xml');
        const sitemapDest = path.join(outDirPath, 'sitemap.xml');

        if (fs.existsSync(sitemap0)) {
          fs.copyFileSync(sitemap0, sitemapDest);
          fs.unlinkSync(sitemap0);
        } else if (fs.existsSync(sitemapIndex)) {
          fs.copyFileSync(sitemapIndex, sitemapDest);
        }

        if (fs.existsSync(sitemapIndex)) {
          fs.unlinkSync(sitemapIndex);
        }

        console.log('[sitemap] Generated single standalone sitemap.xml');
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

