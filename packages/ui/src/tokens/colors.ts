/**
 * ATS brand color tokens — single source of truth.
 * See docs/frontend/design-system.md. Never hardcode these hex values
 * anywhere else in the codebase; import from here (or the corresponding
 * Tailwind classes wired up in apps/web/tailwind.config.ts).
 */
export const colors = {
  primary: '#0B1220', // Deep Navy
  secondary: '#172554', // Navy Blue
  brand: '#2563EB', // Electric Blue
  accent: '#06B6D4', // Cyan
  backgroundLight: '#F8FAFC', // Off White
  backgroundDark: '#020617', // Near Black
  text: '#0F172A', // Slate
  textMuted: '#64748B', // Gray
  success: '#22C55E', // Green
  error: '#EF4444', // Red
} as const;

export type ColorToken = keyof typeof colors;
