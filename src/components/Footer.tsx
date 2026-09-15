import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Instagram } from 'lucide-react';
import { Button } from '@ast/ui';
import { Container } from './Container';
import { Logo } from './Logo';
import { NAV_LINKS } from '../data/navigation';

const CONTACT_EMAIL = 'ast.devz@gmail.com';

const SOCIAL_LINKS = [
  { href: 'https://instagram.com/ast.dev', label: 'Instagram', icon: Instagram },
];

const CAPABILITIES = [
  { href: '/services', label: 'Custom software' },
  { href: '/services', label: 'AI & machine learning' },
  { href: '/services', label: 'Cloud & infrastructure' },
  { href: '/services', label: 'Game development' },
];

/** Site footer: always-dark navy, matching the header/hero/CTA bookends. */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-ast-primary">
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo size={44} />
            <p className="mt-5 text-sm leading-relaxed text-ast-on-dark-muted">
              AI Software &amp; Technology Solutions. We design, build, and modernize the systems
              companies run on.
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="mt-7 !border-white/20 !bg-white/5 !text-ast-on-dark !backdrop-blur-none hover:!border-ast-brand/50 hover:!bg-white/10"
            >
              <Link to="/contact">
                <Mail className="h-4 w-4" aria-hidden />
                Start a conversation
              </Link>
            </Button>
          </div>

          <nav aria-label="Footer" className="lg:col-span-1">
            <h2 className="text-xs font-semibold tracking-wide text-ast-on-dark-muted">Site</h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-ast-on-dark-muted transition-colors hover:text-ast-accent-on-dark"
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
            <h2 className="text-xs font-semibold tracking-wide text-ast-on-dark-muted">
              Capabilities
            </h2>
            <ul className="mt-5 space-y-3">
              {CAPABILITIES.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-ast-on-dark-muted transition-colors hover:text-ast-accent-on-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-wide text-ast-on-dark-muted">
              Engagement
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ast-on-dark-muted">
              Tell us what you are building. We reply with honest technical feedback and a clear
              first step.
            </p>
            <p className="mt-4 text-sm font-medium text-ast-on-dark">We reply to every message.</p>
          </div>
        </div>

        {/* Oversized wordmark, anchors the page without competing for attention. */}
        <div
          aria-hidden
          className="pointer-events-none mt-16 select-none overflow-hidden border-t border-white/10 pt-8"
        >
          <span className="block text-[18vw] font-bold leading-[0.8] tracking-display text-ast-on-dark opacity-[0.06] sm:text-[16vw]">
            AST
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-xs text-ast-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} AST, AI Software &amp; Technology Solutions. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1.5 text-ast-on-dark-muted transition-colors hover:text-ast-accent-on-dark"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden />
              {CONTACT_EMAIL}
            </a>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ast-on-dark-muted transition-colors hover:text-ast-accent-on-dark"
              >
                <social.icon className="h-3.5 w-3.5" aria-hidden />
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
