# Contributing

## Principles

This repo favors simple, testable modules over clever abstractions. Follow the guard rails in `PROJECT_CONSTITUTION.md` and `AGENTS.md`.

## Development

```bash
pnpm install
pnpm run dev
pnpm run typecheck
pnpm run lint
pnpm run test:run
pnpm run build
```

Do not assume a dev or preview port is free. Vite will print the selected port.

## Before Opening A PR

- Run typecheck, lint, tests, and build.
- Validate changed UI in a browser with CDP.
- Confirm no unexpected network calls.
- Keep research and temporary artifacts out of the commit.
- Document new tools and update `src/tools/registry.ts`.

## Commit Scope

Commit what changed in the product and durable docs. Do not commit `tmp/`, deep research, generated debug bundles, screenshots, or local environment files.
