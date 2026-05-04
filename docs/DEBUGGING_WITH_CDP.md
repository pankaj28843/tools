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
- `/tools/clipboard-inspector`
- `/tools/base64`

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
- Base64 encode/decode, invalid input feedback, swap, clear, and copy output.

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

## Repeatable Visual Route Diagnostics

Start Vite, then pass the printed origin to the visual route helper:

```bash
pnpm run dev
pnpm run visual:routes -- http://127.0.0.1:5173
```

The script captures desktop and mobile diagnostics for `/tools/`, `/tools/markdown-to-html`, `/tools/html-to-markdown`, `/tools/clipboard-inspector`, and `/tools/base64`. Artifacts stay under `tmp/visual-runs/<timestamp>/` with `summary.json` and `summary.md`.

## Cleanup

Always close CDP-opened tabs when done:

```bash
cdp page cleanup --json
```
