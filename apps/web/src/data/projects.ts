/**
 * Placeholder project data — replace with ATS's real work (TBD, see
 * docs/website-design-brief.md). Shape is the contract for the Home
 * selected-projects section, the /projects grid, and /projects/[slug].
 */
export interface Project {
  slug: string;
  title: string;
  category: string;
  client: string;
  year: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  results: string[];
}

export const projects: Project[] = [
  {
    slug: 'logistics-ai-platform',
    title: 'Logistics Intelligence Platform',
    category: 'AI & Machine Learning',
    client: 'Placeholder client — TBD',
    year: '2025',
    summary:
      'AI demand forecasting for a logistics operator — planning time cut by 60%, forecast accuracy at 92%.',
    problem:
      'Route and capacity planning ran on spreadsheets and tribal knowledge — slow, error-prone, and impossible to scale across growing regional teams.',
    solution:
      'We shipped a forecasting platform pairing demand models with an interactive planning UI and live data pipelines — planners now work from one system.',
    features: [
      'Demand forecasting models',
      'Interactive capacity planning',
      'Live integration with fleet data',
    ],
    tech: ['TypeScript', 'Next.js', 'Python', 'PostgreSQL', 'AWS'],
    results: [
      'Planning time reduced by roughly 60%',
      'Forecast accuracy improved to 92%',
      'Rolled out across 3 regional teams',
    ],
  },
  {
    slug: 'healthcare-patient-app',
    title: 'Patient Engagement Application',
    category: 'Web Application',
    client: 'Placeholder client — TBD',
    year: '2024',
    summary:
      'Self-service booking portal for a clinic group — no-shows halved and booking workload down 40%.',
    problem:
      'Patients booked by phone; missed appointments and double bookings were common, and front-desk time was consumed by scheduling.',
    solution:
      'We shipped a patient portal with self-service booking, automated reminders, and secure staff-patient messaging — integrated with the clinic’s existing schedule.',
    features: ['Self-service booking', 'Automated reminders', 'Secure messaging'],
    tech: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
    results: [
      'No-show rate cut in half',
      'Booking workload reduced by 40%',
      'Adopted by all 5 clinic locations',
    ],
  },
  {
    slug: 'fintech-reporting-dashboard',
    title: 'Real-Time Reporting Dashboard',
    category: 'Data & Infrastructure',
    client: 'Placeholder client — TBD',
    year: '2024',
    summary:
      'Streaming analytics dashboard replacing overnight batch reports — decisions now run on data that is seconds old.',
    problem:
      'Decision-makers only saw yesterday’s numbers, and building a new report meant engineering time every single time.',
    solution:
      'We built a self-serve reporting dashboard over a streaming data pipeline, with reusable templates so teams create reports themselves.',
    features: ['Streaming data pipeline', 'Self-serve report builder', 'Role-based access'],
    tech: ['TypeScript', 'React', 'Node.js', 'ClickHouse', 'Kubernetes'],
    results: [
      'Reports delivered in seconds instead of overnight',
      '60+ reports built without engineering help',
      'Saved 2 engineering days per week',
    ],
  },
];
