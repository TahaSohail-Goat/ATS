# Search engine optimization

The production site uses the canonical origin `https://www.astsolutions.dev`.
Route titles, descriptions, canonical URLs, social sharing tags, and project
detail metadata are defined in `src/lib/seo.ts`. The root document also carries
`Organization` and `WebSite` JSON-LD describing the AST Solutions identity.

`npm run build` pre-renders each declared public route to static HTML and writes
`dist/sitemap.xml`. This keeps the page content and route metadata in the first
HTTP response while preserving client-side navigation. Crawling rules live in
`public/robots.txt`.

When adding a route:

1. Add its title and concise, page-specific description to `ROUTE_METADATA` in
   `src/lib/seo.ts` (project details resolve from `src/data/projects.ts`).
2. Add its path to the `paths` list in `scripts/prerender.mjs` so it is rendered
   and included in the sitemap.
3. Keep the canonical host, Organization name, and public social profile URLs
   consistent with the real AST Solutions brand.

After a deployment, verify `https://www.astsolutions.dev/robots.txt` and
`https://www.astsolutions.dev/sitemap.xml`, add the domain property in Google
Search Console, submit the sitemap, and inspect the homepage and priority
landing pages. Search Console ownership verification and sitemap submission
require access to the site's DNS or Google account; they are not performed by
the build.
