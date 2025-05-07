# About Content

This directory contains the content for the About page. Each section is defined in its own markdown file.

## Structure

Each file has two parts:
1. **Frontmatter**: The section between `---` markers at the top of the file
2. **Body content**: All the markdown content below the frontmatter

## How to Update

To update a section:
1. Edit the corresponding markdown file (e.g., `mission.md`)
2. Keep only `title` and `order` in the frontmatter
3. Put all the content in the markdown body below the frontmatter

## Frontmatter Fields

- `title`: The displayed title of the section (required)
- `order`: Controls the display order on the page (required)

## Example

```markdown
---
title: "Our Mission"
order: 1
---

To create meaningful and impactful partnerships between brands and exceptional talent, fostering collaborations that drive success for all parties involved.
```

## Example with Bullet Points

```markdown
---
title: "What Makes Us Unique"
order: 4
---

Our unique approach sets us apart:

- Deep industry expertise across sports, music, and entertainment
- Personalized approach to each collaboration
- Extensive network of both brands and artists
```
