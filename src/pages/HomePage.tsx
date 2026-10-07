import { Hero } from '../features/home/Hero';
import { ServicesOverview } from '../features/home/ServicesOverview';
import { SelectedProjects } from '../features/home/SelectedProjects';
import { Process } from '../features/home/Process';
import { Testimonials } from '../features/home/Testimonials';
import { FinalCta } from '../features/home/FinalCta';
import { useSeo } from '../lib/seo';

export function HomePage() {
  useSeo();

  return (
    <>
      <Hero />
      <ServicesOverview />
      <SelectedProjects />
      <Process />
      <Testimonials />
      <FinalCta />
    </>
  );
}
