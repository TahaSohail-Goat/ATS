import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

/**
 * Brand-level Button primitive. Generic and app-agnostic — see
 * packages/ui/AGENTS.md before adding app-specific variants here.
 */
export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'rounded-md px-4 py-2 font-medium transition-colors disabled:opacity-60';
  const variants: Record<string, string> = {
    primary: 'bg-ats-brand text-white hover:opacity-90',
    secondary: 'bg-ats-secondary text-white hover:opacity-90',
    ghost: 'bg-transparent text-ats-brand hover:bg-ats-brand/10',
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
