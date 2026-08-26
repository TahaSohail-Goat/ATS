# Functional Requirements

## FR-001 — View Company and Services Information

- **Actor:** Website visitor
- **Main flow:** Visitor navigates the public site and reads static company,
  service, project, and career content.
- **Acceptance criteria:** Pages render correct metadata, are responsive, use
  semantic headings, and meet the accessibility bar.
- **Priority:** Must

## FR-002 — Optional Contact Enquiry

- **Actor:** Website visitor
- **Precondition:** A hosted form endpoint is configured through
  `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` in the deployment environment.
- **Main flow:**
  1. Visitor fills name, email, message, and optional company/phone fields.
  2. Native browser validation checks required fields and email format.
  3. Browser submits a standard POST to the configured hosted form provider.
  4. The provider handles delivery, spam protection, and any retention policy.
- **Alternative flow:** If no endpoint is configured, the form explains how to
  enable it and does not pretend that a message was delivered.
- **Acceptance criteria:** No AST API or local database is required; the form
  never posts visitor data to an unknown URL; required fields are labelled and
  keyboard operable.
- **Priority:** Should

## Future requirements

Persistent lead management, email automation, CRM integrations, accounts, and
admin tooling are intentionally out of scope until the business requires them.
