# Agent Workflow

The full protocol is defined in root `AGENTS.md` §7:

```
Understand → Inspect → Plan → Implement → Test → Review → Document
```

Practical notes:

- "Inspect" means actually reading the code and docs in scope, not
  pattern-matching from the file name. Read the module/feature you're
  touching plus its `AGENTS.md`.
- "Plan" for anything touching more than one module/app, or the database,
  should be stated explicitly (in the PR description or commit message)
  before implementation — this is what makes review fast.
- Small, single-concern PRs are strongly preferred over large ones that mix
  refactors with feature work.
