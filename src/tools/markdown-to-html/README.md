# Markdown to Rich HTML

Route: `/tools/markdown-to-html`

This tool previews GitHub Flavored Markdown and supports copying the original Markdown or sanitized HTML.

## Features

- Live Markdown source editing.
- GFM tables, task lists, code blocks, blockquotes, links, images, and emphasis.
- Side-by-side source/preview workspace.
- Hide-source and long-form reading modes.
- Browser print dialog for PDF export.

## Conversion Approach

Rendering uses `react-markdown`, `remark-gfm`, and `rehype-sanitize`. Copyable HTML is sanitized with DOMPurify before it is placed on the clipboard.

## Limitations

PDF export is print-based. The browser owns final page size, destination, and printer/PDF behavior.
