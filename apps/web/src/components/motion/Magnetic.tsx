import type { ReactNode } from 'react';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** @deprecated Retained for composition compatibility; motion is static. */
  strength?: number;
}

/**
 * Stable server-rendered wrapper for CTA composition. Cursor-following
 * magnetic motion was removed because it added pointer/spring work without
 * improving the primary conversion path; Button still provides transform-only
 * hover/active feedback.
 */
export function Magnetic({ children, className }: MagneticProps) {
  return <div className={className}>{children}</div>;
}
