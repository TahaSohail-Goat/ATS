# Product Vision

**ATS — AI Software and Technology Solutions** builds software, AI products,
and technology solutions for clients and, over time, its own SaaS/AI
products.

**TBD (business decision required):** the long-form vision statement,
target market positioning, and elevator pitch. This document is a
placeholder structure — fill in once the founding team has finalized
messaging. Do not invent marketing claims on the company's behalf.

## What this repository currently supports
The initial deliverable is the public ATS website: an informational site
describing the company, its services, and a way for prospective clients to
get in touch (contact/lead capture).

## Long-term direction
The repository is architected so that, without restructuring:
- New applications (admin dashboard, customer portal, docs site) can be
  added under `apps/`.
- New backend domains (billing, projects, AI services) can be added as
  modules under `apps/api/src/modules/` or, if requirements justify it,
  new services — decided via ADR.
- Shared UI, types, and validation logic scale via `packages/`.
