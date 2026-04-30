---
name: tools-gh-pages
description: Work on GitHub Pages deployment for the Tools Workshop Vite SPA under /tools/.
---

# GitHub Pages Deployment

1. Inspect `gh --help` and relevant subcommand help before using GitHub CLI syntax.
2. Preserve Vite `base: '/tools/'` and React Router basename `/tools`.
3. Keep clean routes; do not switch to hash routing.
4. Ensure `pnpm run build` creates `dist/404.html` as the SPA fallback.
5. CI should run `pnpm install --frozen-lockfile`, typecheck, lint, tests, build, upload Pages artifact, and deploy Pages.
6. Do not claim deployment succeeded unless the GitHub Actions run actually succeeds.
