# Local Development Setup

## Prerequisites
- Node.js >= 20
- pnpm >= 9 (`corepack enable` recommended)
- Docker (for local Postgres)

## Steps
```bash
git clone <repo-url>
cd ats
cp .env.example apps/web/.env
cp .env.example apps/api/.env   # then fill in the real values you need
pnpm install
docker compose up -d            # starts Postgres
pnpm db:migrate
pnpm db:seed
pnpm dev                        # runs web + api together via turbo
```

- `apps/web` → http://localhost:3000
- `apps/api` → http://localhost:4000

See `.env.example` files (root, `apps/web`, `apps/api`) for the full
variable list.
