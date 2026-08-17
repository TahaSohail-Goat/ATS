# Deployment Monitoring

- Health (`/api/v1/health`) and readiness (`/api/v1/health/ready`)
  endpoints are checked by the hosting platform / uptime monitor post-
  deploy before routing traffic to a new instance.
- See `../operations/monitoring.md` for ongoing (not just deploy-time)
  monitoring.
