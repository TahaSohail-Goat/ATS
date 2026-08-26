import { Hero } from '../features/home/Hero';
import { Intro } from '../features/home/Intro';
import { ServicesOverview } from '../features/home/ServicesOverview';
import { SelectedProjects } from '../features/home/SelectedProjects';
import { WhyAst } from '../features/home/WhyAst';
import { Process } from '../features/home/Process';
import { Testimonials } from '../features/home/Testimonials';
import { TechStack } from '../features/home/TechStack';
import { FinalCta } from '../features/home/FinalCta';

export function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesOverview />
      <SelectedProjects />
      <WhyAst />
      <Process />
      <Testimonials />
      <TechStack />
      <FinalCta />
    </>
  );
}
