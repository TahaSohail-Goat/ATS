import type { ElementType, ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Lightweight card surface. The previous pointer-tracked implementation
 * measured every card and wrote CSS variables on every pointer event; that
 * multiplied work across the home-page grid. The static radial hover treatment
 * keeps the visual language without a client boundary or pointer handler.
 */
export function SpotlightCard({ children, as = 'div', className = '' }: SpotlightCardProps) {
  const Component = as as ElementType;

  return (
    <Component className={`ats-spotlight relative isolate overflow-hidden ${className}`}>
      {children}
    </Component>
  );
}
