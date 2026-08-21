import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export type BadgeTone = 'neutral' | 'brand' | 'accent' | 'success' | 'error';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Render a leading status dot. */
  dot?: boolean;
}

const tones: Record<BadgeTone, string> = {
  neutral: 'border-ats-line bg-ats-ink/[0.04] text-ats-ink-muted',
  brand: 'border-ats-brand/25 bg-ats-brand/10 text-ats-brand',
  accent: 'border-ats-accent/25 bg-ats-accent/10 text-ats-accent',
  success: 'border-ats-success/25 bg-ats-success/10 text-ats-success',
  error: 'border-ats-error/25 bg-ats-error/10 text-ats-error',
};

/** Small pill for status, categories, and metadata. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', dot = false, className = '', children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1',
        'text-xs leading-none font-medium tracking-[-0.01em]',
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
});
