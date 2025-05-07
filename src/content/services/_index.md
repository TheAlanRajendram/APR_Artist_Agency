# Services Content

This directory contains the content for the Services page. Each service is defined in its own markdown file.

## How to Update

To update a service:
1. Edit the corresponding markdown file (e.g., `talent-matching.md`)
2. Update the frontmatter (the content between the `---` lines) to change metadata
3. Update the content below the frontmatter to change the main content

## Frontmatter Fields

- `title`: The displayed title of the service (required)
- `order`: Controls the display order on the page (required)
- `description`: A brief description shown above the list items (optional)
- `listItems`: An array of items to display as bullet points (optional)

## Example

```markdown
---
title: "Talent Matching"
order: 1
description: "We carefully analyze your brand's values and goals."
listItems:
  - "Professional Athletes"
  - "Recording Artists"
---

Additional content goes here.
```
