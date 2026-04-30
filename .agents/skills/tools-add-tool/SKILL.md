---
name: tools-add-tool
description: Add a new browser-only utility to this Tools Workshop SPA. Use when creating or registering a new /tools/<slug> route.
---

# Add A Tool

1. Read `AGENTS.md`, `ARCHITECTURE.md`, and `docs/ADDING_TOOLS.md`.
2. Create `src/tools/<slug>/metadata.ts`, `Tool.tsx`, `lib/`, and `README.md`.
3. Register the tool in `src/tools/registry.ts` with a lazy component.
4. Keep conversion local to the browser; no backend, telemetry, or external API calls.
5. Sanitize untrusted HTML before rendering.
6. Add conversion, registry, and render tests.
7. Run `pnpm run typecheck`, `pnpm run lint`, `pnpm run test:run`, and `pnpm run build`.
8. Validate changed UI with CDP and clean up tabs.
