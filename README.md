# ATS — AI Software and Technology Solutions

ATS is a modern Next.js portfolio and company website for a software studio.
The current phase is intentionally frontend-first: static pages, project data,
brand design, animations, and an optional hosted contact-form endpoint.

> AI coding agents: read [`AGENTS.md`](./AGENTS.md) before changing the repo.

## What's here

| Area                                   | Purpose                                                   |
| -------------------------------------- | --------------------------------------------------------- |
| [`apps/web`](./apps/web)               | Next.js App Router website                                |
| [`packages/ui`](./packages/ui)         | Shared ATS design primitives and tokens                   |
| [`packages/config`](./packages/config) | Shared TypeScript and ESLint config                       |
| [`docs`](./docs)                       | Product, frontend, accessibility, and deployment guidance |

There is deliberately no API server, database, Docker service, or ORM in this
phase. The visual portfolio does not need them. The contact form can optionally
POST to a hosted form provider configured with
`NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`.

## Local setup

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

To enable contact submissions, copy the example environment file and set a
hosted form endpoint from a provider such as Formspree, Basin, or FormSubmit:

```bash
cp .env.example apps/web/.env.local
```

Do not commit real endpoints or secrets. The endpoint is public by design and
should be configured in the deployment platform.

## Common commands

```bash
pnpm dev          # run the website in development
pnpm build        # build the website
pnpm lint         # lint workspace packages
pnpm typecheck    # typecheck workspace packages
pnpm test         # unit tests
pnpm test:e2e     # Playwright browser tests
pnpm format       # format source and documentation
```

## Frontend architecture

The site uses Next.js App Router, TypeScript, Tailwind CSS, Framer Motion,
Lucide icons, and the shared `@ats/ui` package. Server Components are the
default. Client boundaries are reserved for navigation, theme selection, and
purposeful reveal choreography.

See [`docs/frontend/design-system.md`](./docs/frontend/design-system.md),
[`docs/frontend/website-design-brief.md`](./docs/frontend/website-design-brief.md),
and [`docs/frontend/animation-guidelines.md`](./docs/frontend/animation-guidelines.md).

## Future products

If ATS later needs persistent leads, an admin dashboard, email automation, CRM
integration, accounts, or authenticated products, add that capability as a
separate architectural decision. Do not reintroduce an API/database merely to
support the static portfolio.
