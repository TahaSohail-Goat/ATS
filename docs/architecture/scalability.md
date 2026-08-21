# Scalability Notes

The current website scales through the selected Next.js hosting provider's CDN,
edge caching, and static/server rendering. The application has no local
mutable state, database connection pool, API process, or background worker.

Performance priorities are:

- keep public pages Server Components by default;
- keep client boundaries small;
- serve fonts and brand assets through Next's optimized build pipeline;
- avoid continuous blur/grain repainting and scroll/pointer observers;
- monitor Core Web Vitals, especially LCP, CLS, and INP.

A persistent lead system, admin dashboard, email pipeline, CRM integration, or
authenticated product would be a separate scale boundary. Add it only when a
concrete requirement and an ADR justify the new service.
