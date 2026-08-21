# Website Design Brief

Design decisions for the public ATS website. This is a **design** brief: it
covers layout, hierarchy, and motion. It deliberately does not set marketing
positioning — that is a business decision tracked in
`docs/product/vision.md`, and copy in `apps/web/src/data/*` is placeholder
until it is made.

Companion docs: `design-system.md` (tokens and components),
`animation-guidelines.md` (motion), `accessibility.md`, `responsive-design.md`.

## Intent

The site has to be credible to two readers at once: a non-technical buyer
deciding whether ATS looks like a serious company, and an engineer deciding
whether ATS can actually build. That points to a dark, precise,
engineering-flavoured interface rather than a bright generic agency template —
depth from gradient mesh and hairlines, structure from grids and monospace
labels, motion that is present but never in the way.

Anti-goals: stock photography, decorative illustration, parallax for its own
sake, testimonial claims we cannot back, invented metrics.

## Visual language

- **Dark-first.** Dark is the default scheme; light is an explicit user
  override via `ThemeToggle`. Both are first-class, not one bolted onto the
  other — every colour is a semantic token that flips.
- **Depth, not decoration.** Backgrounds are built from a masked engineering
  grid, drifting gradient-mesh fields, and a grain layer that kills banding.
  All of it is `aria-hidden` and none of it carries information.
- **Hairlines over boxes.** Sections separate with 1px gradient dividers and
  tinted bands rather than heavy borders or drop shadows.
- **Type does the work.** A fluid `clamp()` display scale, tight negative
  tracking, and a monospace face reserved for numerals, indices, and technical
  labels.
- **One accent gesture.** The brand → cyan → violet gradient appears as
  gradient text on the trailing words of a heading, in icon tiles on hover,
  and in the timeline rail. Nowhere else, so it keeps its meaning.

## Page architecture

Every page is composed from the same parts, so a new page is a content
decision rather than a layout one:

| Part             | Role                                            |
| ---------------- | ----------------------------------------------- |
| `PageHero`       | Interior page opener: eyebrow + the single `h1` |
| `Section`        | Band with eyebrow + `h2` + description + slot   |
| `SectionHeading` | The heading block alone, for custom layouts     |
| `CtaSection`     | Closing conversion band — ends every page       |
| `Container`      | Width and gutters (`narrow` / `shell` / `wide`) |

Rhythm comes from `Section`'s `space` prop and alternating `tone`
(`canvas` / `raised`), never hand-rolled padding.

## Homepage story arc

`apps/web/src/app/page.tsx` composes the arc **who → what → built → trust →
how → CTA**:

1. **Hero** — brand promise, dual CTA, and three figures counted from site
   data (practice areas, delivery stages, stack breadth). The figures are
   verifiable from the content itself; no performance or client claims.
   Closes with a capability marquee that bridges into the page.
2. **Intro** — the three modes of work: Build, Modernize, Accelerate with AI.
3. **Services** — the four practice areas as spotlight cards.
4. **Selected work** — three project concepts, labelled as concepts.
5. **Why ATS** — the four principles in an asymmetric 2·1·1·2 bento so they
   read as a composition rather than a row of identical boxes.
6. **Process** — pinned heading beside a timeline whose rail fills with scroll
   position, so process reads as progress.
7. **Testimonials** — one featured quote plus two supporting, each carrying a
   visible "Demo content" badge until a client approves a real quote.
8. **Technology** — the stack grouped by layer.
9. **Final CTA** — contrast band closing the conversion path.

## Content honesty rules

These constrain design as much as copy:

- Placeholder testimonials keep a visible "Demo content" badge
  (`data/testimonials.ts`).
- Project concepts are labelled "Illustrative concept", not "case study"
  (`data/projects.ts` → `status`).
- Any figure shown on the site must be derivable from repository data or
  otherwise verifiable. No invented metrics, client counts, or timelines.

## Accessibility commitments

- One `h1` per page; heading levels never skip.
- The whole project card is a single link with one accessible name, so cards
  are one tab stop rather than three.
- Decorative layers are `aria-hidden`; the duplicated half of a marquee is
  hidden from assistive technology so content is not announced twice.
- Animated headings keep a normal space-separated accessible name.
- Every animated component has a static reduced-motion equivalent — see
  `animation-guidelines.md`.
- Verified by `apps/web/e2e/appearance.spec.ts`: no horizontal overflow at
  375/768/1440, theme persistence, mobile navigation keyboard behaviour, and
  no console errors on any route.
