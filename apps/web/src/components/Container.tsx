import type { ReactNode } from 'react';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

/** Centered content wrapper — max width + horizontal padding for all sections. */
export function Container({ className = '', children }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>;
}
