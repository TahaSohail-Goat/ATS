interface AuroraProps {
  /** `hero` is full-bleed and brightest; `band` suits mid-page CTA strips. */
  variant?: 'hero' | 'band' | 'quiet';
  className?: string;
}

/**
 * Decorative gradient-mesh backdrop. Pure CSS (no client boundary): two
 * blurred colour fields drift on long, offset loops, over an engineering grid
 * and a grain layer that prevents banding on wide gradients.
 *
 * Purely presentational — `aria-hidden`, and the drift stops under
 * prefers-reduced-motion via the global rule in globals.css.
 */
export function Aurora({ variant = 'hero', className = '' }: AuroraProps) {
  const intensity = {
    hero: { brand: 'opacity-[0.55]', accent: 'opacity-[0.4]', grid: 'opacity-100' },
    band: { brand: 'opacity-40', accent: 'opacity-25', grid: 'opacity-70' },
    quiet: { brand: 'opacity-[0.18]', accent: 'opacity-[0.12]', grid: 'opacity-50' },
  }[variant];

  return (
    <div aria-hidden className={`ats-grain pointer-events-none absolute inset-0 ${className}`}>
      <div className={`ats-grid absolute inset-0 ${intensity.grid}`} />
      <div
        className={`absolute left-1/2 top-[-30%] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-ats-brand/40 blur-[130px] motion-safe:animate-ats-drift ${intensity.brand}`}
      />
      <div
        className={`absolute -left-[12%] top-[28%] h-[34rem] w-[34rem] rounded-full bg-ats-accent/35 blur-[120px] motion-safe:animate-ats-drift-slow ${intensity.accent}`}
      />
      <div
        className={`absolute -right-[14%] top-[10%] h-[30rem] w-[30rem] rounded-full bg-ats-violet/30 blur-[130px] motion-safe:animate-ats-drift-slow ${intensity.accent}`}
      />
      {/* Vignette so type keeps contrast over the brightest part of the mesh. */}
      <div className="absolute inset-0 bg-gradient-to-b from-ats-canvas/20 via-ats-canvas/45 to-ats-canvas" />
    </div>
  );
}
