# Monitoring

- **Uptime:** external uptime monitor polling `/api/v1/health` and the
  `apps/web` homepage on an interval (provider TBD).
- **Error tracking:** an error-tracking provider (e.g. Sentry-class tool)
  is planned but not yet integrated — introduce via a small, documented
  change (not an ADR-level decision, but update this doc when added).
- **Metrics:** request count/latency/error-rate per route, exposed for
  scraping or platform-native metrics once traffic justifies it. Not
  implemented for v1 (low traffic marketing site).
