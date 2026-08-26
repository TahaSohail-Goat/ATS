# AST — AI Software and Technology Solutions

AST is a modern React portfolio and company website for a software studio, built with **Vite**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **React Router**.

The architecture is lightweight and frontend-first: instant client-side page transitions, brand design, smooth animations, and zero server or database complexity.

> AI coding agents: read [`AGENTS.md`](./AGENTS.md) before changing the repo.

## What's here

| Area                    | Purpose                                                   |
| ----------------------- | --------------------------------------------------------- |
| [`src/`](./src)         | Application source code (pages, components, UI primitives) |
| [`src/pages`](./src/pages)| Route pages (Home, About, Services, Projects, Careers, Contact, 404) |
| [`src/ui`](./src/ui)    | Reusable design primitives, tokens, and components         |
| [`src/data`](./src/data)| Static portfolio data (projects, services, testimonials)   |
| [`public`](./public)    | Static assets (brand logo, icons)                         |
| [`docs`](./docs)        | Product, architecture, design system, and development docs|

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Common Commands

```bash
npm run dev        # Run the development server with instant HMR (Vite)
npm run build      # Build optimized production bundle in dist/
npm run preview    # Locally preview the production build
npm run typecheck  # Typecheck TypeScript code
```

## Technology Stack

- **Framework & Bundler:** Vite 6
- **UI & Runtime:** React 19, TypeScript
- **Routing:** React Router 7 (SPA client-side navigation)
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Motion & Icons:** Framer Motion, Lucide React
- **Typography:** Inter & JetBrains Mono

## Architecture Guidelines

- Keep client components focused and lightweight.
- Use semantic design tokens (`--ast-*`) rather than hardcoded hex values.
- Respect reduced motion and accessibility standards (`aria-*`, keyboard navigation).
- All static content lives in `src/data/`.
