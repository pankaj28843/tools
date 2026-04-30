---
name: tools-cdp-validate
description: Validate Tools Workshop UI routes with the approved cdp CLI workflow before shipping frontend changes.
---

# CDP Validate Tools Workshop

1. Inspect syntax first: `cdp --help`, `cdp describe --json`, `cdp doctor --json`, and relevant `cdp <command> --help`.
2. Start `pnpm run dev` or `pnpm run preview`; use the printed port because Vite can auto-select a high available port.
3. Validate `/tools/`, `/tools/markdown-to-html`, and `/tools/html-to-markdown`.
4. Check deep-link refresh, console errors, failed network requests, unexpected external calls, mobile layout, accessibility, performance, dark mode, copy actions, print/PDF behavior, resizable panes, and hide-source/read-preview modes.
5. Save transient screenshots or bundles to `tmp/` only.
6. Run `cdp page cleanup --json` after validation.
