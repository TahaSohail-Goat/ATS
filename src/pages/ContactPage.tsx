import { ContactForm } from '../features/contact-form/ContactForm';
import { Container } from '../components/Container';
import { Aurora } from '../components/Aurora';
import { Reveal } from '../components/motion/Reveal';

export function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-24">
      <Aurora variant="hero" />
      <Container className="relative max-w-3xl">
        <Reveal direction="none">
          <p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-ats-line bg-ats-surface/60 px-4 py-1.5 text-eyebrow font-semibold uppercase text-ats-accent backdrop-blur-sm">
            Get in touch
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-display-md font-semibold text-ats-ink">
            Start a <span className="bg-ats-brand-gradient bg-clip-text text-transparent">Project</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 text-lg leading-relaxed text-ats-ink-muted">
            Have a project in mind, need technical advisory, or want to explore working together? Send us a message; we reply to every conversation.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 rounded-3xl border border-ats-line bg-ats-surface/70 p-8 sm:p-10 shadow-ats-lifted">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
