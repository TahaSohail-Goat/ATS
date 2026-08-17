# Security Policy

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

If you discover a security vulnerability in this repository or in the ATS
website/API, report it privately:

- **Email:** TBD — add a dedicated security contact address (e.g.
  `security@ats.example`) once established.
- Alternatively, use GitHub's private vulnerability reporting feature for
  this repository, if enabled.

Please include:
- A description of the vulnerability and its potential impact
- Steps to reproduce (proof-of-concept if possible)
- Any relevant logs, request IDs, or affected endpoints

## What to expect
- Acknowledgment target: within a few business days (formal SLA is **TBD**
  pending team growth).
- We will investigate, keep you updated on progress, and credit you (if
  desired) once the issue is resolved and disclosed responsibly.

## Scope
This policy covers:
- `apps/web` (the public ATS website)
- `apps/api` (the ATS API)
- Infrastructure configuration in this repository

Out of scope: third-party services ATS integrates with (report those to
the respective vendor).

## Supported Versions
Only the `main` branch / latest deployed production version is actively
supported with security fixes.

## Engineering Baseline
See [`docs/security/security-policy.md`](./docs/security/security-policy.md)
for the full internal security policy (OWASP baseline, validation,
secrets management, dependency scanning).
