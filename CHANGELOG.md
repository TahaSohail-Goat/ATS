# Changelog

All notable changes to this project are documented here.

## [Unreleased]

### Changed

- Simplified the repository to the frontend-first ATS portfolio: `apps/web`,
  `packages/ui`, and shared config remain; the unused Express API, Prisma,
  PostgreSQL, Docker, and backend-only packages were removed.
- Replaced the local contact API/database flow with an optional native POST to a
  hosted form provider configured by `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`.
- Reduced client/scroll work by removing global scroll progress, per-card
  pointer listeners, scroll-linked parallax, count-up loops, continuous grain,
  and animated interior-page auroras.
- Made font loading explicit with declared weights, fallback metrics, no
  synthetic font weights, and a non-preloaded below-the-fold mono face.
- Updated CI, deployment, setup, architecture, security, and agent guidance
  for the frontend-only phase.
