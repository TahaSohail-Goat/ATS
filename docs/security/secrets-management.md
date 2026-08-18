# Secrets Management

- Real secrets live only in the deployment platform's secret store (or a
  local, gitignored `.env`) — never in the repository.
- `.env.example` (root and per-app) documents variable _names_ and
  placeholder/example values only.
- Rotate any secret that is ever accidentally committed immediately, then
  scrub history — do not assume removing the file in a later commit is
  sufficient.
- CI secrets are stored as GitHub Actions encrypted secrets, referenced by
  name in workflows, never printed to logs.
