# Clipboard Inspector

Route: `/tools/clipboard-inspector`

Clipboard Inspector is a browser-only diagnostics tool for rich paste workflows. It captures a paste event, shows the available clipboard MIME types, plain text, raw HTML, sanitized HTML, and a sanitized preview.

## Features

- Reads `text/plain` and `text/html` from the paste event.
- Shows clipboard type metadata and character counts.
- Sanitizes HTML before previewing it in the page.
- Copies diagnostics JSON or sanitized HTML.
- Keeps clipboard content in memory only; no uploads, telemetry, backend calls, or persistent storage.

## Conversion approach

The tool uses the browser `ClipboardEvent.clipboardData` object, then sanitizes rich HTML with DOMPurify before rendering. Raw HTML is displayed as text only.

## Known limitations

- Browser clipboard permissions and source applications determine which MIME types are available.
- The tool inspects paste events; it does not read clipboard contents proactively.
