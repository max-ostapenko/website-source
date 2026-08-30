# Agent Guidelines & Context

## Project Context
Personal portfolio website for Max Ostapenko built with [Astro](https://astro.build/) (v7) and deployed to Firebase Hosting (`max-ostapenko`).
Content covers product management, Masthead Data & HTTP Archive, data engineering, BigQuery, AdTech, and AI agents.

## Repository Structure

```
website-source/
├── astro.config.mjs          # Astro config (MDX, Sitemap, llms-txt)
├── tsconfig.json             # TypeScript path aliases (@/*)
├── firebase.json             # Firebase Hosting settings (cleanUrls, trailingSlash)
├── .firebaserc               # Firebase project mapping (max-ostapenko)
├── public/                   # Static assets (robots.txt, images, tech-radar)
├── _site/                    # Generated static build output (excluded from git)
├── src/
│   ├── content/              # Content collections (Markdown & MDX)
│   │   ├── posts/            # Blog articles & _drafts/
│   │   ├── projects/         # Project pages & Datahub dataset schemas
│   │   └── learning/         # Curated resources & reading lists
│   ├── pages/                # File-based routes & endpoints
│   │   ├── index.astro       # Homepage
│   │   ├── about.astro       # About & Goodreads profile
│   │   ├── appointments.astro # Cal.com scheduling
│   │   ├── 404.astro         # Custom 404 page
│   │   ├── posts.xml.ts      # RSS 2.0 endpoint
│   │   ├── posts/            # Blog index, dynamic post slugs, category archives
│   │   ├── projects/         # Projects index, dynamic slugs, Region Locator
│   │   └── learning/         # Learning index, dynamic slugs, Tech Radar
│   ├── components/           # Reusable Astro & UI island components
│   ├── layouts/              # BaseLayout, PostLayout, SidebarLayout
│   ├── lib/                  # Parsers (notebookParser.ts) & utilities
│   └── styles/               # global.css design tokens (#174EA6 brand)
```

## Content Collections & Frontmatter

### Collection Definitions (`src/content.config.ts`)
- **`posts`**: Loaded from `src/content/posts/**/*.{md,mdx}`, excluding `**/_drafts/**`.
- **`projects`**: Loaded from `src/content/projects/**/*.{md,mdx}`.
- **`learning`**: Loaded from `src/content/learning/**/*.{md,mdx}`.

### Frontmatter Schema

```yaml
---
title: "Post Title"
description: "SEO-friendly description"
date: "YYYY-MM-DD"
categories: ["bigquery", "data engineering"]
image: ./preview.png
draft: false
code-links:
  - text: Open in Colab
    icon: google
    href: https://colab.research.google.com/...
other-links:
  - text: Open in BigQuery
    icon: google
    href: https://console.cloud.google.com/...
---
```

## MDX Component Catalog

When creating or editing content pages in `src/content/`:

1. **Callout**:
   ```mdx
   import Callout from '../../../components/Callout.astro';

   <Callout type="note|tip|warning|caution|important" title="Optional Title">
     Content inside callout...
   </Callout>
   ```

2. **Interactive Tabs**:
   ```mdx
   import Tabs from '../../../components/Tabs.astro';
   import TabItem from '../../../components/TabItem.astro';

   <Tabs>
     <TabItem label="Console">
       Instructions for GCP Console...
     </TabItem>
     <TabItem label="gcloud">
       ```sh
       gcloud quota update ...
       ```
     </TabItem>
   </Tabs>
   ```

3. **Jupyter Notebook Embeds**:
   - Parses `.ipynb` at build-time with zero Python runtime dependency.
   ```mdx
   import NotebookEmbed from '../../../components/NotebookEmbed.astro';

   // Full notebook embed:
   <NotebookEmbed path="src/content/posts/.../notebook.ipynb" echo={true} />

   // Specific cell embed:
   <NotebookEmbed path="src/content/posts/.../notebook.ipynb" cell="create_instance" echo={true} />
   ```

4. **Looker Studio Reports**:
   ```mdx
   import LookerEmbed from '../../../../components/LookerEmbed.astro';

   <LookerEmbed src="https://lookerstudio.google.com/embed/reporting/..." height="340px" />
   ```

## Development & Build Commands

```bash
npm install                             # Install dependencies
npm run dev                             # Dev server with HMR at http://localhost:4321
npm run build                           # Build static site to _site/ and generate Pagefind & llms.txt
npm run preview                         # Preview production bundle locally
npm run deploy-preview -- feature-name  # Temporary Firebase preview channel (expires in 2 days)
npm run deploy                          # Deploy production build to Firebase Hosting
```

## Conventions & Standards

- **CLI-First Philosophy**: Prefer native CLI tools (`gcloud`, `gh`, `bq`, `npm`, `npx firebase-tools@latest`) for operations.
- **Code Style**: Node.js / TypeScript with strict type checking; Functional Core with clean separation of layout and logic.
- **Design Tokens**: Standard Google/Blue primary `#174EA6` with accessible contrast ratios, CSS variables in `src/styles/global.css`.
- **Search & LLM Discovery**:
  - Client search: [Pagefind](https://pagefind.app/) indexed during `npm run build`.
  - LLM standards: `llms.txt` and `llms-full.txt` generated automatically via `@alexcarol/astro-llms-txt`.
  - HTTP Archive schema reference: `https://har.fyi/llms.txt`.
