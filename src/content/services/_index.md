# Services Content

This directory contains the content for the Services page. Each service is defined in its own markdown file.

## Structure

Each service file has two parts:
1. **Frontmatter**: The section between `---` markers at the top of the file
2. **Body content**: All the markdown content below the frontmatter

## How to Update

To update a service:
1. Edit the corresponding markdown file (e.g., `talent-matching.md`)
2. Keep only `title` and `order` in the frontmatter
3. Put all the content in the markdown body below the frontmatter

## Frontmatter Fields

- `title`: The displayed title of the service (required)
- `order`: Controls the display order on the page (required)

## Example

```markdown
---
title: "Talent Matching"
order: 1
---

We carefully analyze your brand's values, target audience, and campaign goals to identify the perfect artist match. Our extensive network includes:

- Professional Athletes
- Recording Artists
- Actors & Entertainers
- Influencers & Content Creators

Additional paragraphs or content can be added here.
```
