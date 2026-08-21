import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** Inline text link with an arrow that extends on hover. */
export function ArrowLink({ href, children, className = '' }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-semibold text-ats-brand transition-colors hover:text-ats-brand-strong ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-ats-brand/25 bg-ats-brand/10"
      >
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-ats-out group-hover:translate-x-5" />
        <ArrowRight className="absolute h-3.5 w-3.5 -translate-x-5 transition-transform duration-300 ease-ats-out group-hover:translate-x-0" />
      </span>
    </Link>
  );
}
