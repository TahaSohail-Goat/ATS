# AGENTS.md — AST Portfolio Instructions

This repository contains the AST public portfolio/company website.
The frontend is a visual, client-side SPA built with Vite and React. Do not add backend, database, authentication, queues, or other runtime services unless the user requests a concrete product requirement and an ADR is written first.

## Technology stack

- **Core:** Vite 6, React 19, TypeScript
- **Routing:** React Router 7 (`react-router-dom`)
- **Styling:** Tailwind CSS, PostCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Design Tokens:** `src/ui/tokens/`
- **Package Manager:** standard `npm`

## Repository map

```
src/
  pages/        Page views (Home, About, Services, Projects, Careers, Contact, NotFound)
  components/   Shared layout and motion components (Header, Footer, Aurora, ProjectCard, etc.)
  features/     Domain-specific feature blocks (Home sections, ContactForm)
  ui/           Design tokens, primitives (Button, Card, Badge, Input), and utilities (cn)
  data/         Static portfolio content (projects, services, navigation, site info)
  styles/       Global CSS, Tailwind layers, and design token CSS variables
  lib/          Motion utilities and theme store
public/         Static brand assets, logos, and icons
docs/           Design system, architecture, product, and development guides
```

## Architecture rules

- React SPA with React Router.
- Static project/service content belongs in `src/data/`.
- Reusable brand primitives belong in `src/ui/`.
- Use semantic design tokens (`--ast-*`), not hardcoded brand hex values.
- Keep animation boundaries purposeful. Avoid heavy continuous SVG grain or excessive blur layers.
- Every route needs accessible labels, focus states, responsive layouts, and reduced-motion fallbacks.

## Change protocol

Understand → Inspect → Plan → Implement → Test → Review → Document.

Run the relevant checks after changes:

```bash
npm run typecheck
npm run build
```
