import type { ElementType, ReactNode } from 'react';

interface ContainerProps {
  className?: string;
  children: ReactNode;
  /** `shell` (default) for page content, `wide` for full-bleed feature rows. */
  width?: 'shell' | 'wide' | 'narrow';
  as?: ElementType;
}

const widths = {
  narrow: 'max-w-3xl',
  shell: 'max-w-shell',
  wide: 'max-w-[110rem]',
} as const;

/** Centered content wrapper, max width + horizontal gutters for all sections. */
export function Container({
  className = '',
  children,
  width = 'shell',
  as = 'div',
}: ContainerProps) {
  const Component = as as ElementType;

  return (
    <Component className={`mx-auto w-full ${widths[width]} px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Component>
  );
}
