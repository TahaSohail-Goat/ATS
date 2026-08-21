import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
} from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Compose with a child (e.g. a router Link) instead of rendering a <button>. */
  asChild?: boolean;
}

const base = 'rounded-md font-medium transition-colors disabled:opacity-60';
const variants: Record<string, string> = {
  primary: 'bg-ats-brand text-white hover:opacity-90',
  secondary: 'bg-ats-secondary text-white hover:opacity-90',
  ghost: 'bg-transparent text-ats-brand hover:bg-ats-brand/10',
};
const sizes: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-base',
};

/**
 * Brand-level Button primitive. Generic and app-agnostic — see
 * packages/ui/AGENTS.md before adding app-specific variants here.
 * Pass `asChild` + a single child (e.g. `<Link>`) to render as a link.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', asChild = false, className = '', children, ...props },
  ref,
) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<{ className?: string }>, {
      className: `${(children.props as { className?: string }).className ?? ''} ${classes}`,
    });
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});
