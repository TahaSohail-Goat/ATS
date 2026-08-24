/**
 * ATS team roster. Photos live in `public/team/`; cards fall back to an
 * initials monogram derived from `name` when `photo` is omitted.
 */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  /** Bias the card's crop toward the top of the photo (e.g. tall portraits where the default center crop clips hair). */
  photoPosition?: 'center' | 'top';
}

export const team: TeamMember[] = [
  {
    name: 'Taha Sohail',
    role: 'Founder & CEO & Agentic AI Full Stack Developer',
    bio: 'Leads ATS end to end, setting technical direction and client partnerships while building agentic AI systems across the full stack.',
    photo: '/team/taha-sohail.jpeg',
    photoPosition: 'top',
  },
  {
    name: 'Abdullah Adnan',
    role: 'Co-founder & AI Engineer',
    bio: 'Designs and ships the AI and machine learning systems behind ATS products, from model training to production deployment.',
    photo: '/team/abdullah-adnan.jpeg',
  },
  {
    name: 'Muhammad Shaheer',
    role: 'Co-founder & Frontend Developer & UI/UX Designer',
    bio: 'Designs and builds the interfaces clients use every day, turning complex requirements into clean, intuitive experiences.',
    photo: '/team/muhammad-shaheer.jpeg',
  },
  {
    name: 'Rayyan Hassan',
    role: 'Co-founder & Backend Developer & Product Engineer',
    bio: 'Builds the backend systems and APIs that power ATS products, and drives product engineering from architecture to launch.',
    photo: '/team/rayyan-hassan.jpeg',
  },
];
