# Security Policy

## Website rules

- Never commit secrets, private tokens, or provider credentials.
- Configure the public hosted-form endpoint in deployment environment values.
- Keep visitor-provided values inside native form controls until the hosted
  provider receives them; do not persist them locally.
- Use semantic HTML and React's default escaping. Do not add unsafe HTML
  injection.
- Keep dependencies minimal and pinned according to the repository rules.
- Report vulnerabilities privately using the process in `SECURITY.md`.

## Future services

If AST later introduces an API, database, authentication, or private admin
surface, document the threat model and architecture in an ADR before coding.
