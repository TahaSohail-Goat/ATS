import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export type BadgeTone = 'neutral' | 'brand' | 'accent' | 'success' | 'error';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Render a leading status dot. */
  dot?: boolean;
}

const tones: Record<BadgeTone, string> = {
  neutral: 'border-ast-line bg-ast-ink/[0.04] text-ast-ink-muted',
  brand: 'border-ast-brand/25 bg-ast-brand/10 text-ast-brand',
  accent: 'border-ast-accent/25 bg-ast-accent/10 text-ast-accent',
  success: 'border-ast-success/25 bg-ast-success/10 text-ast-success',
  error: 'border-ast-error/25 bg-ast-error/10 text-ast-error',
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
