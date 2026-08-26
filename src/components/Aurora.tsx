interface AuroraProps {
  /** `hero` is brightest; `band` and `quiet` use static, lighter fields. */
  variant?: 'hero' | 'band' | 'quiet';
  className?: string;
}

/**
 * Decorative gradient-mesh backdrop. It is intentionally CSS-only and
 * bounded to a small number of compositor layers. Only the hero drifts; the
 * repeated interior-page auroras stay static to avoid perpetual GPU work.
 */
export function Aurora({ variant = 'hero', className = '' }: AuroraProps) {
  const intensity = {
    hero: { brand: 'opacity-40', accent: 'opacity-25', grid: 'opacity-90' },
    band: { brand: 'opacity-25', accent: 'opacity-15', grid: 'opacity-60' },
    quiet: { brand: 'opacity-15', accent: 'opacity-[0.08]', grid: 'opacity-45' },
  }[variant];
  const animated = variant === 'hero';

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className={`ast-grid absolute inset-0 ${intensity.grid}`} />
      <div
        className={`absolute left-1/2 top-[-24%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-ast-brand/40 blur-[96px] ${intensity.brand} ${animated ? 'motion-safe:animate-ast-drift' : ''}`}
      />
      <div
        className={`absolute -left-[8%] top-[30%] h-[26rem] w-[26rem] rounded-full bg-ast-accent/35 blur-[88px] ${intensity.accent} ${animated ? 'motion-safe:animate-ast-drift-slow' : ''}`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ast-canvas/20 via-ast-canvas/45 to-ast-canvas" />
    </div>
  );
}
