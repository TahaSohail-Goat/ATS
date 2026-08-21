# Security Architecture

The current ATS runtime is a public Next.js website with static content and an
optional hosted contact-form POST.

- No API keys, database credentials, or private secrets are required by the
  frontend.
- The contact endpoint is a public deployment value because the browser posts
  to it directly; configure it through the hosting platform rather than source
  control.
- React escaping, native browser form validation, semantic HTML, and Next.js
  response handling provide the baseline application safety.
- The hosted form provider is responsible for rate limiting, spam controls,
  delivery, and retention. Review its policy before enabling submissions.
- Do not add authentication, a database, or a custom API without an ADR and a
  concrete requirement.
