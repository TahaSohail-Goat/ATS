# Environments

| Environment | Purpose                                             | Deploy trigger                |
| ----------- | --------------------------------------------------- | ----------------------------- |
| Development | Local machine                                       | N/A (`pnpm dev`)              |
| Test        | CI test runs, ephemeral DB                          | Automatic on every PR         |
| Staging     | Pre-release verification, mirrors production config | Automatic on merge to `main`  |
| Production  | Live traffic                                        | Manual promotion from staging |

Each environment has its own `.env` values (never shared secrets between
environments). Hosting provider(s) for staging/production are **TBD** — see
`../architecture/deployment-architecture.md`.
