# Deployment Architecture

## Current phase

The public site is a Vite and React single-page app deployed to Vercel. The
build emits static HTML for each public route, then Vercel serves those files
with the SPA rewrite as a fallback for unknown paths.

The production canonical origin is `https://www.astsolutions.dev`, configured
in `src/lib/seo.ts`. `npm run build` runs TypeScript, builds the Vite bundle,
pre-renders all declared public routes, and writes `dist/sitemap.xml` from the
project data. `public/robots.txt` points crawlers to that sitemap.

When adding a public route, update the shared route metadata in
`src/lib/seo.ts` and the route list in `scripts/prerender.mjs` so its page HTML
and sitemap entry are generated together.

No database migrations, Docker services, API process, CORS configuration, or
runtime secrets are required for the portfolio.

## Pipeline

The CI workflow runs install → typecheck → lint/format → unit tests → build.
The deploy workflow builds the frontend and leaves the provider-specific deploy
step explicit until hosting is selected.

## Future boundary

An API/database may be introduced later for persistent leads, admin tooling,
email automation, CRM integration, accounts, or authenticated products. That
would change the deployment architecture and requires an ADR before
implementation.
