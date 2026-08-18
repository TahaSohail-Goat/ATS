# AGENTS.md — docs/

Extends the root `AGENTS.md`.

## Scope

The engineering and product source of truth. Code should follow docs, not
the other way around — if you change architecture, update the doc in the
same PR.

## Rules

- Every new document needs a clear purpose; don't create a doc just to fill
  out a directory structure.
- Use Mermaid for diagrams where practical (architecture, ERDs) so they
  render directly on GitHub.
- Use the FR/NFR/ADR templates already in `docs/requirements/` and
  `docs/decisions/` rather than inventing new formats.
- Mark unknown/undecided items explicitly as `**TBD:**` rather than
  inventing a plausible-sounding decision.
