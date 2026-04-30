# Rich HTML to Markdown

Route: `/tools/html-to-markdown`

This tool converts pasted HTML into Markdown entirely in the browser.

## Features

- Paste rich text anywhere on the page without first focusing an input.
- Rich text editing with the Trix toolbar plus live HTML source editing.
- Markdown output for headings, paragraphs, links, lists, code, blockquotes, images, tables, and emphasis where feasible.
- Side-by-side workspace and hide-source mode.
- Copy buttons for source HTML and generated Markdown.
- Optional sanitized HTML preview.
- Browser-only conversion; clipboard content never leaves the page.

## Conversion Approach

Input HTML is sanitized with DOMPurify, then converted with Turndown plus the GFM plugin.

## Limitations

Complex editor-specific markup may not round-trip perfectly. The converter favors clean Markdown over preserving every visual style.
