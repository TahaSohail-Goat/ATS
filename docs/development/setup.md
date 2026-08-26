# Development Setup

## Prerequisites

- Node.js >= 20
- npm >= 9

## Install and run

```bash
git clone <repository-url>
cd ast
npm install
npm run dev
```

The website runs at http://localhost:3000 with instant Hot Module Replacement (HMR).

## Commands

```bash
npm run dev        # start local development server (Vite)
npm run build      # compile production bundle to dist/
npm run preview    # preview production build locally
npm run typecheck  # verify TypeScript types
```

No Docker, PostgreSQL, Prisma, backend processes, or database migrations are required.
