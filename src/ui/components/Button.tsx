import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
} from 'react';
import { cn } from '../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Compose with a child (e.g. a router Link) instead of rendering a <button>. */
  asChild?: boolean;
  /** Stretch to the width of the container. */
  fullWidth?: boolean;
}

const base = cn(
  'group/button relative inline-flex items-center justify-center gap-2 rounded-full',
  'font-semibold leading-none tracking-[-0.01em] whitespace-nowrap',
  'transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ats-brand',
  'disabled:pointer-events-none disabled:opacity-55',
  'motion-safe:active:scale-[0.98]',
);

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-ats-brand text-white shadow-[0_1px_0_0_rgb(255_255_255/0.18)_inset,0_10px_30px_-12px_rgb(var(--ats-brand)/0.75)]',
    'hover:bg-ats-brand-strong motion-safe:hover:-translate-y-0.5',
  ),
  secondary: cn(
    'bg-ats-secondary text-white shadow-[0_10px_30px_-14px_rgb(var(--ats-brand)/0.55)]',
    'hover:bg-ats-secondary/90 motion-safe:hover:-translate-y-0.5',
  ),
  outline: cn(
    'border border-ats-line bg-ats-surface/60 text-ats-ink backdrop-blur-sm',
    'hover:border-ats-brand/45 hover:bg-ats-surface motion-safe:hover:-translate-y-0.5',
  ),
  subtle: 'bg-ats-ink/[0.06] text-ats-ink hover:bg-ats-ink/[0.1]',
  ghost: 'bg-transparent text-ats-brand hover:bg-ats-brand/10',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
  xl: 'h-14 px-8 text-base',
};

/**
 * Brand-level Button primitive. Generic and app-agnostic — see
 * packages/ui/AGENTS.md before adding app-specific variants here.
 * Pass `asChild` + a single child (e.g. `<Link>`) to render as a link.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    asChild = false,
    fullWidth = false,
    className = '',
    children,
    ...props
  },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<{ className?: string }>, {
      className: cn((children.props as { className?: string }).className, classes),
    });
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});
