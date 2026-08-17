# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/), and this
project uses [Semantic Versioning](https://semver.org/) once the API has
external consumers.

## [Unreleased]

### Added
- Initial repository architecture: pnpm/Turborepo monorepo, `apps/web`
  (Next.js) and `apps/api` (Express modular monolith), shared `packages/`
  (ui, config, types, validation).
- Contact form feature (FR-001): frontend form + `/api/v1/contact`
  endpoint, backed by PostgreSQL/Prisma.
- Health/readiness endpoints (`/api/v1/health`, `/api/v1/health/ready`).
- Full documentation architecture under `docs/` (product, requirements,
  architecture, API, database, frontend, security, development,
  deployment, decisions/ADRs, operations, AI-agent guides).
- CI/CD: GitHub Actions (`ci.yml`, `security.yml`, `deploy.yml`), issue
  and PR templates, CODEOWNERS, Dependabot.
- ATS brand design tokens in `packages/ui`.
