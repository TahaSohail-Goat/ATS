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
    slug: 'shelter-os',
    title: 'Shelter OS',
    category: 'Web Application',
    status: 'published',
    year: '2026',
    summary:
      'A role-aware shelter-management console for four distinct roles, Super Admin, Shelter Admin, Employee, and Customer, covering shelter onboarding, animal intake, adoption, fostering, donations, and day-to-day operations in one interface.',
    problem:
      'Shelter software usually shows every user the same screen with features hidden behind permission checks, so a volunteer wades through admin tools they will never touch, and nobody overseeing several shelters at once gets a view built for that job.',
    solution:
      "Shelter OS builds its navigation and dashboards around each of its four roles from the ground up: a Super Admin gets a platform-wide console for onboarding shelters and admins, a Shelter Admin runs one shelter's operations, and Employees and Customers each get an interface scoped to what their role actually does.",
    features: [
      'Animal intake, registry, and medical history, with adoption and foster placements tracked end to end',
      'Rescue reports and a public lost & found board',
      'Donations, a finance ledger, and shelter-level reporting',
      'Inventory, analytics dashboards, and audit logs for daily operations',
      'Threaded messaging, notifications, and an interactive shelter map',
      'A Super Admin console for onboarding shelters, granting admin access, and tracking platform-wide usage',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Radix UI', 'GSAP', 'TanStack Table', 'Recharts', 'Leaflet'],
    highlights: [
      'Four roles, one codebase: navigation and dashboards are built around Super Admin, Shelter Admin, Employee, and Customer from the ground up, not one view with features toggled on and off',
      'The adoption marketplace and lost & found board are usable without an account',
      'A fully explorable demo: runs on mock data with no backend or real authentication required, so every screen is one click away',
    ],
    demoUrl: 'https://shelter-os-seven.vercel.app',
    image: '/projects/shelter-os-cover.jpg',
    imageAlt: 'The Shelter OS adoption marketplace: a hero banner over cards for adoptable cats and dogs',
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
    image: '/projects/cat-connect-cover.jpg',
    imageAlt: 'The Cat Connect cat registry: real cat profiles with owned, in-shelter, and lost statuses',
    videoUrl: 'https://drive.google.com/file/d/1DOXkn57jIr1e7NH8YxkYOpVUYGSf8xFq/view?usp=drive_link',
  },
  {
    slug: 'smart-disaster-response-mis',
    title: 'Smart Disaster Response MIS',
    category: 'Web Application',
    status: 'published',
    year: '2026',
    summary:
      'A full-stack management information system for coordinating disaster response, from emergency reporting and rescue deployment to hospital tracking, inventory, and finance.',
    problem:
      'Coordinating a disaster response across field officers, rescue teams, hospitals, warehouses, and finance usually means fragmented spreadsheets and phone calls, with no shared view of what is happening or what is needed where.',
    solution:
      'The system gives every role, admins, coordinators, field officers, finance officers, warehouse managers, and hospital staff, its own dashboard over the same live data, with an approval-gated workflow for team deployment, procurement, and resource allocation.',
    features: [
      'Role-based dashboards for six user types, from field officers to hospital staff',
      'Disaster event lifecycle: creation, rescue team deployment, and closure',
      'Emergency report submission with severity tracking',
      'Inventory and multi-warehouse resource tracking',
      'Hospital capacity and patient intake tracking',
      'Finance module for donations, expenses, and a transaction ledger',
      'Procurement requests with a dedicated approval pipeline',
      'Live analytics dashboards: incident severity, hotspots, resource use, and response times',
    ],
    tech: ['Next.js', 'React', 'Framer Motion', 'Recharts', 'Node.js', 'Express', 'SQL Server', 'JWT'],
    highlights: [
      '20-table schema with 8 automation and audit triggers, plus 7 analytical SQL views',
      'Custom-indexed queries with benchmarked performance',
      'Full audit trail via database triggers for every critical action',
    ],
    image: '/projects/smart-disaster-response-mis-cover.jpg',
    imageAlt: 'The SDRMIS analytics dashboard: incident severity, report hotspots, and finance charts',
    videoUrl: 'https://drive.google.com/file/d/1vO_FXDH3tpksSftL6ZbQShkyWVaVqb7l/view',
  },
  {
    slug: 'cdiem',
    title: 'CDIEM: Digital Evidence Management',
    category: 'Desktop Application',
    status: 'published',
    year: '2026',
    summary:
      'A role-based JavaFX desktop application for managing criminal investigation cases and digital evidence, with SHA-256 integrity verification, tamper detection, and a full chain-of-custody audit trail.',
    problem:
      'Digital evidence handled across investigating officers, forensic analysts, and supervisors is easy to mishandle or dispute when there is no single, verifiable record of who touched what evidence, and when.',
    solution:
      'CDIEM gives each of its three roles, Investigating Officer, Digital Forensic Analyst, and Supervisory Authority, its own view over the same case data, hashes every piece of evidence on upload, and freezes a case the moment tampering is detected.',
    features: [
      'Role-based access for Investigating Officers, Digital Forensic Analysts, and Supervisory Authorities',
      'Case registration with severity tracking and SLA calculation',
      'Evidence upload with SHA-256 hashing and integrity verification',
      'Automatic case freezing the moment tampering is detected',
      'Supervisory review, escalation, and closure workflows',
      'Immutable audit logging for full chain-of-custody tracking',
      'Summary report generation, exportable as CSV or PDF',
    ],
    tech: ['Java', 'JavaFX', 'Maven', 'SQL Server', 'ControlsFX'],
    highlights: [
      'Evidence integrity is enforced by hashing, not policy: tampering is detected automatically and the case is frozen',
      'Every action is chain-of-custody logged in an immutable audit trail',
      'SLA breaches on open cases are tracked and surfaced for escalated review',
    ],
    image: '/projects/cdiem-cover.jpg',
    imageAlt: "CDIEM's Operations Dashboard: role-based modules for Manage Case, Manage Evidence, and Notifications",
    videoUrl: 'https://drive.google.com/file/d/1Q_6Cb0O5qczD3mN0tDgVl_AkV8RCuVpl/view',
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
  {
    slug: 'multi-mahjong',
    title: 'MultiMahjong',
    category: 'Game Development',
    status: 'published',
    year: '2026',
    summary:
      'A four-player online Mahjong game for Windows. One player hosts the server and three friends join with an address and room number; there are no accounts, no matchmaking, and no bots.',
    problem:
      'Most digital Mahjong puts you against bots or strangers, or makes you sign up before you can sit at a table with friends. Real-time claiming is also hard to do fairly online, because network lag can decide who gets a discarded tile.',
    solution:
      'MultiMahjong uses a lightweight host-run server: one person launches it, shares the address, and the hand deals once all four seats are filled. The server decides everything, claims are resolved by rule priority (Mahjong beats Pung, Pung beats Chow) rather than by whose packet arrived first, and concealed hands are never sent to other clients, so cheating by inspecting network traffic is not possible.',
    features: [
      'Full claim game: Chow, Pung, Kong, and Mahjong on a discard or a self-drawn tile (self-drawn scores double)',
      'Claims resolved by priority, so outcomes do not depend on network timing',
      '"FISHING" badge shows when any player is one tile from winning',
      'Four-round games, with the dealership passing after each win and washout hands replayed',
      'Turn timers: 30 seconds to move, 5 seconds to claim a discard',
      'Host can play on the same machine by connecting to 127.0.0.1',
    ],
    tech: ['Unity', 'C#', 'TCP/IP Networking', 'Windows'],
    highlights: [
      'Built an authoritative server that resolves simultaneous claims by game-rule priority rather than arrival order',
      'The server only sends each client what that player is allowed to see, so hidden information cannot leak through the network',
      'Handles the full match lifecycle: dealing, claim windows, timeouts, washouts, dealer rotation, and scoring across four rounds',
    ],
    demoUrl: 'https://snype2142.itch.io/multimahjong',
    image: '/projects/multi-mahjong-cover.jpg',
    imageAlt: "MultiMahjong's join screen: player name, icon, and the host address and room number",
    videoUrl: 'https://drive.google.com/file/d/1DRDszNS6HegtnTlxAvU-QNrsTyq-OOC0/view?usp=drive_link',
  },
  {
    slug: 'packages-parceled',
    title: 'Packages Parceled',
    category: 'Game Development',
    status: 'published',
    year: '2025',
    summary:
      'A 3D puzzle platformer where you deliver packages by working through increasingly tricky levels, though not everything is as it seems.',
    problem:
      'Many puzzle platformers lean on either precise jumping or abstract logic puzzles, which rarely feels grounded or story-driven.',
    solution:
      'Each level is a 3D puzzle built around special block types that the player has to use to get the package to its destination. Levels unlock as you progress, and a story twist and boss battle change how the delivery job looks.',
    features: [
      '3D puzzle-platforming levels built around package delivery',
      'Several block types with distinct mechanics that the player uses to solve levels',
      'Level unlock and progression system',
      'Boss battle',
      'Story twist hinted at by the premise',
    ],
    tech: ['Unity', 'C#', 'Windows'],
    highlights: [
      'Designed and built a complete short 3D game, from mechanics and level design through to a boss fight',
      'Created a set of interacting block mechanics that give each level its own puzzle',
      'A custom-built tutorial guides the player through the start of the game',
    ],
    demoUrl: 'https://snype2142.itch.io/packages-parceled',
    image: '/projects/packages-parceled-cover.jpg',
    imageAlt: "Packages Parceled's title screen: a floating diamond level-select island with a Levels menu",
    videoUrl: 'https://drive.google.com/file/d/1s_HCIgTjgS0M0d25YLoVP21ef4K9F6P4/view?usp=drive_link',
  },
  {
    slug: 'crash-tycoon',
    title: 'Crash Tycoon',
    category: 'Game Development',
    status: 'published',
    year: '2026',
    summary:
      'A physics-driven mobile runner built in Unity 3D, where lane-switching dodges end in full ragdoll crashes and chain-reaction vehicle pileups.',
    problem:
      'Mobile runners need tight, responsive controls, but physics-heavy moments like crashes and pileups tend to feel either scripted and fake or too expensive for phone hardware, since realistic physics and a steady frame rate pull in opposite directions.',
    solution:
      'Crash Tycoon uses custom physics-based lane-switching during play. On impact, the character controller switches seamlessly into full ragdoll physics, so every crash plays out differently, and collisions calculate impact forces to drive dynamic vehicle pileups. Heavy profiling and optimization keep all of this running smoothly on mobile.',
    features: [
      'Custom physics-based lane-switching movement',
      'Seamless transition from the character controller to full ragdoll on impact',
      'Collision system that calculates impact forces for dynamic vehicle pileups',
      'Localized visual effects triggered by collision events',
      'Modular, extensible power-up system for gameplay modifiers',
      'Optimized for a steady frame rate on standard mobile hardware',
    ],
    tech: ['Unity', 'C#', 'Unity Physics', 'Android'],
    highlights: [
      'Built a seamless handoff from the gameplay character controller to full ragdoll physics mid-run',
      'Profiled and optimized for mobile by cutting draw calls, managing object instantiation, and tightening scripts to hold a steady frame rate',
      'Designed an event-driven collision architecture and an extensible power-up system, so new effects and modifiers are easy to add and test',
    ],
    demoUrl: 'https://drive.google.com/file/d/1eSffQTmpv6vIkHY_VsOjJEqzc6tc7b4e/view?usp=drive_link',
    image: '/projects/crash-tycoon-cover.jpg',
    imageAlt: "Crash Tycoon's start screen: a character on the road beside the score and play button",
    videoUrl: 'https://drive.google.com/file/d/1d84QeoFo4CB0Q3OTJFi_SCQ8T9rheE1X/view?usp=drive_link',
  },
];
