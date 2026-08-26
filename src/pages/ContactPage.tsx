import { ContactForm } from '../features/contact-form/ContactForm';
import { Container } from '../components/Container';
import { Aurora } from '../components/Aurora';
import { Reveal } from '../components/motion/Reveal';
import { useSeo } from '../lib/seo';

export function ContactPage() {
  useSeo({
    title: 'Contact',
    description:
      'Start a project with AST. Tell us what you are building and we reply with honest technical feedback and a clear first step.',
  });

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-24">
      <Aurora variant="hero" />
      <Container className="relative max-w-3xl">
        <Reveal direction="none">
          <p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-ast-line bg-ast-surface/60 px-4 py-1.5 text-eyebrow font-semibold uppercase text-ast-accent backdrop-blur-sm">
            Get in touch
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-display-md font-semibold text-ast-ink">
            Start a <span className="bg-ast-brand-gradient bg-clip-text text-transparent">Project</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 text-lg leading-relaxed text-ast-ink-muted">
            Have a project in mind, need technical advisory, or want to explore working together? Send us a message; we reply to every conversation.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 rounded-3xl border border-ast-line bg-ast-surface/70 p-8 sm:p-10 shadow-ast-lifted">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
