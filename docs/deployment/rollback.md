# Rollback

- **Application rollback:** redeploy the previous known-good build/tag.
  Because deploys are independent per app (`web`, `api`), a bad `web`
  deploy does not require rolling back `api` and vice versa.
- **Database rollback:** migrations should be additive/backward-compatible
  (see migration policy) specifically so that rolling back the application
  does not require rolling back the schema. If a destructive migration
  must ship, its rollback plan is written in
  `../database/migrations.md` _before_ it's applied to production.
