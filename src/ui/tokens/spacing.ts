/**
 * Spacing scale reference, mirrors Tailwind's default 4px-based scale.
 * Documented here so non-Tailwind consumers (if any emerge) have a
 * single source. See docs/frontend/design-system.md.
 */
export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
} as const;
