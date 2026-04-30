# Architecture

Tools Workshop is a static, browser-only SPA deployed under the GitHub Pages subpath `/tools/`.

## Core Shape

```text
src/
  app/        shell, router, theme, layout
  pages/      home and not-found pages
  shared/     reusable UI and browser helpers
  tools/      central registry plus one folder per tool
  tests/      cross-cutting registry, routing, render, and conversion tests
```

## Routing

- Vite `base` is `/tools/`.
- React Router uses basename `/tools`.
- Tool routes are clean paths: `/tools/<tool-slug>`.
- `pnpm run build` copies `dist/index.html` to `dist/404.html`, giving GitHub Pages a SPA fallback for deep-link refreshes.

## Tool Registry

`src/tools/registry.ts` is the single source of truth for available tools. Each tool contributes metadata and a lazy-loaded component. The home page and route table derive from this registry.

Adding a tool should usually require one folder and one registry entry.

## Browser-Only Boundary

Conversion logic runs in local JavaScript. The app must not send user-entered content to any server. If a dependency introduces remote calls, remove it or gate it before release.

## Security Boundary

Markdown and pasted HTML are untrusted. Rendered HTML must be sanitized before use. Direct `dangerouslySetInnerHTML` is allowed only for sanitized content at the rendering edge.

## Design Principles

- Simplicity with power: the interface should be minimal, elegant, dense with utility, and free of decorative excess.
- Deep modules: conversion helpers hide parsing/sanitization details from pages.
- Information hiding: callers use registry metadata and tool components, not tool internals.
- Dependency direction: app shell and pages depend on registry/shared UI; tools can depend on shared UI, but shared UI does not depend on tool folders.
- Small focused functions: conversion, layout, copy, and routing stay separate.
- Lean dependencies: prefer MUI primitives, browser APIs, and small local components over heavy UI libraries.
- Testable boundaries: pure conversion helpers are unit-tested, registry behavior is tested, and UI smoke tests cover route surfaces.

## Performance

- Tool components are lazy-loaded.
- Initial route should stay lightweight.
- Avoid PDF-generation libraries unless print CSS cannot meet requirements.
- Avoid layout/icon/font packages unless native CSS or MUI cannot meet the need.
- Use cdp-cli performance diagnostics during UI validation.
