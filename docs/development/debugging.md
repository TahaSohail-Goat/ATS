# Debugging

- **API:** structured logs (`../operations/logging.md`) include a
  `requestId` — grep by that ID to trace a single request end-to-end.
- **Frontend:** use React DevTools + Next.js's built-in error overlay in
  development; Server Component errors show in the terminal running
  `pnpm dev`.
- **Database:** `pnpm db:studio` opens Prisma Studio against your local DB.
