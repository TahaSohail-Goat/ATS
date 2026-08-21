# Use Cases

## UC-001 — Explore the ATS website

- **Primary actor:** Website visitor
- **Trigger:** Visitor opens the site or follows a shared route.
- **Flow:** Visitor reads the hero, services, selected work, principles,
  process, technology, and company information; navigation links move between
  public routes.
- **Postconditions:** None. Content is static/read-only.

## UC-002 — Send a project enquiry

- **Primary actor:** Website visitor
- **Precondition:** `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is configured.
- **Trigger:** Visitor submits the contact form.
- **Flow:** Browser validates required fields and POSTs directly to the hosted
  form provider.
- **Postconditions:** The provider receives the submission according to its
  own delivery and retention policy.

If no provider endpoint is configured, the page clearly explains that the
contact integration is disabled; no local persistence is attempted.
