/**
 * Placeholder service data — replace with ATS's real offerings (TBD,
 * see docs/website-design-brief.md). Shape is the contract for both the
 * Home services overview and the /services page.
 */
export interface Service {
  slug: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    slug: 'custom-software',
    title: 'Custom Software Development',
    description:
      'Web and mobile products designed, built, and shipped end-to-end — from first commit to deployed, monitored production systems.',
    deliverables: ['Product engineering', 'Web & mobile apps', 'Legacy modernization'],
  },
  {
    slug: 'ai-solutions',
    title: 'AI & Machine Learning',
    description:
      'AI that earns its keep: forecasting, classification, document extraction, and automation — trained on your data, deployed in your workflow.',
    deliverables: ['AI feature design', 'ML model deployment', 'Data pipelines'],
  },
  {
    slug: 'cloud-infrastructure',
    title: 'Cloud & Infrastructure',
    description:
      'AWS, containers, and CI/CD configured so your systems stay fast, available, and predictable to operate.',
    deliverables: ['Cloud architecture', 'DevOps & CI/CD', 'Observability'],
  },
  {
    slug: 'technology-consulting',
    title: 'Technology Consulting',
    description:
      'Architecture reviews, technical audits, and engineering guidance from people who have shipped at scale.',
    deliverables: ['Architecture reviews', 'Technical audits', 'Team acceleration'],
  },
];
