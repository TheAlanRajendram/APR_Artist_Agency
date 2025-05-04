# APR Artist Agency Website

A modern, responsive portfolio website for APR Artist Agency built with Astro.js.

## Features

- Dark theme with gold accents
- Responsive design for all devices
- Portfolio items managed through Markdown files
- Modern, clean UI with Tailwind CSS
- Optimized for GitHub Pages deployment

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Adding Portfolio Items

To add a new portfolio item:

1. Create a new Markdown file in `src/content/portfolio/`
2. Use the following front matter structure:
```yaml
---
layout: ../../layouts/PortfolioDetailLayout.astro
title: "Your Project Title"
brand: "Brand Name"
artist: "Artist Name"
date: "YYYY-MM-DD"
image: "path/to/image.jpg"
tags: ["Tag1", "Tag2", "Tag3"]
---
```

3. Add your content below the front matter using Markdown syntax

## Deployment

The site is configured for deployment to GitHub Pages. Simply push your changes to the main branch, and GitHub Actions will automatically build and deploy the site.

## Customization

- Colors: Edit the `tailwind.config.cjs` file to modify the color scheme
- Fonts: Update the font family in `tailwind.config.cjs`
- Layout: Modify the layout files in `src/layouts/`
- Content: Update the Markdown files in `src/content/`
