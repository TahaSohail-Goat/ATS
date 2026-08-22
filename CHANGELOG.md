# Changelog

All notable changes to this project are documented here.

## [Unreleased]

### Changed

- Migrated from Next.js monorepo to a clean, fast standalone **Vite + React 19 + React Router** SPA architecture.
- Removed unused backend API, Prisma, PostgreSQL, Docker, and monorepo tooling (`pnpm`, `turbo`).
- Merged UI components and design tokens directly into `src/ui/`.
- Replaced on-demand SSR route compilation with instant 0ms client-side transitions via React Router.
- Restored and standardized Google Fonts typography (`Inter` & `JetBrains Mono`).
- Synchronized headline gradient reveals to eliminate delayed text appearance.
- Upgraded package manager workflow to standard `npm`.
