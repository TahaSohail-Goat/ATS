# Deployment Architecture (Overview)

See `../deployment/environments.md` and `../deployment/deployment.md` for
details. Summary:

```mermaid
flowchart LR
    Dev[Developer] -->|PR| GH[GitHub]
    GH -->|CI: lint/typecheck/test/build| CI[GitHub Actions]
    CI -->|merge to main| Staging[Staging Deploy]
    Staging -->|manual promote| Prod[Production Deploy]
```

- `apps/web` and `apps/api` are independently deployable; both build via
  Turborepos
