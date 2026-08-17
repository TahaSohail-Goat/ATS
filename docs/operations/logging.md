# Logging

- Structured JSON logs from `apps/api/src/shared/logger` (pino-based).
- Every request gets a `requestId` (propagated via middleware), included
  in every log line for that request — this is the primary debugging tool
  (see `../development/debugging.md`).
- Log levels: `fatal, error, warn, info, debug, trace`, controlled by
  `LOG_LEVEL` env var. Production defaults to `info`.
- Never log secrets, full request bodies containing PII without redaction,
  or raw auth tokens.
