interface SectionTransitionProps {
  /** Which way the page is heading: into a dark photo band, or back out to the themed canvas. */
  direction: 'to-dark' | 'to-light';
}

/**
 * Thin gradient bridge between an always-dark band (header/hero/process/CTA)
 * and a themed light/dark content section, so the seam blends instead of
 * cutting hard from navy to canvas.
 */
export function SectionTransition({ direction }: SectionTransitionProps) {
  return (
    <div
      aria-hidden
      className={`h-14 sm:h-20 ${
        direction === 'to-light'
          ? 'bg-gradient-to-b from-ast-primary to-ast-canvas'
          : 'bg-gradient-to-b from-ast-canvas to-ast-primary'
      }`}
    />
  );
}
