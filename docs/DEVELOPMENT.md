# Development

## Package Manager

Use pnpm.

```bash
pnpm install
pnpm run dev
```

In CI, use `pnpm install --frozen-lockfile` so dependency drift fails fast.

## Ports

The Vite dev and preview servers use default high ports but `strictPort: false`, so they automatically move to the next available port. Always use the URL printed by Vite or captured from logs.

## Quality Gates

```bash
pnpm run typecheck
pnpm run lint
pnpm run test:run
pnpm run build
```

## Guard Rails

- Strict TypeScript catches boundary mistakes.
- ESLint protects hooks, type hygiene, accessibility, and unused code.
- Tests protect registry, route, conversion, and rendering behavior.

## Research And Tmp Artifacts

Durable research belongs in `~/deep-research/tools`. Screenshots, logs, CDP bundles, and scratch files belong in `tmp/`. Neither should be committed unless explicitly requested.
