import Link from 'next/link';
import { Button } from '@ats/ui';

const FOOTER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

/** Site footer — server component, no interactivity. */
export function Footer() {
  return (
    <footer className="border-t border-ats-text/10 bg-ats-primary text-ats-bg-light dark:border-ats-bg-light/10">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-ats-brand to-ats-accent text-sm font-bold text-white"
              >
                A
              </span>
              <span className="text-lg font-bold tracking-tight text-ats-bg-light">ATS</span>
            </div>
            <p className="mt-3 text-sm text-ats-bg-light/70">
              AI Software &amp; Technology Solutions. We build software that moves businesses
              forward.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3" aria-label="Footer">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ats-bg-light/70 transition-colors hover:text-ats-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div>
            <Button asChild variant="secondary">
              <Link href="/contact">Start a Project</Link>
            </Button>
          </div>
        </div>
        <p className="mt-10 border-t border-ats-bg-light/10 pt-6 text-xs text-ats-bg-light/50">
          © {new Date().getFullYear()} ATS — AI Software &amp; Technology Solutions. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
