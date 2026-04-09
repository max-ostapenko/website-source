# Agent Guidelines for website-source

## Project Overview

Personal website for Max Ostapenko (Data Product Management) built with Quarto publishing system and hosted on Firebase.

## Repository Structure

- `src/` - All content source files (Quarto .qmd format)
  - `posts/` - Blog posts
  - `learning/` - Learning materials and tech radar
  - `projects/` - Project documentation
  - `about/`, `appointments/` - Static pages
  - `static/` - Assets (images, data, HTML snippets)
  - `_drafts/` - Unpublished content (excluded from builds)
- `scripts/` - Build automation (Python)
- `_site/` - Generated output (not in git)

## Key Technologies

- **Quarto**: Content authoring and site generation (.qmd files)
- **Firebase Hosting**: Deployment platform
- **Node.js & npm**: Tooling and Firebase CLI
- **Python**: Post-render processing and Jupyter notebooks
- **Dependencies**: ga4_data_import, Jupyter, PyYAML, lxml

## Development Workflow

### Setup

```bash
make env  # Install Quarto, Python deps, npm packages
```

### Local Development

```bash
npm run preview      # Live preview with hot reload
npm run render       # Build static site to _site/
npm run emulate      # Test Firebase hosting locally
```

### Deployment

```bash
npm run deploy-preview -- branch-name  # Preview channel (2 days)
npm run deploy                          # Production deploy
```

## Content Guidelines

### File Format

- Use `.qmd` (Quarto Markdown) for all content
- Front matter in YAML format
- Code blocks can be executable (Python, R, SQL, etc.)
- Supports Jupyter notebooks (.ipynb) integration

### Creating New Content

1. **Blog posts**: Create in `src/posts/new-post/index.qmd`
2. **Learning materials**: Add to `src/learning/`
3. **Projects**: Add to `src/projects/`
4. **Drafts**: Use `_drafts/` subdirectories (auto-excluded)

### Metadata Requirements

- Each post needs: title, date, description, categories
- Images should be in post-specific folders or `static/images/`
- Use relative paths for local assets

## Code Practices

### Python

- Python 3.x required (venv in `.venv/`)
- Format: Follow existing patterns in `scripts/`
- Notebook integration: Use `nbformat`, `nbclient` for processing

### JavaScript/Node

- Node.js >= 24.0.0
- Managed by npm (see `package.json`)
- Firebase tools version pinned

### Configuration

- Quarto config: `src/_quarto.yml`
- Firebase config: `firebase.json`, `.firebaserc`
- Build automation: `makefile`

## Common Tasks

### Adding a Blog Post

1. Create `src/posts/post-name/index.qmd`
2. Add front matter (title, date, description, categories)
3. Preview: `npm run preview`
4. Deploy preview: `npm run deploy-preview -- post-name`

### Updating Dependencies

- Python: Update `requirements.txt`
- Node: Update `package.json` (Firebase tools pinned)
- Quarto: System-level update (macOS via Homebrew)

### Working with Notebooks

- Keep `.ipynb` files with corresponding `.qmd` files
- Use code-fold and code-tools from Quarto config
- Notebooks auto-rendered when in content directories

## Important Notes

### Do NOT

- Commit `_site/` directory (build output)
- Change Firebase project settings without review
- Remove GTM tracking snippets in `static/html/`

### Always

- Test locally before deploying (`npm run preview`)
- Use draft folders for work-in-progress content
- Follow existing directory structure patterns
- Keep dependencies up to date
- Run `python3 scripts/clean_sitemap.py` via post-render (automatic)

## Site Configuration

- Analytics: Google Tag Manager (GTM)
- SEO: Canonical URLs, Open Graph, Twitter Cards
- UI: Bootstrap-based theme, configurable in `_quarto.yml`
- Navigation: Navbar + sidebar (auto-generated from structure)

## Support & Reference

- [Quarto Documentation](https://quarto.org/)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- Project README: `/README.md`
