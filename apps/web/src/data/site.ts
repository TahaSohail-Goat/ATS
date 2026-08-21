/**
 * Placeholder site content — values, process steps, and technology
 * stack used on the Home page (TBD, see docs/website-design-brief.md).
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
      'Working software in short, reviewable iterations — you see progress every sprint.',
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

export const techStack: string[] = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'PostgreSQL',
  'AWS',
  'Docker',
  'Kubernetes',
  'CI/CD',
  'LLMs & AI',
  'Data Pipelines',
];
