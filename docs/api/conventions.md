# API Conventions

## Versioning

All routes are prefixed `/api/v1`. Breaking changes require a new version
prefix (`/api/v2`) or an ADR-approved exception — never an in-place breaking
change to `/api/v1`.

## Response envelope

Success:

```json
{
  "success": true,
  "data": { "...": "..." },
  "meta": { "requestId": "..." }
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable summary",
    "details": [{ "field": "email", "message": "Invalid email address" }]
  },
  "meta": { "requestId": "..." }
}
```

## HTTP status codes

| Code | Meaning                          |
| ---- | -------------------------------- |
| 200  | Success (read)                   |
| 201  | Resource created                 |
| 204  | Success, no content              |
| 400  | Validation error                 |
| 401  | Authentication required/failed   |
| 403  | Authenticated but not authorized |
| 404  | Resource not found               |
| 409  | Conflict (e.g. duplicate)        |
| 429  | Rate limit exceeded              |
| 500  | Unhandled server error           |

## Pagination (for list endpoints)

Query params: `?page=1&pageSize=20`. Response `meta` includes
`{ page, pageSize, total, totalPages }`.

## Filtering & sorting

Query params: `?filter[field]=value&sort=-createdAt` (`-` prefix = descending).
Only expose filter/sort fields explicitly allow-listed per endpoint.

## Validation, auth, and rate-limit error shapes

All use the standard error envelope above with the appropriate `code`:
`VALIDATION_ERROR`, `UNAUTHENTICATED`, `FORBIDDEN`, `RATE_LIMITED`,
`NOT_FOUND`, `INTERNAL_ERROR`.

## OpenAPI

Each module's Zod schemas are the source of truth and are converted to
OpenAPI for the generated docs — schemas are not written twice.
