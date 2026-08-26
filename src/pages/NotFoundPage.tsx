import { Link } from 'react-router-dom';
import { Button } from '@ast/ui';
import { Container } from '../components/Container';
import { Aurora } from '../components/Aurora';
import { ArrowLink } from '../components/ArrowLink';
import { Reveal } from '../components/motion/Reveal';
import { RevealText } from '../components/motion/RevealText';
import { NAV_LINKS } from '../data/navigation';

export function NotFoundPage() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden">
      <Aurora variant="band" />
      <Container className="relative py-20 text-center">
        <Reveal direction="none">
          <p className="font-mono text-eyebrow font-semibold uppercase text-ast-accent">
            Error 404
          </p>
        </Reveal>

        <RevealText
          as="h1"
          immediate
          className="mx-auto mt-6 max-w-3xl text-display-lg font-semibold"
          parts={[{ text: 'This page' }, { text: 'does not exist', gradient: true }]}
        />

        <Reveal delay={0.25}>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ast-ink-muted">
            The link may be out of date, or the page may have moved. Here is the way back.
          </p>
        </Reveal>

        <Reveal delay={0.35} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/">Back to home</Link>
          </Button>
          <ArrowLink href="/contact">Report a broken link</ArrowLink>
        </Reveal>

        <Reveal delay={0.45} className="mt-16 border-t border-ast-line pt-8">
          <nav aria-label="Site sections">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {NAV_LINKS.filter((link) => link.href !== '/').map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-ast-ink-muted transition-colors hover:text-ast-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </Container>
    </section>
  );
}
