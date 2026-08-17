# Use Cases

## UC-001 — Browse ATS Website

- **Primary Actor:** Website Visitor
- **System Boundary:** apps/web (public pages)
- **Preconditions:** None
- **Trigger:** Visitor navigates to the ATS website
- **Main Success Scenario:**
  1. Visitor loads the homepage.
  2. Visitor navigates to About / Services / Contact via the nav.
  3. Pages render with correct content, metadata, and within performance
     budgets (see `../requirements/non-functional-requirements.md`).
- **Alternative Scenarios:** Visitor arrives via a deep link to a specific
  service page — same rendering rules apply.
- **Exception Scenarios:** Page fails to load → Next.js error boundary
  shows a friendly error page, not a stack trace.
- **Postconditions:** None (read-only).

## UC-002 — Submit Contact/Lead Inquiry

- **Primary Actor:** Website Visitor
- **Secondary Actor:** None (v1 has no notification integration yet)
- **System Boundary:** apps/web (contact form) + apps/api (contact module)
- **Preconditions:** Visitor is on `/contact`.
- **Trigger:** Visitor submits the contact form.
- **Main Success Scenario:** See FR-001 in
  `../requirements/functional-requirements.md`.
- **Postconditions:** A `ContactSubmission` record exists in the database.

## UC-003 — Automated Health Check

- **Primary Actor:** External Services (uptime monitor / orchestrator)
- **System Boundary:** apps/api
- **Trigger:** Periodic HTTP request to `/api/v1/health`.
- **Main Success Scenario:** See FR-003.
- **Postconditions:** None.

Additional use cases are added as features are scoped. Do not add use cases
for unscoped personas (Customer, Administrator) until their features are
approved.
