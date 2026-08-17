# Non-Functional Requirements

Measurable targets are included where the team can realistically commit to
them for a v1 marketing site. Items marked TBD require business input.

## Performance
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms on a throttled 4G
  profile, for the public marketing pages.
- API p95 response time < 300ms for the contact endpoint under normal load.

## Scalability
- Stateless API processes — horizontal scaling via additional instances
  behind a load balancer, no code changes required.
- Database connection pooling configured (Prisma) rather than one
  connection per request.

## Availability & Reliability
- Target 99.5% uptime for v1 (marketing site + contact form). TBD: formal
  SLA once there is a paying customer base.
- Health/readiness endpoints exist for orchestration and uptime monitoring.

## Security
- See `../security/security-policy.md`. OWASP Top 10 mitigations are
  baseline, not optional.

## Maintainability
- All shared logic lives in `packages/`; no copy-pasted business logic
  across apps.
- CI blocks merges that fail lint, typecheck, or tests.

## Accessibility
- WCAG 2.1 AA for all public pages. See `../frontend/accessibility.md`.

## Observability
- Structured JSON logs with request IDs on every API request.
- See `../operations/monitoring.md` and `../operations/logging.md`.

## SEO
- Every public route has title/description metadata, Open Graph tags, and
  is included in `sitemap.xml`. See `../frontend/design-system.md` (SEO
  section) and `functional-requirements.md`.

## Responsiveness / Browser Compatibility
- Supports latest two versions of Chrome, Firefox, Safari, Edge, and
  current iOS/Android mobile browsers. Responsive from 320px width up.

## Privacy & Data Protection
- Contact form data is stored only for its business purpose (lead
  follow-up). Formal retention policy and any regulatory compliance
  (GDPR/CCPA applicability) is **TBD** — pending legal/business input on
  which jurisdictions ATS operates in.

Do not treat any of the above as guaranteeing a specific legal compliance
status without a business/legal decision recorded in `../decisions/`.
