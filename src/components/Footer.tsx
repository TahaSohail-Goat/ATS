import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Instagram, Linkedin, X } from 'lucide-react';
import { Button } from '@ast/ui';
import { Container } from './Container';
import { Logo } from './Logo';
import { NAV_LINKS } from '../data/navigation';

const CONTACT_EMAIL = 'ast.devz@gmail.com';

/** Real profile URLs land here as they're provided; undefined renders as an inert placeholder icon. */
const SOCIAL_LINKS = [
  { href: 'https://instagram.com/ast.dev', label: 'Instagram', icon: Instagram },
  { href: 'https://x.com/ASTshcc', label: 'X', icon: X },
  { href: 'https://www.linkedin.com/company/ai-software-technology-solutions', label: 'LinkedIn', icon: Linkedin },
];

/** Site footer, theme-reactive like the rest of the site. */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-ast-ink/10 bg-ast-surface">
      <Container className="relative py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo size={44} />
            <p className="mt-5 text-sm leading-relaxed text-ast-ink-muted">
              AI Software &amp; Technology Solutions. We design, build, and modernize the systems
              companies run on.
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="mt-7 !border-ast-ink/20 !bg-ast-ink/5 !text-ast-ink !backdrop-blur-none hover:!border-ast-brand/50 hover:!bg-ast-ink/10"
            >
              <Link to="/contact">
                <Mail className="h-4 w-4" aria-hidden />
                Start a conversation
              </Link>
            </Button>

            {/* The actual contact channels, so these stay prominent rather than buried in fine print. */}
            <div className="mt-7 flex items-center gap-2.5">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email AST"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ast-ink/15 text-ast-ink transition-colors duration-200 hocus:border-ast-brand/50 hocus:text-ast-accent"
              >
                <Mail className="h-[18px] w-[18px]" aria-hidden />
              </a>
              {SOCIAL_LINKS.map((social) =>
                social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`AST on ${social.label}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ast-ink/15 text-ast-ink transition-colors duration-200 hocus:border-ast-brand/50 hocus:text-ast-accent"
                  >
                    <social.icon className="h-[18px] w-[18px]" aria-hidden />
                  </a>
                ) : (
                  <span
                    key={social.label}
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ast-ink/15 text-ast-ink-muted/30"
                  >
                    <social.icon className="h-[18px] w-[18px]" />
                  </span>
                ),
              )}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-1">
            <h2 className="text-xs font-semibold tracking-wide text-ast-ink-muted">Site</h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-ast-ink transition-colors hover:text-ast-accent"
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
            <h2 className="text-xs font-semibold tracking-wide text-ast-ink-muted">
              Engagement
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ast-ink-muted">
              Tell us what you are building. We reply with honest technical feedback and a clear
              first step.
            </p>
            <p className="mt-4 text-sm font-medium text-ast-ink">We reply to every message.</p>
          </div>
        </div>

        <div className="mt-10 border-t border-ast-ink/10 pt-6 text-xs text-ast-ink-muted">
          <p>
            © {new Date().getFullYear()} AST, AI Software &amp; Technology Solutions. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
