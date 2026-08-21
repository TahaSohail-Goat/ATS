import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { ServiceCard } from '../components/ServiceCard';
import { CtaSection } from '../components/CtaSection';
import { Reveal } from '../components/motion/Reveal';
import { Stagger } from '../components/motion/Stagger';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { services } from '../data/services';
import { processSteps } from '../data/site';

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What ATS can"
        titleAccent="build for you"
        description="Four practice areas, one standard: production-grade engineering you can rely on."
      />

      <Section space="loose">
        <Stagger className="grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.slug} asChild as="div" className="h-full">
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </Stagger>
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
        description="Describe the problem — we'll tell you honestly what it takes to solve it, even if that means a smaller scope."
      />
    </>
  );
}
