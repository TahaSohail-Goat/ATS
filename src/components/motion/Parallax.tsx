import type { ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** @deprecated Retained for composition compatibility; motion is static. */
  distance?: number;
}

/**
 * Static media wrapper. Project-card parallax used one scroll observer and
 * spring per card; keeping the wrapper API lets card composition stay simple
 * while avoiding scroll-linked work in every project tile.
 */
export function Parallax({ children, className }: ParallaxProps) {
  return <div className={className}>{children}</div>;
}
