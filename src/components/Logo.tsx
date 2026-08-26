const logoMark = '/brand/ast-logo.jpeg';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
  /** Rendered mark size in px. Kept square, the source asset is 1:1. */
  size?: number;
  priority?: boolean;
}

/**
 * AST mark + wordmark.
 */
export function Logo({
  className = '',
  showWordmark = true,
  showTagline = false,
  size = 40,
}: LogoProps) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span
        className="relative flex shrink-0 items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span
          aria-hidden
          className="absolute inset-1 rounded-xl bg-ast-brand/40 opacity-60 blur-lg transition-opacity duration-500 group-hover:opacity-100"
        />
        <img
          src={logoMark}
          alt="AST Logo"
          width={size}
          height={size}
          className="relative rounded-xl border border-ast-line object-cover transition-transform duration-500 ease-ast-out motion-safe:group-hover:scale-[1.05]"
        />
      </span>

      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tighter2">AST</span>
          {showTagline && (
            <span className="mt-1 hidden text-[0.7rem] font-medium text-ast-ink-muted sm:block">
              AI Software &amp; Technology Solutions
            </span>
          )}
        </span>
      )}
    </span>
  );
}
