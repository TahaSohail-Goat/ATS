import type { Metadata } from 'next';
import { Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { Container } from '../../components/Container';
import { Aurora } from '../../components/Aurora';
import { SectionHeading } from '../../components/SectionHeading';
import { Reveal } from '../../components/motion/Reveal';
import { Stagger } from '../../components/motion/Stagger';
import { ContactForm } from '../../features/contact-form/ContactForm';
import { processSteps } from '../../data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with ATS about your project.',
  alternates: { canonical: '/contact' },
};

const ASSURANCES = [
  {
    icon: MessageSquare,
    title: 'A real engineer replies',
    text: 'Your message reaches the people who would build the thing, not a sales queue.',
  },
  {
    icon: Clock,
    title: 'We reply to every message',
    text: 'Including the ones where the honest answer is that we are not the right fit.',
  },
  {
    icon: ShieldCheck,
    title: 'Your details stay yours',
    text: 'We use what you send only to respond to this enquiry.',
  },
];

export default function ContactPage() {
  const formEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

  return (
    <section className="relative isolate overflow-hidden">
      <Aurora variant="quiet" />

      <Container className="relative py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Get in touch"
              title="Contact"
              titleAccent="us"
              headingLevel={1}
              size="lg"
              description="Tell us what you're building. We'll reply with honest technical feedback and a clear first step."
            />

            <Stagger className="mt-12 space-y-7" delay={0.1}>
              {ASSURANCES.map((item) => (
                <Reveal key={item.title} asChild as="div">
                  <div className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ats-line bg-ats-surface-raised text-ats-accent"
                    >
                      <item.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h2 className="text-sm font-semibold tracking-tighter2">{item.title}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-ats-ink-muted">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </Stagger>

            <Reveal delay={0.2} className="mt-12 border-t border-ats-line pt-7">
              <h2 className="text-eyebrow font-semibold uppercase text-ats-ink-muted">
                What happens next
              </h2>
              <ol className="mt-4 space-y-2 text-sm text-ats-ink-muted">
                {processSteps.slice(0, 3).map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span aria-hidden className="font-mono text-xs text-ats-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {step.title}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <ContactForm endpoint={formEndpoint} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
