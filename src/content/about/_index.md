# About Content

This directory contains the content for the About page. Each section is defined in its own markdown file.

## How to Update

To update a section:
1. Edit the corresponding markdown file (e.g., `mission.md`)
2. Update the frontmatter (the content between the `---` lines) to change metadata
3. Update the content below the frontmatter to change the main content

## Frontmatter Fields

- `title`: The displayed title of the section (required)
- `order`: Controls the display order on the page (required)
- `listItems`: An array of items to display as bullet points (optional)

## Example

```markdown
---
title: "Our Mission"
order: 1
---

Our mission statement goes here.
```

Or with list items:

```markdown
---
title: "What Makes Us Unique"
order: 4
listItems:
  - "Deep industry expertise"
  - "Personalized approach"
---

Additional content goes here.
```
