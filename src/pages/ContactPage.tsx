import { ContactForm } from '../features/contact-form/ContactForm';
import { Container } from '../components/Container';
import { Reveal } from '../components/motion/Reveal';
import { useSeo } from '../lib/seo';

const PHOTO = "url('/stock/cta-office.jpg')";
const SCRIM =
  'linear-gradient(100deg, rgb(var(--ast-canvas) / var(--ast-scrim-strong)) 45%, rgb(var(--ast-canvas) / var(--ast-scrim-soft)) 100%)';

export function ContactPage() {
  useSeo({
    title: 'Contact',
    description:
      'Start a project with AST. Tell us what you are building and we reply with honest technical feedback and a clear first step.',
  });

  // The photo behaves differently by screen size. From `lg` up it sits behind
  // the whole page, heading and form together, as the design intends. Below
  // `lg` the form is a very tall single column, and `bg-cover` would stretch
  // the photo to that whole height and zoom it far past its resolution, so
  // there it is bounded to the heading band and the form sits below it.
  return (
    <section className="relative isolate">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-cover bg-center lg:block"
        style={{ backgroundImage: PHOTO }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{ background: SCRIM }}
      />

      <div className="relative py-16 sm:py-24 lg:pb-0">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center lg:hidden"
          style={{ backgroundImage: PHOTO }}
        />
        <div aria-hidden className="absolute inset-0 lg:hidden" style={{ background: SCRIM }} />
        <Container className="relative max-w-3xl">
          <Reveal delay={0.1}>
            <h1 className="ast-photo-text text-display-md font-semibold text-ast-ink">
              Start a <span className="text-ast-accent">Project</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="ast-photo-text mt-4 text-lg leading-relaxed text-ast-ink dark:text-ast-ink-muted">
              Have a project in mind, need technical advisory, or want to explore working together? Send us a message; we reply to every conversation.
            </p>
          </Reveal>
        </Container>
      </div>

      {/* z-10 keeps the card above the photo band it overlaps on small screens;
          flow-root stops its negative top margin collapsing through this block. */}
      <div className="relative z-10 flow-root bg-ast-canvas pb-16 sm:pb-20 lg:bg-transparent lg:pb-24 lg:pt-10">
        <Container className="max-w-3xl">
          <Reveal
            delay={0.2}
            className="-mt-8 rounded-3xl border border-ast-line bg-ast-surface p-8 shadow-ast-lifted sm:-mt-12 sm:p-10 lg:mt-0"
          >
            <ContactForm />
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
