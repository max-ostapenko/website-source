# GitHub Copilot Instructions

## Project Context
Personal portfolio website for Max Ostapenko built with Quarto, hosted on Firebase. Content covers product management, Masthead Data & HTTP Archive, data engineering and BigQuery.

## Repository Structure
- `src/posts/` — Blog posts; `src/posts/_drafts/` — unpublished (excluded from builds)
- `src/learning/` — Learning materials; `src/projects/` — Project docs
- `src/static/` — Shared assets (images, data, HTML snippets)
- `scripts/` — Build automation; `_site/` — Generated output (not in git)
- Key configs: `src/_quarto.yml`, `firebase.json`, `.firebaserc`, `makefile`

## File Organization

### Content Structure
```
src/posts/[post-name]/
  ├── index.qmd          # Main content
  ├── notebook.ipynb     # Optional: analysis notebooks
  └── images/            # Post-specific assets
```

### When Creating Content
1. **Blog post**: `src/posts/new-topic/index.qmd`
2. **Draft**: `src/posts/_drafts/new-topic/index.qmd`
3. **Learning material**: `src/learning/topic/index.qmd`
4. **Project page**: `src/projects/project-name/index.qmd`

### Required Front Matter
```yaml
---
title: "Post Title"
description: "SEO-friendly description"
date: "YYYY-MM-DD"
categories: ["category1", "category2"]
---
```

## Common Patterns

### Quarto Markdown (.qmd)
- Prefer code folding (`code-fold: true`) for executable code blocks
- Use descriptive chunk labels: `#| label: fig-analysis`
- Include alt text for images: `![Description](path){fig-alt="Alt text"}`
- Callouts: `:::{.callout-note}`; cross-references: `@fig-label`, `@tbl-label`

### Python
- Target Python 3.x in virtual environment (`.venv/`)
- Follow PEP 8; use type hints for function signatures
- Imports: Standard library → third-party → local
- Data processing: Prefer pandas, use ga4_data_import for GA4 data

### SQL Queries
- Store complex queries in separate .sql files
- Use BigQuery-compatible syntax (primary platform)
- Document query purpose and expected output


### HTTP Archive Schema docs
- Full HTTP Archive schema and metric docs: fetch `https://har.fyi/llms.txt` for up-to-date LLM-friendly reference

### Notebooks
- Keep .ipynb alongside .qmd files; clean output before committing (optional - Quarto re-executes)
- Embed a notebook in a .qmd with `{{< embed ./notebook.ipynb echo=true >}}`
- Add a Colab badge via `code-links` front matter:
  ```yaml
  code-links:
    - text: Open in Colab
      icon: google
      href: https://colab.research.google.com/github/max-ostapenko/website-source/blob/main/src/posts/...
  ```
- For complex notebooks, generate from a Python script (`/tmp/gen_*.py` pattern) rather than editing JSON directly; use `json.dump()` for correct escaping
- For ongoing edits, use the Jupyter notebook editing tools to modify cells directly without a generator

## Development Commands

```bash
make env                                # Install Quarto, Python deps, npm packages
npm run preview                         # Live reload at http://localhost:4200
npm run render                          # Build static site to _site/
npm run emulate                         # Test Firebase hosting locally
npm run deploy-preview -- feature-name  # Temporary preview channel (2 days)
npm run deploy                          # Production deploy
```

## Dependencies

### Python Packages
- `ga4_data_import`: Google Analytics 4 data export
- `nbformat`, `nbclient`: Notebook processing
- `jupyter`: Interactive development
- `PyYAML`: Configuration parsing
- `lxml`: XML/HTML processing
- `bigquery_magics==0.12.1`: BQ magic commands in notebooks — `%%bigquery`, `%%bigquery varname` (returns DataFrame), `%%bigquery --graph varname` (interactive graph); auth via Colab `auth.authenticate_user()` or local ADC (`gcloud auth application-default login`)

### Node Packages
- Node.js >= 24.0.0
- `firebase-tools@15.5.1`: Hosting deployment (version pinned)

## Avoid

- Hardcoding absolute URLs (use site-url from config)
- Committing build output (`_site/` directory)
- Breaking changes to `_quarto.yml` without testing
- Removing analytics tracking (GTM snippets in `src/static/html/`)
- Modifying Firebase project settings
- Large binary files in git
- Uncommitted drafts in production paths
- Bypassing `scripts/clean_sitemap.py` — runs automatically via post-render hook
