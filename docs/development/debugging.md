# Debugging

- Run `pnpm dev` from the repository root and inspect the Next.js terminal for
  Server Component/build errors.
- Use browser DevTools Performance and Rendering panels to investigate scroll
  jank; first check for new global scroll listeners, layout reads, filters, or
  large fixed layers.
- Use `pnpm typecheck` for TypeScript issues, `pnpm lint` for code rules, and
  `pnpm test:e2e` for route/responsive/browser behaviour.
- Contact delivery belongs to the configured hosted form provider. Debug its
  endpoint and dashboard rather than looking for a local API/database.
