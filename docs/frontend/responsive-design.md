# Responsive Design Guidelines

- Mobile-first: design and build for 320px width up, then enhance for
  larger breakpoints (Tailwind defaults: `sm`, `md`, `lg`, `xl`, `2xl`).
- Layouts use CSS Grid/Flexbox via Tailwind utilities, not fixed pixel
  widths for content containers.
- Touch targets are at least 44x44px on mobile.
- Test at minimum: 375px (mobile), 768px (tablet), 1440px (desktop).
