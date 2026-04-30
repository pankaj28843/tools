# Docsearch Workflow

Use `docsearch` before relying on framework or CLI details.

## Baseline

```bash
docsearch --help
docsearch list --json
```

Before using a subcommand:

```bash
docsearch <command> --help
```

## Useful Searches For This Repo

```bash
docsearch search vite "base public path GitHub Pages SPA fallback 404" --json
docsearch fetch vite "https://vite.dev/guide/static-deploy/" --json
docsearch search github-platform "actions configure pages upload-pages-artifact deploy-pages" --json
docsearch search react "lazy Suspense routing single page application" --json
docsearch search vitest "React Testing Library jsdom setup" --json
docsearch search pnpm "install frozen lockfile deploy CI" --json
docsearch search vite "dev server port strictPort preview port" --json
docsearch search docker "multi stage Node pnpm static site nginx" --json
docsearch search agentskills "skill frontmatter description directory SKILL.md" --json
docsearch search a-philosophy-of-software-design "complexity deep modules information hiding" --json
docsearch search clean-code-book "single responsibility small functions duplication" --json
docsearch search clean-architecture-book "dependency rule boundaries architecture" --json
```

Use `docsearch search-all` when the right tenant is unclear, and `docsearch fetch` when full documentation is needed.
