/**
 * AST brand color tokens, single source of truth.
 * See docs/frontend/design-system.md. Never hardcode these hex values
 * anywhere else in the codebase; import from here (or the corresponding
 * Tailwind classes wired up in tailwind.config.ts).
 *
 * Two groups live here:
 *  - `colors`: the brand palette (stable, referenced by name).
 *  - `theme`: semantic surface/ink/line roles per color scheme, consumed
 *                by tailwind.config.ts to emit CSS custom
 *                properties. Components should use the semantic Tailwind
 *                classes (`bg-ast-surface`, `text-ast-ink-muted`, …) so a
 *                single token change re-themes the whole site.
 */
export const colors = {
  primary: '#0B1220', // Deep Navy
  secondary: '#172554', // Navy Blue
  brand: '#2563EB', // Electric Blue
  brandBright: '#3B82F6', // Electric Blue, dark-surface / hover variant
  brandSoft: '#60A5FA', // Electric Blue, hover on dark surfaces
  brandDeep: '#1D4ED8', // Electric Blue, pressed / light-surface hover
  accent: '#06B6D4', // Cyan, decorative fills and dark-surface gradients
  accentBright: '#22D3EE', // Cyan, accent role on dark surfaces
  accentDeep: '#0E7490', // Cyan, accent role on light surfaces (AA text contrast)
  violet: '#7C3AED', // Violet, third gradient stop only
  backgroundLight: '#E2E8F0', // Slate-200, clearly dimmer than white cards so they visibly lift off the page
  backgroundDark: '#020617', // Near Black
  surfaceLight: '#FFFFFF', // Light-mode card surface
  surfaceLightRaised: '#CBD5E1', // Light-mode raised/inset surface (Slate-300)
  surfaceDark: '#080D1C', // Dark-mode card surface
  surfaceDarkRaised: '#0E1628', // Dark-mode raised/inset surface
  lineLight: '#94A3B8', // Light-mode hairline/border (Slate-400), visible against both canvas and white cards
  lineDark: '#1B2438', // Dark-mode hairline/border
  text: '#0F172A', // Slate
  textMuted: '#64748B', // Gray, decorative/icon use on light surfaces
  textMutedDeep: '#475569', // Gray, muted text on light surfaces (AA on raised)
  textOnDark: '#E6EDF8', // Body text on dark surfaces
  textOnDarkMuted: '#93A3BC', // Muted text on dark surfaces
  success: '#22C55E', // Green
  error: '#EF4444', // Red
} as const;

export type ColorToken = keyof typeof colors;

/**
 * Semantic roles per color scheme. `light` is the default scheme for the
 * marketing site; `dark` is the manual override.
 */
export const theme = {
  dark: {
    canvas: colors.backgroundDark,
    surface: colors.surfaceDark,
    surfaceRaised: colors.surfaceDarkRaised,
    line: colors.lineDark,
    ink: colors.textOnDark,
    inkMuted: colors.textOnDarkMuted,
    brand: colors.brandBright,
    brandStrong: colors.brandSoft,
    accent: colors.accentBright,
  },
  light: {
    canvas: colors.backgroundLight,
    surface: colors.surfaceLight,
    surfaceRaised: colors.surfaceLightRaised,
    line: colors.lineLight,
    ink: colors.text,
    // Slate-500 falls short of AA against light surfaces, so muted text uses
    // the deeper variant (reaches ~6.1:1 against the raised light surface).
    inkMuted: colors.textMutedDeep,
    brand: colors.brand,
    brandStrong: colors.brandDeep,
    // Plain cyan only reaches 2.3:1 on the off-white canvas, so the light
    // scheme uses the deep variant for anything text-sized.
    accent: colors.accentDeep,
  },
} as const;

/** Roles whose value does not change between schemes. */
export const themeConstant = {
  primary: colors.primary,
  secondary: colors.secondary,
  violet: colors.violet,
  success: colors.success,
  error: colors.error,
} as const;

export type ColorScheme = keyof typeof theme;
export type SemanticColorToken = keyof (typeof theme)['dark'];
