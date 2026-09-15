interface AuroraProps {
  /** `hero` is brightest; `band` and `quiet` use a lighter grid. */
  variant?: 'hero' | 'band' | 'quiet';
  className?: string;
}

/**
 * Faint engineering-grid backdrop. Previously carried two large blurred
 * gradient blobs; those read as generic AI-template decoration with no real
 * content behind them, so the texture now does the work on its own.
 */
export function Aurora({ variant = 'hero', className = '' }: AuroraProps) {
  const gridOpacity = {
    hero: 'opacity-70',
    band: 'opacity-45',
    quiet: 'opacity-35',
  }[variant];

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className={`ast-grid absolute inset-0 ${gridOpacity}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-ast-canvas/20 via-ast-canvas/45 to-ast-canvas" />
    </div>
  );
}
