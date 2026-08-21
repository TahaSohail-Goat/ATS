# Product Vision

ATS — AI Software and Technology Solutions — builds software, AI products, and
technology solutions for clients and, over time, its own SaaS/AI products.

The current deliverable is a polished public portfolio/company website that
explains ATS's capabilities, shows illustrative work, and gives prospective
clients a clear way to start a conversation.

## Current boundary

The website is frontend-first and does not require an API server, database,
Docker service, ORM, accounts, or authentication. Static project/service data
lives in `apps/web/src/data` and shared visual primitives live in `packages/ui`.

The contact page can POST to an optional hosted form provider configured with
`NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`. Provider delivery/storage is deliberately
outside this repository.

## Future direction

Persistent leads, admin tools, email automation, CRM integration, accounts, or
product APIs may be added when a concrete product requirement exists. Each new
runtime service or authentication approach requires an ADR before it is
introduced.
