# personal website

Personal website of Max Ostapenko, built with [Astro](https://astro.build/) and deployed to [Firebase Hosting](https://firebase.google.com/docs/hosting).

## Features

- **Blazing Fast**: Static generation with Astro v7 (`~1s` build time).
- **Embedded Jupyter Notebooks**: Native TypeScript parser rendering Markdown, Python code blocks, stdout streams, HTML tables, and Base64 chart outputs at build-time with zero Python runtime dependency.
- **Interactive Leaflet Map Island**: Google Cloud Regions locator with satellite/street layers, continent filters, coordinates precision verification, and hash-based deep linking (`#region=...`).
- **Technology Radar**: Embedded Thoughtworks visualizer tracking tools and platforms.
- **Search & SEO**: Client-side search powered by Pagefind (`/` or `f` shortcuts), OpenGraph, Twitter cards, XML sitemaps, RSS 2.0 (`/posts.xml`), and Google Tag Manager (`GTM-KCK8L2`).
- **Modern Markdown**: GitHub-style Callouts (`note`, `tip`, `warning`, `caution`), interactive tabsets, Looker Studio embeds, and Cal.com appointment scheduling.

## Development

```sh
# Install dependencies
npm install

# Start local dev server (hot reloading)
npm run dev

# Build static bundle and generate search index
npm run build

# Preview the built site locally
npm run preview
```

## Hosting & Deployment

Deploys to Firebase project `max-ostapenko` with `cleanUrls: true` and `trailingSlash: true`.

```sh
# Deploy to a temporary preview channel
npm run deploy-preview -- my-feature-branch

# Deploy to live channel
npm run deploy
```

CI/CD is automated via `.github/workflows/firebase-hosting.yml` on push to `main` using Node.js and Workload Identity Federation.
