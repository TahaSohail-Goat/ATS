# Scalability Notes

Current architecture scales by:

- Running multiple stateless `apps/api` instances behind a load balancer
  (no in-memory session/state that would break with more than one instance).
- Next.js built-in optimizations (static generation where possible, server
  components, image/font optimization) for `apps/web`.
- Prisma connection pooling, or a pooler such as PgBouncer, if connection
  counts become a bottleneck — not needed at current scale.

Explicitly deferred until justified by real load: Redis caching, a CDN
strategy beyond the hosting platform's defaults, read replicas, and
background job queues. Introduce any of these via an ADR, with the
triggering metric documented.
