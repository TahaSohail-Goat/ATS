import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Button } from '@ats/ui';
import { Container } from './Container';
import { Logo } from './Logo';
import { NAV_LINKS } from '../data/navigation';

const CAPABILITIES = [
  { href: '/services', label: 'Custom software' },
  { href: '/services', label: 'AI & machine learning' },
  { href: '/services', label: 'Cloud & infrastructure' },
  { href: '/services', label: 'Game development' },
];

/** Site footer */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-ats-line bg-ats-surface/30">
      <div aria-hidden className="ats-dots absolute inset-0 opacity-50" />
      <div aria-hidden className="ats-hairline absolute inset-x-0 top-0 h-px" />

      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo size={44} />
            <p className="mt-5 text-sm leading-relaxed text-ats-ink-muted">
              AI Software &amp; Technology Solutions. We design, build, and modernize the systems
              companies run on.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-7">
              <Link to="/contact">
                <Mail className="h-4 w-4" aria-hidden />
                Start a conversation
              </Link>
            </Button>
          </div>

          <nav aria-label="Footer" className="lg:col-span-1">
            <h2 className="text-eyebrow font-semibold uppercase text-ats-ink-muted">Site</h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-ats-ink-muted transition-colors hover:text-ats-brand"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-eyebrow font-semibold uppercase text-ats-ink-muted">
              Capabilities
            </h2>
            <ul className="mt-5 space-y-3">
              {CAPABILITIES.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-ats-ink-muted transition-colors hover:text-ats-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-eyebrow font-semibold uppercase text-ats-ink-muted">Engagement</h2>
            <p className="mt-5 text-sm leading-relaxed text-ats-ink-muted">
              Tell us what you are building. We reply with honest technical feedback and a clear
              first step.
            </p>
            <p className="mt-4 text-sm font-medium text-ats-ink">We reply to every message.</p>
          </div>
        </div>

        {/* Oversized wordmark — anchors the page without competing for attention. */}
        <div
          aria-hidden
          className="pointer-events-none mt-16 select-none overflow-hidden border-t border-ats-line pt-8"
        >
          <span className="block bg-ats-ink-gradient bg-clip-text text-[18vw] font-bold leading-[0.8] tracking-display text-transparent opacity-[0.07] sm:text-[16vw]">
            ATS
          </span>
        </div>

        <div className="mt-8 text-xs text-ats-ink-muted">
          <p>
            © {new Date().getFullYear()} ATS — AI Software &amp; Technology Solutions. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
