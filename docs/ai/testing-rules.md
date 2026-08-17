# Testing Rules (AI-agent specific notes)

See `../development/testing.md`. Agent-specific reminders:
- Never delete or skip a failing test to make CI green — fix the code or,
  if the test is actually wrong, explain why in the PR and fix the test.
- New behavior without a new/updated test is an incomplete change, not a
  faster one.
