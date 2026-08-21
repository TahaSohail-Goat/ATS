# Change Management

## Adding a new frontend feature

1. Create `apps/web/src/features/<feature>/`.
2. Use a Server Component by default; add a client boundary only for real
   interactivity or purposeful Framer Motion choreography.
3. Use shared brand components from `packages/ui`; add a primitive there only
   if it is genuinely reusable.
4. Keep static content in `apps/web/src/data`.
5. Add unit/browser coverage for critical behaviour and update the relevant
   frontend documentation.

## Contact changes

1. Keep the form native and provider-agnostic.
2. Use `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` for the public hosted endpoint.
3. Never add local persistence or send data to a hardcoded unknown URL.
4. Document provider setup and test only the local form/route behaviour; do not
   submit real visitor data from CI.

## Performance changes

1. Check whether the change adds a client boundary, scroll listener, pointer
   handler, layout read, filter, or continuously animated layer.
2. Prefer transform/opacity and CSS-only effects.
3. Test mobile widths, reduced motion, console errors, and route traversal.

## Creating an ADR

Copy `docs/decisions/ADR-0001-template.md` to the next numbered file and fill
in Context / Decision / Alternatives / Consequences before implementing any
new runtime service, database, authentication approach, or hosting change.
