# ATS Documentation

This directory is the **source of truth** for product, architecture, and
engineering decisions at ATS. Code should follow what's documented here; if
they diverge, that's a bug in one or the other — fix it, don't ignore it.

## Map

| Section                           | Purpose                                                        |
| --------------------------------- | -------------------------------------------------------------- |
| [`product/`](./product)           | What ATS is building and why                                   |
| [`requirements/`](./requirements) | Functional and non-functional requirements                     |
| [`architecture/`](./architecture) | System, frontend, backend, database, API, security, deployment |
| [`use-cases/`](./use-cases)       | Actor-driven scenarios                                         |
| [`api/`](./api)                   | REST conventions and auth                                      |
| [`database/`](./database)         | Schema, relationships, migration policy                        |
| [`frontend/`](./frontend)         | Design system, accessibility, responsive/animation guidelines  |
| [`security/`](./security)         | Security policy, auth, secrets, threat model                   |
| [`development/`](./development)   | Setup, standards, testing, troubleshooting                     |
| [`deployment/`](./deployment)     | Environments, deploy process, rollback, monitoring             |
| [`decisions/`](./decisions)       | Architecture Decision Records (ADRs)                           |
| [`operations/`](./operations)     | Logging, monitoring, backups, disaster recovery                |
| [`ai/`](./ai)                     | How AI coding agents should work in this repo                  |

Start with [`product/vision.md`](./product/vision.md) if you're new, or
[`../AGENTS.md`](../AGENTS.md) if you're an AI agent.
