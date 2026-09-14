import { Hero } from '../features/home/Hero';
import { ServicesOverview } from '../features/home/ServicesOverview';
import { SelectedProjects } from '../features/home/SelectedProjects';
import { Process } from '../features/home/Process';
import { Testimonials } from '../features/home/Testimonials';
import { TechStack } from '../features/home/TechStack';
import { FinalCta } from '../features/home/FinalCta';
import { useSeo } from '../lib/seo';

export function HomePage() {
  useSeo({
    description:
      'AST designs and ships custom software, AI features, and cloud infrastructure for companies that outgrow templates.',
  });

  return (
    <>
      <Hero />
      <ServicesOverview />
      <SelectedProjects />
      <Process />
      <Testimonials />
      <TechStack />
      <FinalCta />
    </>
  );
}
