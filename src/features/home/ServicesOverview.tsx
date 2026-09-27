import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { Container } from '../../components/Container';
import { ArrowLink } from '../../components/ArrowLink';
import { SectionHeading } from '../../components/SectionHeading';
import { ServiceCard } from '../../components/ServiceCard';
import { services } from '../../data/services';

const cardClass = 'flex w-[80vw] max-w-[22rem] shrink-0 snap-start flex-col';

/**
 * Home "What we build for you": every service in one continuously moving row
 * instead of a tall grid. The motion is a CSS transform loop (see `.ast-marquee`
 * in globals.css), so it glides at a constant speed with no per-frame script.
 * It holds still on hover and while focus is inside, and a visible button
 * pauses and resumes it (WCAG 2.2.2). Under reduced motion there is no
 * animation and no button: the row is a plain swipe-able strip of one copy.
 */
export function ServicesOverview() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <section id="services" className="relative border-t border-ast-ink/10 bg-ast-surface py-16 sm:py-24">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="What we build"
            titleAccent="for you"
            description="Full-cycle engineering, from product thinking to deployed, supported software."
            className="max-w-2xl"
          />

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <ArrowLink href="/services">Explore all services</ArrowLink>
            <button
              type="button"
              onClick={() => setPaused((current) => !current)}
              aria-label={paused ? 'Play services animation' : 'Pause services animation'}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-ast-line px-5 text-sm font-semibold text-ast-ink transition-colors duration-200 hocus:border-ast-brand/50 hocus:text-ast-brand motion-reduce:hidden"
            >
              {paused ? (
                <Play className="h-4 w-4" aria-hidden />
              ) : (
                <Pause className="h-4 w-4" aria-hidden />
              )}
              {paused ? 'Play' : 'Pause'}
            </button>
          </div>
        </div>
      </Container>

      <div
        role="region"
        aria-label="Our services"
        data-paused={paused}
        className="ast-marquee mt-10 sm:mt-12"
        onFocus={(event) => {
          // A card that is only partly on screen would otherwise keep its
          // focus ring clipped. The row is already held still by :focus-within.
          if (reduceMotion) return;
          (event.target as HTMLElement)
            .closest('.ast-marquee-track > li')
            ?.scrollIntoView({ inline: 'center', block: 'nearest' });
        }}
        onBlur={(event) => {
          // Tabbing to an off-screen card scrolls the clipped row to reveal it.
          // Reset that offset once focus leaves, or the loop would resume
          // shifted. Not under reduced motion, where the row is scrolled by hand.
          if (!reduceMotion && !event.currentTarget.contains(event.relatedTarget)) {
            event.currentTarget.scrollLeft = 0;
          }
        }}
      >
        <ul className="ast-marquee-track">
          {services.map((service) => (
            <li key={service.slug} className={cardClass}>
              <ServiceCard service={service} />
            </li>
          ))}
          {/* Second copy, only there to make the loop seamless: hidden from
              assistive tech, out of the tab order, and gone under reduced
              motion, where the row does not loop. */}
          {services.map((service) => (
            <li
              key={`${service.slug}-copy`}
              aria-hidden
              inert
              className={`${cardClass} motion-reduce:hidden`}
            >
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
