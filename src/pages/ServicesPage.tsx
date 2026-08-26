import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@ast/ui';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { ServiceCard } from '../components/ServiceCard';
import { CtaSection } from '../components/CtaSection';
import { Reveal } from '../components/motion/Reveal';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { services } from '../data/services';
import { processSteps } from '../data/site';

const PREVIEW_COUNT = 4;

export function ServicesPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? services : services.slice(0, PREVIEW_COUNT);
  const hasMore = services.length > PREVIEW_COUNT;

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What AST can"
        titleAccent="build for you"
        description={`${services.length} services, one standard: production-grade engineering you can rely on.`}
      />

      <Section space="loose">
        {/* Mount-based reveal (not scroll-triggered): this grid grows when
            "Show all services" is clicked, and a scroll-only whileInView
            trigger never fires again for cards added after the initial
            viewport entry. */}
        <div className="grid gap-5 lg:grid-cols-2">
          {visibleServices.map((service, index) => (
            <Reveal
              key={service.slug}
              immediate
              delay={Math.min((index % PREVIEW_COUNT) * 0.06, 0.24)}
              className="h-full"
            >
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

        {hasMore && (
          <Reveal className="mt-10 flex justify-center">
            <Button variant="outline" size="lg" onClick={() => setShowAll((prev) => !prev)}>
              {showAll ? 'Show fewer services' : 'Show all services'}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </Button>
          </Reveal>
        )}
      </Section>

      <Section
        eyebrow="Engagement"
        title="How a project"
        titleAccent="actually runs"
        description="The same five stages apply whether we are building a product from scratch or auditing an existing one."
        tone="raised"
      >
        <div className="max-w-3xl">
          <ProcessTimeline steps={processSteps} />
        </div>
      </Section>

      <CtaSection
        title="Not sure which"
        titleAccent="service you need?"
        description="Describe the problem, and we'll tell you honestly what it takes to solve it, even if that means a smaller scope."
      />
    </>
  );
}
