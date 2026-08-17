# API Architecture

REST, versioned under `/api/v1`, JSON in/out. See `../api/conventions.md`
for the full contract (response envelope, error format, pagination,
status codes).

```mermaid
flowchart LR
    Web[apps/web] -->|HTTPS JSON| V1["/api/v1/*"]
    V1 --> Auth[/auth/*]
    V1 --> Contact[/contact]
    V1 --> Health[/health]
```

OpenAPI documentation is generated from the Zod schemas / route
definitions (strategy: `zod-to-openapi` or equivalent) and served at
`/api/v1/docs` in non-production environments. Exact tooling choice is
finalized when the first few modules stabilize — tracked as an
implementation task, not an architectural one.
