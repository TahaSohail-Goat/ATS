# Security Rules (AI-agent specific notes)

See `../security/security-policy.md` and root `AGENTS.md` §6. Absolute
rules for agents: never disable validation, auth checks, CORS
restrictions, or rate limiting to make a task easier; never commit a real
secret; never log sensitive data. If a task seems to require any of these,
stop and ask.
