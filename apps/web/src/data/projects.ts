/**
 * Illustrative project concepts. Replace these with approved ATS case studies
 * before presenting them as client work. This shape powers the homepage,
 * projects index, and dynamic project detail route.
 */
export interface Project {
  slug: string;
  title: string;
  category: string;
  status: 'illustrative' | 'published';
  year: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    slug: 'logistics-ai-platform',
    title: 'Logistics Intelligence Platform',
    category: 'AI & Machine Learning',
    status: 'illustrative',
    year: '2025',
    summary:
      'An illustrative concept for a planning workspace that brings demand signals and capacity decisions into one place.',
    problem:
      'Growing operations can struggle when route and capacity planning lives across spreadsheets and disconnected tools.',
    solution:
      'The concept pairs forecasting models with an interactive planning interface and live operational data.',
    features: [
      'Demand forecasting models',
      'Interactive capacity planning',
      'Live integration with fleet data',
    ],
    tech: ['TypeScript', 'Next.js', 'Python', 'PostgreSQL', 'AWS'],
    highlights: [
      'A focused workflow for forecasting and capacity planning',
      'Live operational data alongside planning decisions',
      'A flexible foundation for teams operating across regions',
    ],
  },
  {
    slug: 'healthcare-patient-app',
    title: 'Patient Engagement Application',
    category: 'Web Application',
    status: 'illustrative',
    year: '2024',
    summary: 'An illustrative concept for a patient-facing booking and communications experience.',
    problem:
      'Care teams can lose valuable time when scheduling and patient communication rely on phone-based processes.',
    solution:
      'The concept brings self-service booking, appointment reminders, and secure messaging into a single patient experience.',
    features: ['Self-service booking', 'Automated reminders', 'Secure messaging'],
    tech: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
    highlights: [
      'A clearer self-service journey for patients',
      'Scheduling and reminders designed as one workflow',
      'A modular base that can integrate with existing systems',
    ],
  },
  {
    slug: 'fintech-reporting-dashboard',
    title: 'Real-Time Reporting Dashboard',
    category: 'Data & Infrastructure',
    status: 'illustrative',
    year: '2024',
    summary:
      'An illustrative concept for a reporting workspace built around timely, self-service data.',
    problem:
      'Teams can be slowed when reporting is delayed and every new question needs engineering support.',
    solution:
      'The concept combines a streaming data pipeline with reusable reporting templates for self-service analysis.',
    features: ['Streaming data pipeline', 'Self-serve report builder', 'Role-based access'],
    tech: ['TypeScript', 'React', 'Node.js', 'ClickHouse', 'Kubernetes'],
    highlights: [
      'Timely information designed for operational decisions',
      'Reusable templates for common reporting needs',
      'An extensible architecture for future data sources',
    ],
  },
];
