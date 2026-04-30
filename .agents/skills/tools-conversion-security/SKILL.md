---
name: tools-conversion-security
description: Implement or review browser-only Markdown/HTML conversion code for privacy and sanitization boundaries.
---

# Conversion Security

1. Treat Markdown and pasted HTML as untrusted.
2. Keep all conversion local to the browser; no backend, external API, telemetry, or persistence of user content.
3. Sanitize before rendered HTML reaches `dangerouslySetInnerHTML`.
4. Prefer focused conversion helpers in each tool's `lib/` folder.
5. Add tests for XSS-like inputs and common conversion behavior.
6. Avoid heavy dependencies unless they are clearly justified by required functionality and bundle impact.
