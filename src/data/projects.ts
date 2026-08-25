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
  {
    slug: 'ecommerce-storefront-platform',
    title: 'Unified Commerce Storefront',
    category: 'E-Commerce',
    status: 'illustrative',
    year: '2025',
    summary:
      'An illustrative concept for a storefront and checkout experience built to handle demand spikes without losing conversions.',
    problem:
      'Fast-growing retailers can lose sales when checkout flows and inventory systems are not built to handle traffic spikes.',
    solution:
      'The concept pairs a fast storefront with a resilient checkout flow and real-time inventory sync across channels.',
    features: ['Fast, responsive storefront', 'Resilient checkout flow', 'Real-time inventory sync'],
    tech: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    highlights: [
      'A storefront built to stay fast under load',
      'Checkout designed to reduce drop-off',
      'Inventory kept in sync across every sales channel',
    ],
  },
  {
    slug: 'cloud-observability-platform',
    title: 'Cloud Observability Platform',
    category: 'Cloud & Infrastructure',
    status: 'illustrative',
    year: '2025',
    summary:
      'An illustrative concept for a monitoring workspace that gives engineering teams one view across services and environments.',
    problem:
      'Teams running many services can lose hours tracing incidents when logs, metrics, and alerts live in separate tools.',
    solution:
      'The concept centralizes logs, metrics, and alerts into one dashboard with automated incident timelines.',
    features: ['Unified logs and metrics', 'Automated incident timelines', 'Configurable alerting rules'],
    tech: ['TypeScript', 'React', 'Go', 'Kubernetes', 'Grafana'],
    highlights: [
      'Faster incident response with one shared view',
      'Alerting tuned to reduce noise',
      'An architecture built to scale across environments',
    ],
  },
  {
    slug: 'hypercasual-mobile-game',
    title: 'Hyper-Casual Mobile Game',
    category: 'Game Development',
    status: 'illustrative',
    year: '2025',
    summary:
      'An illustrative concept for a lightweight, replayable mobile game built for fast sessions and quick iteration.',
    problem:
      'Hyper-casual games can lose players quickly when core loops are not tuned and tested before wide release.',
    solution:
      'The concept combines a tight core gameplay loop with lightweight analytics to guide balancing decisions.',
    features: [
      'Fast-loading core gameplay loop',
      'Built-in analytics for tuning',
      'Cross-platform builds for Android and iOS',
    ],
    tech: ['Unity', 'C#', 'Android', 'iOS'],
    highlights: [
      'A core loop designed for short, replayable sessions',
      'Analytics built in from day one',
      'A build pipeline ready for rapid iteration',
    ],
  },
];
