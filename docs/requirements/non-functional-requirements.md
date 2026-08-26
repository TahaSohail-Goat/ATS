# Non-Functional Requirements

## Performance

- Server Components by default; client JavaScript only where interactivity is
  required.
- Avoid global scroll listeners and per-card pointer/scroll observers.
- Animate transform and opacity only; avoid continuous filter repaints.
- Decorative gradient fields are limited and static outside the hero.
- Fonts load through `next/font` with explicit weights, fallback metrics, and
  `font-synthesis: none` to prevent synthetic-weight rendering and layout
  shifts.
- Test at 375px, 768px, and 1440px with no horizontal overflow.

## Accessibility

- Target WCAG 2.1 AA.
- Every form control has a label and visible focus state.
- Every page has one `h1` and complete metadata.
- Reduced motion renders the finished/static state.
- Decorative effects are hidden from assistive technology.

## SEO

- Every route defines title, description, and canonical metadata.
- Favicon, Apple touch icon, Open Graph, and Twitter images come from the
  supplied AST logo and Next file conventions.
- Sitemap and robots routes remain available.

## Security

- No secrets are committed.
- Hosted form endpoints are configured through deployment environment values.
- Do not add an API, database, or new runtime service without an ADR and a
  concrete product requirement.
