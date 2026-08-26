import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Render as a different element (e.g. `article`, `li`, `figure`). */
  as?: ElementType;
  /** Adds hover elevation + border highlight. Respects reduced motion. */
  interactive?: boolean;
  /** Remove default padding when the card owns full-bleed content. */
  flush?: boolean;
}

/**
 * Neutral surface container.
 */
export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { as, interactive = false, flush = false, className = '', children, ...props },
  ref,
) {
  const Component = (as ?? 'div') as ElementType;

  return (
    <Component
      ref={ref}
      className={cn(
        'border-ast-line bg-ast-surface relative rounded-2xl border',
        !flush && 'p-6 sm:p-7',
        interactive &&
          cn(
            'transition-[transform,border-color,box-shadow] duration-300 ease-out',
            'hover:border-ast-brand/35 motion-safe:hover:-translate-y-1',
            'hover:shadow-[0_24px_60px_-32px_rgb(var(--ast-brand)/0.45)]',
          ),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
