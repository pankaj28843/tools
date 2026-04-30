# Project Constitution

## Privacy First

Tools Workshop is browser-only. User content must not leave the browser for conversion, preview, copy, or export.

## Network Discipline

Do not add backend services, telemetry, analytics, or conversion APIs. Unexpected external calls are release blockers.

## Public Repo Hygiene

Commit durable application code, tests, and maintainer documentation. Keep deep research in `~/deep-research/tools` and transient artifacts in `tmp/`.

## Simplicity With Power

The product should feel quiet, minimal, and capable. Use every pixel deliberately. Avoid flashy decoration, ornamental motion, and heavy UI libraries when native browser or small React code is enough.

## Performance Budgets

- Lazy-load tools.
- Keep the home route small and fast.
- Avoid heavy dependencies unless they unlock required functionality.
- Prefer browser print for PDF export over large PDF libraries.
- Prefer simple CSS grid/flex layouts over layout libraries.
- Profile with CDP before shipping meaningful UI work.

## Accessibility

Use semantic structure, accessible labels, keyboard-friendly controls, and sufficient contrast in light and dark modes. CDP accessibility checks are required before declaring UI work complete.

## Mobile First

Every route must work on narrow screens. Side-by-side desktop workspaces must collapse into readable stacked mobile layouts.

## TypeScript Strictness

Strict TypeScript is mandatory. `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, unused checks, and lint rules are guard rails, not suggestions.

## Testing

Maintain tests for conversion logic, registry integrity, route stability, and core rendering behavior. Add targeted tests when new tools or routing assumptions are introduced.

## Tool Registration

Each tool owns a folder under `src/tools/<slug>/`, exports metadata, includes a `README.md`, and is registered once in `src/tools/registry.ts`.

## Documentation

Every new tool must document purpose, route, features, conversion approach, limitations, and validation expectations.

## CDP Validation

Before shipping UI behavior, validate `/tools/`, `/tools/markdown-to-html`, and `/tools/html-to-markdown` with the approved `cdp` CLI workflow only. Do not use Chrome DevTools MCP, Playwright, or other browser automation. Check deep-link refresh, console errors, network failures, mobile layout, accessibility, dark mode, copy actions, PDF print behavior, hide-source/read-preview modes, and cleanup tabs.

## Deployment

GitHub Pages deployment uses official Pages Actions. Do not claim production deployment until the workflow actually succeeds with repository permissions.
