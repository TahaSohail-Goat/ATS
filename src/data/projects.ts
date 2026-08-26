/**
 * Illustrative project concepts. Replace these with approved AST case studies
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
  /** External live demo URL, shown as a link on the project detail page. */
  demoUrl?: string;
  /** Card/detail hero image. Falls back to the gradient placeholder when omitted. */
  image?: string;
  imageAlt?: string;
  /** Google Drive share link for a demo video. Replaces the hero image on the detail page when set. */
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: 'studify',
    title: 'Studify: AI Study Companion',
    category: 'AI & Machine Learning',
    status: 'published',
    year: '2026',
    summary:
      'A full-stack MERN app where students upload their notes and slides, then chat with them, get instant summaries, generate quizzes, and track progress, all grounded in their own material.',
    problem:
      'Students juggle notes, slides, and PDFs across formats with no fast way to review them, get straight answers, or test what has actually sunk in before an exam.',
    solution:
      'Studify centralizes uploaded course material and grounds every AI feature (chat, summaries, and quizzes) in a custom retrieval-augmented generation (RAG) pipeline, so answers cite the exact source notes instead of guessing.',
    features: [
      'AI chat that answers from your notes, with source citations under every reply',
      'One-click document summaries, exportable as PDF or CSV',
      'Auto-generated multiple-choice quizzes with instant scoring and explanations',
      'Study analytics and an AI study coach that reads your activity and streak',
      'Secure accounts with email OTP sign-up, JWT auth, and password reset',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Groq', 'Transformers.js'],
    highlights: [
      'Custom RAG pipeline with local neural embeddings, no external vector database or embeddings API',
      'Every AI answer, summary, and quiz is grounded in and cited from the user’s own uploaded material',
      'Shipped and deployed end-to-end across Vercel, Railway, and MongoDB Atlas',
    ],
    demoUrl: 'https://studify-six.vercel.app/login',
    image: '/projects/studify-cover.jpg',
    imageAlt: 'A cozy study desk at sunset, the visual used on the Studify sign-in screen',
    videoUrl: 'https://drive.google.com/file/d/1n-E1djSJhWoz2xooLSq8vdMTPi1vxmqy/view?usp=drive_link',
  },
  {
    slug: 'cat-connect',
    title: 'Cat Connect',
    category: 'Web Application',
    status: 'published',
    year: '2026',
    summary:
      'A cat welfare management platform for shelters: intake, medical records, adoption, fostering, lost & found, donations, and messaging, built as a Django REST API with a React single-page app.',
    problem:
      'Shelters and rescues track a cat\'s entire lifecycle (intake, medical care, fostering, adoption) across spreadsheets and paper logs, making it hard for shelter staff, vets, and volunteers to coordinate.',
    solution:
      'Cat Connect gives every role, from shelter admins to vets to volunteers, one role-based system covering the full lifecycle of a cat\'s care, backed by scheduled background jobs for reminders and matching.',
    features: [
      'Cat registry with intake and discharge tracking',
      'Medical records and vet appointment scheduling',
      'Adoption and fostering workflows',
      'Lost and found matching engine',
      'Donation campaigns and volunteer coordination',
      'Role-based accounts (admin, shelter admin, vet, volunteer) with JWT auth and email verification',
    ],
    tech: ['Python', 'Django', 'PostgreSQL', 'Redis', 'React', 'Tailwind CSS'],
    highlights: [
      '18 Django apps covering the full shelter workflow: medical, wellness, adoption, foster, rescue, and more',
      'Scheduled background jobs via Celery for reminders and the lost & found matching engine',
      'Full OpenAPI/Swagger documentation generated from the API',
    ],
    image: '/projects/cat-connect-cover.svg',
    imageAlt: 'A paw print mark on a dark gradient, styled after the Cat Connect app icon',
    videoUrl: 'https://drive.google.com/file/d/1DOXkn57jIr1e7NH8YxkYOpVUYGSf8xFq/view?usp=drive_link',
  },
  {
    // Placeholder entry: full write-up, demo link, and video are pending.
    slug: 'aarhti-management-system',
    title: 'Aarhti Management System',
    category: 'Desktop Application',
    status: 'published',
    year: '2026',
    summary: 'A desktop management system for aarhtis. Full details, demo, and a walkthrough video are coming soon.',
    problem: 'Full write-up coming soon.',
    solution: 'Full write-up coming soon.',
    features: ['Full feature list coming soon.'],
    tech: [],
    highlights: ['More on this soon.'],
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
