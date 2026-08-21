import type { Metadata } from 'next';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { ServiceCard } from '../../components/ServiceCard';
import { CtaSection } from '../../components/CtaSection';
import { services } from '../../data/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Custom software development, AI & machine learning, cloud infrastructure, and technology consulting from ATS.',
};

export default function ServicesPage() {
  return (
    <>
      <Section
        eyebrow="Services"
        title="What ATS can build for you"
        description="Four practice areas, one standard: production-grade engineering you can rely on."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaSection
        title="Not sure which service you need?"
        description="Describe the problem — we'll tell you honestly what it takes to solve it, even if that means a smaller scope."
      />
    </>
  );
}
