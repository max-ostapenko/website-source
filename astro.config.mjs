import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import llmsTxt from '@alexcarol/astro-llms-txt';

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
