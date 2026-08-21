# Security Policy

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

If you discover a vulnerability in this repository or the ATS website, report
it privately through GitHub's private vulnerability reporting feature if it is
enabled. A dedicated security email will be added once ATS has one.

Please include a description, impact, reproduction steps, and affected routes
or assets. Do not include real visitor data or secrets in a report.

## Scope

This policy covers the public Next.js website, shared UI package, build
configuration, CI workflows, and deployment configuration. Third-party hosted
form providers are outside this repository's control; report provider-specific
issues to the respective vendor.

## Supported Versions

Only the `main` branch and latest deployed production version are actively
supported with security fixes.

## Engineering Baseline

See [`docs/security/security-policy.md`](./docs/security/security-policy.md)
for the internal website security policy.
