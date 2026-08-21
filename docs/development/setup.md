# Development Setup

## Prerequisites

- Node.js >= 20
- pnpm >= 9 (`corepack enable` recommended)

## Install and run

```bash
git clone <repository-url>
cd ats
pnpm install
pnpm dev
```

The website runs at http://localhost:3000.

## Optional contact submissions

Copy `.env.example` to `apps/web/.env.local` and set
`NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` to the endpoint supplied by your hosted
form provider. Leave it empty when working only on the visual portfolio.

No Docker, PostgreSQL, Prisma, API process, or database migration is required.
