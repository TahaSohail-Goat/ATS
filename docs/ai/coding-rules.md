# Coding Rules (AI-agent specific notes)

All standards are in root `AGENTS.md` §5. Additional notes for agents:

- Do not "helpfully" reformat unrelated code while making a change — keep
  diffs scoped to the task.
- Do not upgrade dependencies as a side effect of an unrelated change.
- When uncertain which existing pattern to follow, search for a similar
  existing module/feature and mirror it rather than inventing a new one.
