import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { services } from '../../data/services';
import { ServiceCard } from '../../components/ServiceCard';

/** Home services overview — 4 services, linked to /services. */
export function ServicesOverview() {
  return (
    <Section
      eyebrow="Services"
      title="What we build for you"
      description="Full-cycle engineering — from product thinking to deployed, supported software."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={index * 0.05}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ats-brand hover:underline"
        >
          Explore all services <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Reveal>
    </Section>
  );
}
