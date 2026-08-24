import { Section } from '../../components/Section';
import { ServiceCard } from '../../components/ServiceCard';
import { ArrowLink } from '../../components/ArrowLink';
import { Reveal } from '../../components/motion/Reveal';
import { Stagger } from '../../components/motion/Stagger';
import { services } from '../../data/services';

/** Home services overview — 4 services, linked to /services. */
export function ServicesOverview() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="What we build"
      titleAccent="for you"
      description="Full-cycle engineering — from product thinking to deployed, supported software."
      action={<ArrowLink href="/services">Explore all services</ArrowLink>}
    >
      <Stagger className="grid gap-5 lg:grid-cols-2">
        {services.slice(0, 4).map((service, index) => (
          <Reveal key={service.slug} asChild as="div" className="h-full">
            <ServiceCard service={service} index={index} />
          </Reveal>
        ))}
      </Stagger>
    </Section>
  );
}
