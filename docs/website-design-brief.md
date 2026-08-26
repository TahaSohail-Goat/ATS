# AST Website — Design Brief

Canonical product/vision brief for the AST website v1 (AI Software &
Technology Solutions). Companion docs: `frontend/design-system.md`,
`frontend/accessibility.md`, `frontend/responsive-design.md`,
`frontend/animation-guidelines.md`, and tokens in `packages/ui/src/tokens`.

## Role

Act as the product owner and senior UX strategist for AST.

AST — AI Software & Technology Solutions — is a technology startup and
software company. The current website is a public-facing company/portfolio
website. The repo itself currently identifies `apps/web` as the public AST
website.

## Primary Goals

The website must:

- Present AST professionally.
- Explain what AST builds.
- Showcase projects.
- Present services.
- Communicate AST's identity and values.
- Build credibility through projects, testimonials and technology
  expertise.
- Generate client inquiries.
- Present career opportunities.

## Website Scope

Build only these initial routes:

- `/`
- `/services`
- `/projects`
- `/projects/[slug]`
- `/about`
- `/careers`
- `/contact`

Do NOT introduce:

- authentication
- registration
- dashboards
- client portals
- user accounts
- admin panels
- pricing system
- unnecessary SaaS functionality

These may become future products but are outside the current website.

## Homepage

The homepage should contain:

- Navigation
- Strong hero
- AST introduction
- Services overview
- Selected projects
- Why AST
- How we work
- Testimonials
- Technology/expertise
- Strong final CTA
- Footer

## Navigation

Desktop:

- Logo
- Home
- Services
- Projects
- About
- Careers
- Contact
- Start a Project

Mobile:

- Logo
- Menu
- Start a Project

## Brand Direction

AST should feel:

- premium
- modern
- technical
- confident
- trustworthy
- minimal
- polished
- innovative

Avoid:

- generic AI landing pages
- excessive glassmorphism
- excessive gradients
- neon cyberpunk aesthetics
- template-like layouts
- excessive rounded cards
- unnecessary decorative elements

## Existing Brand Colors

| Token          | Hex       |
| -------------- | --------- |
| Deep Navy      | `#0B1220` |
| Secondary Navy | `#172554` |
| Electric Blue  | `#2563EB` |
| Cyan           | `#06B6D4` |
| Off White      | `#F8FAFC` |
| Near Black     | `#020617` |
| Primary Text   | `#0F172A` |
| Muted          | `#64748B` |
| Success        | `#22C55E` |
| Error          | `#EF4444` |

Use the existing repository design tokens whenever possible.

## UX Principle

The website should tell a story:

1. Who AST is
2. What AST does
3. What AST has built
4. Why someone should trust AST
5. How AST works
6. How to start a project

The site should prioritize visual storytelling rather than having many
pages.

## Engineering

Reuse the existing components and architecture.

- Do not add dependencies unless necessary.
- Do not change backend behavior unless explicitly required.
- Do not invent functionality.
- Do not create a second design system.

The final result should feel like a premium software studio portfolio.
