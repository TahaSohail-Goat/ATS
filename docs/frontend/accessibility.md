# Accessibility Guidelines

Target: WCAG 2.1 AA across the public site.

- **Keyboard navigation:** every interactive element is reachable and
  operable via keyboard alone, in a logical tab order.
- **Focus states:** visible focus ring on all interactive elements (do not
  remove `:focus` outlines without an equally visible replacement).
- **Semantic HTML:** use native elements (`button`, `nav`, `header`,
  `main`, `label`) before reaching for ARIA.
- **ARIA:** only where semantic HTML is insufficient; never as a
  substitute for correct markup.
- **Color contrast:** minimum 4.5:1 for body text, 3:1 for large text/UI
  components, checked against the token pairs in `design-system.md`.
- **Reduced motion:** respect `prefers-reduced-motion`; animations degrade
  to instant/opacity-only transitions when set.
- **Screen readers:** meaningful `alt` text on images, accessible names on
  icon-only buttons, form inputs always paired with a `label`.
