# Deployment Architecture

## Current phase

Deploy only `apps/web` as a Next.js application on the chosen hosting
provider. The repository is compatible with a standard Node/Next deployment;
static export can be considered separately if all desired hosting features are
confirmed.

The deployment needs only:

- `NEXT_PUBLIC_APP_URL` for canonical metadata.
- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` if contact submissions should be
  enabled through a hosted form provider.

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
