import type { Metadata } from 'next';
import { Hero } from '../features/home/Hero';
import { Intro } from '../features/home/Intro';
import { ServicesOverview } from '../features/home/ServicesOverview';
import { SelectedProjects } from '../features/home/SelectedProjects';
import { WhyAts } from '../features/home/WhyAts';
import { Process } from '../features/home/Process';
import { Testimonials } from '../features/home/Testimonials';
import { TechStack } from '../features/home/TechStack';
import { FinalCta } from '../features/home/FinalCta';

export const metadata: Metadata = {
  title: 'ATS — AI Software and Technology Solutions',
  description:
    'ATS is a software studio building custom software, AI features, and cloud infrastructure for ambitious teams.',
  alternates: { canonical: '/' },
};

/**
 * Homepage — server component. Sections follow the story arc in
 * docs/website-design-brief.md: who → what → built → trust → how → CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesOverview />
      <SelectedProjects />
      <WhyAts />
      <Process />
      <Testimonials />
      <TechStack />
      <FinalCta />
    </>
  );
}
