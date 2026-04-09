# GitHub Copilot Instructions

## Project Context
You're working on a personal portfolio website built with Quarto, a scientific and technical publishing system. The site features blog posts, learning materials, and project documentation for Max Ostapenko's data product management work.

## Code Style & Patterns

### Quarto Markdown (.qmd)
- Use YAML front matter for metadata
- Prefer code folding (`code-fold: true`) for executable code blocks
- Support for Python, R, SQL, JavaScript code execution
- Use descriptive chunk labels: `#| label: fig-analysis`
- Include alt text for images: `![Description](path){fig-alt="Alt text"}`

### Python
- Target Python 3.x in virtual environment (`.venv/`)
- Follow PEP 8 style conventions
- Use type hints for function signatures
- Imports: Standard library → third-party → local
- Data processing: Prefer pandas, use ga4_data_import for GA4 data

### JavaScript/Node
- Modern ES6+ syntax
- Use npm scripts from `package.json`
- Firebase hosting configuration in `firebase.json`

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

### Data Analysis Posts
- Combine narrative .qmd with executable code
- Use code folding for long code blocks
- Place data files in `src/static/data/`
- Visualizations: matplotlib, plotly, mermaid diagrams

### SQL Queries
- Store complex queries in separate .sql files
- Use BigQuery-compatible syntax (primary platform)
- Document query purpose and expected output

### Notebooks
- Keep .ipynb alongside .qmd files
- Use Quarto's notebook integration
- Clean output before committing (optional - Quarto re-executes)

## Development Commands

### Preview
```bash
npm run preview  # Live reload at http://localhost:4200
```

### Build
```bash
npm run render   # Generate static site to _site/
```

### Deploy
```bash
npm run deploy-preview -- feature-name  # Temporary preview
npm run deploy                          # Production
```

## Site Configuration Reference

### Navigation (src/_quarto.yml)
- Navbar: Main site navigation
- Sidebar: Auto-generated from directory structure
- Use `auto:` for dynamic content discovery

### Styling
- Theme: Custom (blue navbar #174EA6)
- Layout: Full page with right-side TOC
- Code highlighting: GitHub style
- Mermaid: Neutral theme

### Features Enabled
- Lightbox for images
- Code folding with toggle
- Back-to-top navigation
- External link icons
- Lazy image loading

## Dependencies

### Python Packages
- `ga4_data_import`: Google Analytics 4 data export
- `nbformat`, `nbclient`: Notebook processing
- `jupyter`: Interactive development
- `PyYAML`: Configuration parsing
- `lxml`: XML/HTML processing

### Node Packages
- `firebase-tools@15.5.1`: Hosting deployment (version pinned)

## Best Practices

### Content
- Write clear, concise technical content
- Use heading hierarchy properly (# → ## → ###)
- Include code examples with explanations
- Add alt text for accessibility

### Code
- Test locally before suggesting deployment
- Use existing patterns from the codebase
- Keep dependencies minimal and documented
- Comment complex logic, especially in post-render scripts

### Assets
- Optimize images before adding
- Use relative paths for local assets
- Store reusable assets in `src/static/`
- Use descriptive filenames

### Quarto-Specific
- Leverage cross-references: `@fig-label`, `@tbl-label`
- Use callouts for important notes: `:::{.callout-note}`
- Prefer Quarto's built-in features over custom HTML
- Test notebook execution during render

## Avoid

- Hardcoding absolute URLs (use site-url from config)
- Committing build output (`_site/` directory)
- Breaking changes to `_quarto.yml` without testing
- Removing analytics tracking (GTM snippets)
- Modifying Firebase project settings
- Large binary files in git
- Uncommitted drafts in production paths

## Helpful Context

### Site Purpose
Professional portfolio showcasing:
- Data engineering and product management expertise
- Technical blog posts and tutorials
- Open source projects and contributions
- Learning resources and tech radar

### Target Audience
- Technical professionals
- Data engineers and product managers
- Potential collaborators and employers

### Content Themes
- BigQuery and Google Cloud Platform
- Data privacy and web analytics
- Product management methodologies
- Open source contributions (HTTP Archive)
