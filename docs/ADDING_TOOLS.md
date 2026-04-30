# Adding Tools

## Folder Convention

Create a folder at `src/tools/<tool-slug>/` with:

- `metadata.ts`
- `Tool.tsx`
- `lib/` for conversion logic
- optional `components/` for tool-local UI
- `README.md`

## Metadata Convention

```ts
export const metadata = {
  slug: 'example-tool',
  title: 'Example Tool',
  description: 'Short user-facing description.',
  keywords: ['example', 'utility'],
};
```

## Registry Steps

Add the metadata and lazy-loaded component to `src/tools/registry.ts`. The registry drives the home page and routes.

## Routing Expectations

Routes must work under `/tools/`. Do not use hash routing. Deep links rely on the GitHub Pages `404.html` fallback generated during build.

## UI Expectations

Use MUI, accessible labels, responsive layouts, dark mode compatibility, and reusable shared components where they fit.

## Testing Expectations

Add conversion tests for pure logic and render tests for core controls. Update registry tests if route assumptions change.

## Documentation Expectations

Each tool README must describe purpose, route, features, conversion approach, and known limitations.

## Validation

Run typecheck, lint, tests, build, and CDP validation before shipping UI work.
