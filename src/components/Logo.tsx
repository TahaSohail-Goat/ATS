import Image from 'next/image';

const logoMark = '/brand/ats-logo.jpeg';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
  /** Rendered mark size in px. Kept square — the source asset is 1:1. */
  size?: number;
  /** Load eagerly for above-the-fold placements (the header). */
  priority?: boolean;
}

/**
 * ATS mark + wordmark.
 *
 * The source asset is a square logo with the brand's near-black background
 * baked in (no alpha), so it is presented as a rounded tile with a hairline
 * rather than composited onto the page surface. That reads as intentional in
 * both schemes: on the dark canvas the tile background is all but identical to
 * the page, and in light mode it reads as an app icon.
 *
 * The mark carries no lettering, so the "ATS" wordmark beside it is type, not
 * a duplicate of the artwork.
 */
export function Logo({
  className = '',
  showWordmark = true,
  showTagline = false,
  size = 40,
  priority = false,
}: LogoProps) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span
        className="relative flex shrink-0 items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span
          aria-hidden
          className="absolute inset-1 rounded-xl bg-ats-brand/40 opacity-60 blur-lg transition-opacity duration-500 group-hover:opacity-100"
        />
        <Image
          src={logoMark}
          alt=""
          width={size}
          height={size}
          priority={priority}
          sizes={`${size}px`}
          className="relative rounded-xl border border-ats-line object-cover transition-transform duration-500 ease-ats-out motion-safe:group-hover:scale-[1.05]"
        />
      </span>

      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tighter2">ATS</span>
          {showTagline && (
            <span className="mt-1 hidden text-[0.7rem] font-medium text-ats-ink-muted sm:block">
              AI Software &amp; Technology Solutions
            </span>
          )}
        </span>
      )}
    </span>
  );
}
