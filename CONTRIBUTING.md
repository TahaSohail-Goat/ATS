# Contributing to ATS

## Branch naming
```
<type>/<short-description>
```
Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`, `perf`,
`security`. Example: `feat/contact-form-rate-limit`.

## Commit conventions
[Conventional Commits](https://www.conventionalcommits.org/):
```
feat:     new feature
fix:      bug fix
docs:     documentation only
refactor: code change that neither fixes a bug nor adds a feature
test:     adding or correcting tests
chore:    tooling, dependencies, maintenance
ci:       CI/CD configuration
perf:     performance improvement
security: security fix or hardening
```
Example: `feat(contact): add rate limiting to submission endpoint`

## Pull requests
1. Branch off `main`.
2. Keep PRs small and single-concern — see root `AGENTS.md` §6.15.
3. Fill out `.github/PULL_REQUEST_TEMPLATE.md` fully, including the testing
   and documentation checklists.
4. All required checks (lint, typecheck, test, build — see
   `.github/workflows/ci.yml`) must pass before merge.
5. At least one review approval is required (see `.github/CODEOWNERS`).

## Code review
Reviewers check against root `AGENTS.md` §5–6: conventions followed,
validation not bypassed, no unjustified dependencies, tests present for
behavior changes, docs updated where architecture changed.

## Branch protection (recommended repository settings)
- `main` is protected: no direct pushes, PR + passing checks + review
  required.
- Required status checks: `typecheck`, `lint`, `test`, `build`.

## Releases & versioning
Semantic Versioning (`MAJOR.MINOR.PATCH`) once the site/API has external
consumers of the API contract. Tag releases; changes are summarized in
[`CHANGELOG.md`](./CHANGELOG.md).

## Issues, labels, milestones
Use the issue templates in `.github/ISSUE_TEMPLATE/`. Standard labels:
`bug`, `enhancement`, `documentation`, `security`, `good-first-issue`.
Milestones are used per roadmap phase (see `docs/product/roadmap.md`).

## Architecture changes
If your change matches any item in root `AGENTS.md` §9, write an ADR
(`docs/decisions/`) before implementing — open it as its own PR for
discussion first.
