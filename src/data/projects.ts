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
    slug: 'sabaq-ai',
    title: 'Sabaq AI: Exam Prep Tutor',
    category: 'AI & Machine Learning',
    status: 'published',
    year: '2026',
    summary:
      'A study companion for Pakistani board students (FBISE, classes 9-12) that answers strictly from their own syllabus, cites the exact chapter and page, and refuses honestly instead of guessing, with quizzes, mastery tracking, a revision planner, and a 3D subject explorer.',
    problem:
      'Board exams are marked against one specific textbook, but general AI chatbots answer from a global corpus: often right in general, wrong for the exam, and sometimes invented outright. Students cannot tell an exam-correct answer from a plausible one, and get no signal about what they are actually weak on.',
    solution:
      'Sabaq AI grounds every answer in the real syllabus through a retrieval pipeline over the textbook and past-paper corpus. A confidence gate blocks the model call entirely when retrieval similarity is too low, and every answer carries a page citation the student can check in their own book.',
    features: [
      'Grounded Q&A (Doubts) with page citations from the real textbook and past-paper corpus',
      'A confidence gate that says a topic is not covered rather than answering anyway',
      'Conversational Chat tutoring, with Urdu voice input transcribed via Whisper on Groq',
      'Chapter-scoped MCQ, short, and long-answer quizzes, graded server-side with explanations tied to source text',
      'Live per-chapter mastery (Progress) and a deterministic day-by-day revision Plan built around the exam date',
      'Explore: a 3D subject picker (three.js/react-three-fiber) to fly through subjects and open a book',
      'English, Urdu, and Roman Urdu support',
      'Email sign-up with OTP verification, plus Google sign-in',
    ],
    tech: [
      'Next.js',
      'TypeScript',
      'Supabase',
      'pgvector',
      'Gemini',
      'Jina Embeddings',
      'Groq',
      'Tailwind CSS',
      'three.js',
    ],
    highlights: [
      'When the guardrail refuses, the model is never called, so nothing shown as fact is unconstrained output',
      'Citations are validated server-side against the retrieved passages: the model picks which source to cite, never what it says',
      'A weekly automated crawl ingests FBISE past papers and textbooks, with checksum dedup and OCR for scanned pages',
      'Built for the Bano Qabil AI Hackathon 2026 (Education category)',
    ],
    demoUrl: 'https://sabaq-ai-three.vercel.app',
    image: '/projects/sabaq-ai-cover.jpg',
    imageAlt: "Sabaq AI's Explore screen: a 3D orbit of subject textbooks circling a globe",
  },
  {
    slug: 'cat-connect',
    title: 'Cat Connect',
    category: 'Web Application',
    status: 'published',
    year: '2026',
    summary:
      'A role-aware shelter-management console for four distinct roles, Super Admin, Shelter Admin, Employee, and Customer, covering shelter onboarding, animal intake, adoption, fostering, donations, and day-to-day operations in one interface.',
    problem:
      'Shelter software usually shows every user the same screen with features hidden behind permission checks, so a volunteer wades through admin tools they will never touch, and nobody overseeing several shelters at once gets a view built for that job.',
    solution:
      "Cat Connect builds its navigation and dashboards around each of its four roles from the ground up: a Super Admin gets a platform-wide console for onboarding shelters and admins, a Shelter Admin runs one shelter's operations, and Employees and Customers each get an interface scoped to what their role actually does.",
    features: [
      'Animal intake, registry, and medical history, with adoption and foster placements tracked end to end',
      'Rescue reports and a public lost & found board',
      'Donations, a finance ledger, and shelter-level reporting',
      'Inventory, analytics dashboards, and audit logs for daily operations',
      'Threaded messaging, notifications, and an interactive shelter map',
      'A Super Admin console for onboarding shelters, granting admin access, and tracking platform-wide usage',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'TanStack Table', 'Recharts', 'Leaflet'],
    highlights: [
      'Four roles, one codebase: navigation and dashboards are built around Super Admin, Shelter Admin, Employee, and Customer from the ground up, not one view with features toggled on and off',
      'The adoption marketplace and lost & found board are usable without an account',
      'A fully explorable demo: runs on mock data with no backend or real authentication required, so every screen is one click away',
    ],
    demoUrl: 'https://shelter-os-seven.vercel.app',
    image: '/projects/cat-connect-cover.jpg',
    imageAlt: 'The Cat Connect adoption marketplace: a hero banner over cards for adoptable cats and dogs',
  },
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
    slug: 'pawtrack',
    title: 'PawTrack OS: Cat Welfare Platform',
    category: 'Web Application',
    status: 'published',
    year: '2026',
    summary:
      'A cat welfare management platform for shelters: intake, medical records, adoption, fostering, lost & found, donations, and messaging, built as a Django REST API with a React single-page app.',
    problem:
      'Shelters and rescues track a cat\'s entire lifecycle (intake, medical care, fostering, adoption) across spreadsheets and paper logs, making it hard for shelter staff, vets, and volunteers to coordinate.',
    solution:
      'PawTrack OS gives every role, from shelter admins to vets to volunteers, one role-based system covering the full lifecycle of a cat\'s care, backed by scheduled background jobs for reminders and matching.',
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
    image: '/projects/pawtrack-cover.jpg',
    imageAlt: 'The PawTrack OS cat registry: real cat profiles with owned, in-shelter, and lost statuses',
    videoUrl: 'https://drive.google.com/file/d/1DOXkn57jIr1e7NH8YxkYOpVUYGSf8xFq/view?usp=drive_link',
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
