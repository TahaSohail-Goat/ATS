import { ContactForm } from '../features/contact-form/ContactForm';
import { Container } from '../components/Container';
import { Reveal } from '../components/motion/Reveal';
import { useSeo } from '../lib/seo';

export function ContactPage() {
  useSeo({
    title: 'Contact',
    description:
      'Start a project with AST. Tell us what you are building and we reply with honest technical feedback and a clear first step.',
  });

  return (
    <>
      {/* Photo hero: bounded to the heading only, not the form below, so
          bg-cover never has to stretch across the form's full (and on
          mobile, very tall) height. */}
      <section
        className="relative isolate overflow-hidden bg-cover bg-center py-16 sm:py-24"
        style={{ backgroundImage: "url('/stock/cta-office.jpg')" }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgb(var(--ast-canvas) / var(--ast-scrim-strong)) 45%, rgb(var(--ast-canvas) / var(--ast-scrim-soft)) 100%)',
          }}
        />
        <Container className="relative max-w-3xl">
          <Reveal delay={0.1}>
            <h1 className="ast-photo-text text-display-md font-semibold text-ast-ink">
              Start a <span className="text-ast-accent">Project</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="ast-photo-text mt-4 text-lg leading-relaxed text-ast-ink-muted">
              Have a project in mind, need technical advisory, or want to explore working together? Send us a message; we reply to every conversation.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ast-canvas py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal
            delay={0.2}
            className="-mt-24 rounded-3xl border border-ast-line bg-ast-surface p-8 shadow-ast-lifted sm:-mt-32 sm:p-10"
          >
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
