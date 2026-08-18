# ATS — AI Software and Technology Solutions

#Taha
Monorepo for ATS's public website and the engineering foundation for future
ATS products (SaaS, AI products, client work, internal tools).

> **AI coding agents:** read [`AGENTS.md`](./AGENTS.md) first — it is the
> authoritative instruction set for working in this repository.

## What's here

| App/Package                                    | Purpose                                                                    |
| ---------------------------------------------- | -------------------------------------------------------------------------- |
| [`apps/web`](./apps/web)                       | Public ATS website — Next.js (App Router), TypeScript, Tailwind            |
| [`apps/api`](./apps/api)                       | REST API — Express modular monolith, TypeScript, Prisma/PostgreSQL         |
| [`packages/ui`](./packages/ui)                 | Shared ATS design system (tokens + components)                             |
| [`packages/config`](./packages/config)         | Shared ESLint/TypeScript/Tailwind config                                   |
| [`packages/types`](./packages/types)           | Shared TypeScript types                                                    |
| [`packages/validation`](./packages/validation) | Shared Zod schemas (web + api)                                             |
| [`docs`](./docs)                               | Product, architecture, and engineering documentation — the source of truth |

## Architecture at a glance

```
Client → Next.js (apps/web) → REST /api/v1 → Express (apps/api)
                                                  → Prisma → PostgreSQL
```

Modular monolith backend organized by business domain, not microservices.
Full detail: [`docs/architecture/system-architecture.md`](./docs/architecture/system-architecture.md).

## Local setup

```bash
pnpm install
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
docker compose up -d       # starts local PostgreSQL
pnpm db:migrate
pnpm db:seed
pnpm dev
```

`apps/web` → http://localhost:3000 · `apps/api` → http://localhost:4000

Full walkthrough: [`docs/development/setup.md`](./docs/development/setup.md).

## Common commands

```bash
pnpm dev          # run all apps in dev mode
pnpm build        # build all apps
pnpm lint         # lint all apps/packages
pnpm typecheck    # typecheck all apps/packages
pnpm test         # unit/integration tests
pnpm test:e2e     # Playwright end-to-end tests
pnpm db:migrate   # run Prisma migrations
pnpm db:seed      # seed local dev database
```

## Testing

Vitest for unit/integration tests, Playwright for E2E. Details:
[`docs/development/testing.md`](./docs/development/testing.md).

## Deployment

CI runs on every PR (install → typecheck → lint → test → build). Merges to
`main` deploy to staging automatically; production promotion is manual.
Details: [`docs/deployment/`](./docs/deployment).

## Documentation

Start at [`docs/README.md`](./docs/README.md) for the full map: product
vision, requirements, architecture, API/database conventions, security
policy, and ADRs.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for branch naming, commit
conventions (Conventional Commits), and the PR process.

## Security

See [`SECURITY.md`](./SECURITY.md) to report a vulnerability, and
[`docs/security/`](./docs/security) for the full security policy.

## AI agent instructions

See [`AGENTS.md`](./AGENTS.md) (root) and the scoped `AGENTS.md` files in
`apps/web/`, `apps/api/`, `packages/ui/`, `packages/config/`, and `docs/`.
