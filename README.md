# Tools Workshop

Tools Workshop is a browser-only React application for privacy-preserving utilities at `https://pankaj28843.github.io/tools/`.

Current tools include:

- Markdown to Rich HTML Preview: `/tools/markdown-to-html`
- Rich HTML to Markdown Converter: `/tools/html-to-markdown`
- Clipboard Inspector: `/tools/clipboard-inspector`
- Base64 Encode / Decode: `/tools/base64`

No tool uses a backend or external API for user-entered content. User content stays in the browser.

## Stack

- React + TypeScript
- Vite with `base: /tools/`
- MUI for UI primitives and theming
- React Router for clean client routes
- Vitest + React Testing Library
- pnpm for package management

## Local Setup

```bash
pnpm install
pnpm run dev
```

Vite is configured with `strictPort: false`, so if the default port is busy it will choose the next available port. Use the URL printed by Vite.

## Commands

```bash
pnpm run dev
pnpm run build
pnpm run preview
pnpm run typecheck
pnpm run lint
pnpm run test
pnpm run test:run
```

## Adding a Tool

1. Create `src/tools/<tool-slug>/`.
2. Add `metadata.ts`, `Tool.tsx`, local conversion code, tests, and `README.md`.
3. Add one entry to `src/tools/registry.ts`.
4. Add route/render/conversion tests.
5. Validate with CDP before considering UI work complete.

See `docs/ADDING_TOOLS.md` for the full checklist.

## Deployment

The GitHub Actions workflow builds the Vite app with pnpm, runs checks, uploads `dist`, and deploys through GitHub Pages Actions. The Vite base path is `/tools/`, and the build copies `index.html` to `404.html` so GitHub Pages deep links can return the SPA.

Deployment requires GitHub Pages source set to GitHub Actions in repository settings. Do not claim deployment succeeded until a workflow run completes successfully.

## Privacy And Security

- No backend or conversion API calls.
- No telemetry.
- Base64 is reversible encoding, not encryption; do not treat encoded values as secrets.
- Untrusted Markdown/HTML is sanitized before previewing rendered HTML.
- Temporary validation artifacts belong in `tmp/` and should not be committed.
