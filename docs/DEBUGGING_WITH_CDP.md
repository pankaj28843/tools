# Debugging With CDP

Browser validation uses the approved `cdp` CLI / Chrome DevTools flow only.

## Inspect Commands First

```bash
cdp --help
cdp describe --json
cdp doctor --json
cdp workflow --help
cdp page --help
```

## Start A Server

Use pnpm and read the selected port from Vite output:

```bash
pnpm run dev
pnpm run preview
```

Vite may choose the next available high port if the default is busy.

## Required Validation

Validate these URLs using the printed server origin plus route path:

- `/tools/`
- `/tools/markdown-to-html`
- `/tools/html-to-markdown`

Check:

- Deep-link refresh.
- Console errors.
- Failed network requests.
- Unexpected external calls.
- Mobile layout.
- Accessibility tree.
- Performance summary.
- Dark mode.
- Copy buttons where permissions allow.
- Print/PDF behavior.
- Side-by-side desktop workspace.
- Hide-source/read-preview modes.

## Useful Commands

Inspect subcommand help before relying on syntax:

```bash
cdp workflow verify --help
cdp workflow page-load --help
cdp workflow console-errors --help
cdp workflow network-failures --help
cdp protocol exec Emulation.setDeviceMetricsOverride --help
cdp workflow a11y --help
cdp perf summary --help
cdp layout overflow --help
cdp page cleanup --help
```

## Cleanup

Always close CDP-opened tabs when done:

```bash
cdp page cleanup --json
```
