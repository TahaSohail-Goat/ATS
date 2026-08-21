# Deployment

1. A pull request must pass install, typecheck, lint, format, tests, and build.
2. Merge to `main` triggers the frontend deployment workflow.
3. The selected hosting provider builds and deploys `apps/web`.
4. Configure `NEXT_PUBLIC_APP_URL` and, when accepting enquiries,
   `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` in the provider environment.
5. Run the Playwright smoke suite against the deployed preview/staging URL
   when the provider is selected.

There are no database migrations, API deployment steps, Docker services, or
runtime database secrets in the current phase.
