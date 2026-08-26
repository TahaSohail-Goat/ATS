/**
 * Placeholder site content, values, process steps, and technology
 * stack used on the Home page (TBD, see docs/frontend/website-design-brief.md).
 */
export interface Value {
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    title: 'Engineering Excellence',
    description:
      'Clean architecture, automated tests, and code review on everything. We hand over systems, not debt.',
  },
  {
    title: 'Client Partnership',
    description:
      'We work beside our clients, not in a silo. You see progress, decisions, and honest trade-offs at every step.',
  },
  {
    title: 'Transparent Process',
    description:
      'Clear scopes, clear timelines, clear pricing. No surprises, no scope creep hidden in fine print.',
  },
  {
    title: 'Long-Term Thinking',
    description:
      'We build for maintainability and growth, so your software keeps compounding value instead of accumulating debt.',
  },
];

export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Discover',
    description: 'We map goals, users, and constraints before a single line of code is written.',
  },
  {
    title: 'Design',
    description: 'Architecture and UX decisions locked into a plan you sign off before we build.',
  },
  {
    title: 'Build',
    description:
      'Working software in short, reviewable iterations, so you see progress every sprint.',
  },
  {
    title: 'Launch',
    description: 'We ship with monitoring, documentation, and a rollback plan already in place.',
  },
  {
    title: 'Support',
    description: 'Post-launch care: improvements, fixes, and a partner who stays close.',
  },
];

export interface TechGroup {
  label: string;
  items: string[];
}

export const techGroups: TechGroup[] = [
  {
    label: 'Product & Frontend',
    items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  },
  {
    label: 'Backend & Data',
    items: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    label: 'Cloud & Delivery',
    items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Vercel', 'GitHub Actions'],
  },
  {
    label: 'AI & Machine Learning',
    items: ['LLMs & AI', 'RAG', 'Forecasting', 'Classification', 'Groq', 'Transformers.js'],
  },
];

/** Flattened `techGroups`, for compact contexts (e.g. the "N+ core technologies" stat). */
export const techStack: string[] = techGroups.flatMap((group) => group.items);

/** Short capability keywords for the hero marquee. */
export const capabilities: string[] = [
  'Product engineering',
  'AI systems',
  'Cloud platforms',
  'Legacy modernization',
  'Data pipelines',
  'Architecture reviews',
  'DevOps & CI/CD',
  'Technical audits',
];
