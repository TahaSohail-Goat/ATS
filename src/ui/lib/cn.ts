/**
 * Minimal class-name joiner. Filters falsy values so conditional classes
 * read cleanly at call sites.
 *
 * Deliberately dependency-free: `clsx`/`tailwind-merge` would add runtime
 * weight for behaviour we do not need (we never rely on later utilities
 * overriding earlier ones, call sites pass `className` last, which already
 * wins in Tailwind's generated order for distinct utilities).
 */
export type ClassValue = string | number | null | undefined | false;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
