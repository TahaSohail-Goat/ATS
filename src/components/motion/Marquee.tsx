import type { CSSProperties, ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. Longer = calmer. */
  speed?: number;
  reverse?: boolean;
  /** Pause the track while hovered or focused inside. */
  pauseOnHover?: boolean;
  className?: string;
  'aria-label'?: string;
}

/**
 * Infinite horizontal track. Deliberately CSS-only (no JS, no client
 * boundary): the content is duplicated and the track translates -50%, so the
 * loop is seamless and the whole thing renders on the server.
 *
 * Reduced motion: the global `prefers-reduced-motion` rule in globals.css
 * collapses the animation, which leaves the first (visible) copy in place —
 * the content stays fully readable and static.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  className = '',
  'aria-label': ariaLabel,
}: MarqueeProps) {
  return (
    <div
      className={`ast-fade-x group relative flex overflow-hidden ${className}`}
      aria-label={ariaLabel}
      role={ariaLabel ? 'group' : undefined}
    >
      <div
        className={`ast-gpu flex w-max shrink-0 items-center ${
          reverse ? 'animate-ast-marquee-reverse' : 'animate-ast-marquee'
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{ '--ast-marquee-duration': `${speed}s` } as CSSProperties}
      >
        {children}
        {/* Duplicate copy completes the seamless loop; hidden from AT so the
            content is not announced twice. */}
        <div className="flex w-max shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
