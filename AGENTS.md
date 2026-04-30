# AGENTS.md

This file provides guidance to coding agents working on this repository.

This is the canonical repo instruction file. `CLAUDE.md` is a symlink for Claude Code compatibility. `.agents/skills` is canonical for repo-local skills; `.claude/skills`, `.codex/skills`, `.opencode/skills`, and `.github/skills` are compatibility symlinks.

## Project Purpose

Tools Workshop is a public GitHub Pages, browser-only React + TypeScript + Vite + MUI SPA hosted at `https://pankaj28843.github.io/tools/`.

The platform provides fast, privacy-preserving utilities with clean routes under `/tools/<tool-slug>`. Initial routes:

- `/tools/` — searchable tool index.
- `/tools/markdown-to-html` — Markdown to sanitized rich HTML preview/export.
- `/tools/html-to-markdown` — sanitized HTML to Markdown converter.

No user-entered content may be sent to a backend, external API, telemetry service, or analytics endpoint.

## Required Stack And Package Manager

- React, TypeScript, Vite, MUI.
- pnpm for installs and scripts.
- Vitest and React Testing Library for tests.
- React Router with basename `/tools`.
- Vite `base: '/tools/'`.

## Public Repo Hygiene

Commit durable app code, tests, and maintainer docs. Keep deep research under `~/deep-research/tools` and transient artifacts under `tmp/`. Do not commit research scratchwork, screenshots, CDP bundles, local logs, or temporary output unless explicitly requested.

## Common Commands

Inspect local tool help before relying on CLI syntax:

```bash
docsearch --help
docsearch list --json
cdp --help
cdp describe --json
cdp doctor --json
gh --help
```

Project commands:

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm run preview
pnpm run typecheck
pnpm run lint
pnpm run test
pnpm run test:run
```

Vite dev and preview use `strictPort: false`; do not assume a fixed port is free. Use the URL printed by the command or captured from logs.

If Docker is introduced, use `bash scripts/dev_up.sh`; never run `docker compose` directly.

## Documentation Search Workflow

Use `docsearch` as the primary documentation lookup tool for React, TypeScript, Vite, Vitest, GitHub Pages, MUI, browser APIs, pnpm, Docker, conversion libraries, and Agent Skills.

Before relying on a subcommand, inspect help:

```bash
docsearch <command> --help
```

Prefer JSON output when comparing results. Use `docsearch search-all` when unsure which tenant contains the answer. Use `docsearch fetch` for full source documentation. Record useful commands in `docs/DOCSEARCH_WORKFLOW.md`.

## Browser Validation Workflow

Browser automation must use the approved CDP flow only. Do not use Playwright or other browser automation tools.

Use the `dev-browser` skill and the `cdp` CLI only for browser validation in this repo. Do not use Chrome DevTools MCP, Playwright, Puppeteer, Selenium, or other browser automation fallbacks. Inspect local `cdp` CLI syntax first:

```bash
cdp --help
cdp describe --json
cdp doctor --json
cdp workflow --help
```

Validate `/tools/`, `/tools/markdown-to-html`, and `/tools/html-to-markdown` before considering UI work complete. Check deep-link refresh, console errors, failed network requests, unexpected external calls, mobile layout, accessibility tree, performance, dark mode, copy buttons, print/PDF behavior, and hide-source/read-preview modes.

Clean up CDP-opened tabs when finished, e.g. after confirming syntax:

```bash
cdp page cleanup --json
```

Document repeatable findings in `docs/DEBUGGING_WITH_CDP.md`.

## Architecture

Design around a central tool registry and lazy-loaded tool routes:

```text
src/
  app/        app shell, router, theme, layout
  pages/      home page and not-found page
  tools/      registry, shared tool types, one folder per tool
  shared/     reusable UI and browser helpers
  tests/      registry, routing, rendering, conversion tests
```

Each tool lives in `src/tools/<tool-slug>/` with `metadata.ts`, `Tool.tsx`, local `lib/` code, tests where useful, and `README.md`.

Adding a new tool should usually require one new tool folder plus one registry entry.

## Engineering Guard Rails

Principles from the docsearch architecture and clean-code sources are enforced by docs, linting, and tests:

- Deep modules: hide parsing/sanitization details behind small conversion helpers.
- Information hiding: app shell consumes registry metadata, not tool internals.
- Dependency boundaries: `shared/` never imports tool folders; tools may import shared UI.
- Small focused functions: no god components; split layout, copy, conversion, and routing concerns.
- Simplicity with power: keep the UI minimal, elegant, and useful; remove flashy decoration and heavy dependencies when simple code works.
- Simplicity first: do not add abstractions for hypothetical future tools.
- Strict TypeScript: maintain `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, unused checks, and strict lint rules.

## Conversion And Security Boundaries

- Treat Markdown and pasted HTML as untrusted input.
- Sanitize rendered HTML before any `dangerouslySetInnerHTML` usage.
- Do not send user content over the network.
- Do not add telemetry or persistent user-content storage unless maintainers explicitly request it.
- Prefer well-maintained browser-compatible libraries and platform APIs.
- Avoid heavy dependencies unless justified by required functionality and bundle impact.

## GitHub Pages Routing

- Keep Vite `base` as `/tools/`.
- Keep React Router basename `/tools`.
- Preserve clean routes; do not switch to hash routing.
- Build must include `dist/404.html` as the SPA fallback for direct deep links and refreshes.
- Document any routing changes in `docs/DEPLOYMENT.md`.

## Testing Expectations

Maintain tests for:

- Conversion logic for both initial tools.
- Home page and tool page rendering.
- Registry behavior and metadata validity.
- Route stability for `/tools/`, `/tools/markdown-to-html`, and `/tools/html-to-markdown`.
- GitHub Pages base-path assumptions where practical.

Before finalizing meaningful changes, run typecheck, lint, tests, build, and CDP validation when UI behavior is affected.

## Deployment Notes

Use official GitHub Pages Actions practices: install dependencies, run typecheck, lint, tests, build Vite app, upload `dist`, and deploy Pages.

Use `gh --help` and relevant subcommand help before relying on GitHub CLI syntax.

Do not claim deployment succeeded unless the workflow actually ran successfully with repository permissions.

## Completion Checklist

- pnpm install state is current.
- TypeScript passes.
- ESLint passes.
- Tests pass.
- Build succeeds and includes `404.html`.
- Home and tool routes work under `/tools/`.
- No console errors, failed network requests, or unexpected external calls.
- Mobile layout and dark mode work.
- Copy, print/PDF, and hide-source/read-preview modes are validated.
- CDP tabs are cleaned up.
- Docs and tool READMEs are updated.
