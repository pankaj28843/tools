# Deployment

## GitHub Pages Shape

The production URL is `https://pankaj28843.github.io/tools/`. Vite is configured with `base: '/tools/'` so built assets resolve under the repository subpath.

## Clean Routes

React Router uses basename `/tools`, so routes are:

- `/tools/`
- `/tools/markdown-to-html`
- `/tools/html-to-markdown`
- `/tools/clipboard-inspector`
- `/tools/base64`

## SPA Fallback

GitHub Pages serves `404.html` for unknown paths. The build script copies `dist/index.html` to `dist/404.html`, allowing direct deep links and refreshes to load the SPA and let React Router resolve the route.

## Workflow

`.github/workflows/deploy-pages.yml`:

1. Checks out the repository.
2. Sets up pnpm and Node.
3. Installs with `pnpm install --frozen-lockfile`.
4. Runs typecheck, lint, tests, and build.
5. Uploads `dist` with `actions/upload-pages-artifact`.
6. Deploys with `actions/deploy-pages`.

## Repository Settings

Set Pages source to GitHub Actions in repository settings. Do not claim deployment succeeded until a workflow run completes successfully.
