'use client';

import { useCallback, type ElementType, type PointerEvent, type ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Card surface with a pointer-tracked spotlight. The pointer position is
 * written to CSS custom properties and rendered entirely by the compositor
 * (see `.ats-spotlight` in globals.css) — no React state, no re-renders on
 * mouse move.
 *
 * The effect is decorative: it is hover-only, additive to an already
 * sufficient contrast baseline, and absent for touch and keyboard users
 * (who still get the `:focus-within` variant).
 */
export function SpotlightCard({ children, as = 'div', className = '' }: SpotlightCardProps) {
  const Component = as as ElementType;

  const handlePointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--ats-x', `${event.clientX - rect.left}px`);
    target.style.setProperty('--ats-y', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Component
      onPointerMove={handlePointerMove}
      className={`ats-spotlight relative isolate overflow-hidden ${className}`}
    >
      {children}
    </Component>
  );
}
