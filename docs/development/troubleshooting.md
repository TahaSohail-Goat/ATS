# Troubleshooting

| Symptom                           | Likely cause                                                      | Fix                                                            |
| --------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------- |
| `pnpm dev` fails to connect to DB | Postgres container not running                                    | `docker compose up -d`, check `docker compose ps`              |
| Type errors after pulling latest  | Stale generated Prisma client                                     | `pnpm --filter @ats/api exec prisma generate`                  |
| CORS errors in the browser        | `CORS_ORIGIN` in `apps/api/.env` does not match `apps/web` origin | Align the values, restart the API                              |
| Lint/format conflicts             | Editor not using repo Prettier/ESLint config                      | Ensure your editor uses the workspace config, not a global one |
