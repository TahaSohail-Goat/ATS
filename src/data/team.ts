/**
 * AST team roster. Photos live in `public/team/`; cards fall back to an
 * initials monogram derived from `name` when `photo` is omitted.
 */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  /** Bias the card's crop toward the top of the photo (e.g. tall portraits where the default center crop clips hair). */
  photoPosition?: 'center' | 'top';
  linkedinUrl?: string;
  githubUrl?: string;
}

export const team: TeamMember[] = [
  {
    name: 'Taha Sohail',
    role: 'CEO',
    bio: 'Leads AST end to end, setting technical direction and client partnerships while building agentic AI systems across the full stack.',
    photo: '/team/taha-sohail.jpeg',
    photoPosition: 'top',
    linkedinUrl: 'https://www.linkedin.com/in/taha-sohail-7b03b8320/',
    githubUrl: 'https://github.com/TahaSohail-Goat',
  },
  {
    name: 'Abdullah Adnan',
    role: 'CTO',
    bio: 'Leads AST’s technical direction and oversees the engineering of reliable software and AI systems.',
    photo: '/team/abdullah-adnan.png',
    photoPosition: 'top',
    linkedinUrl: 'https://www.linkedin.com/in/abdullah-adnan-660bb1350',
    githubUrl: 'https://github.com/Abdullah-SE-bit',
  },
  {
    name: 'Muhammad Shaheer',
    role: 'COO',
    bio: 'Leads AST’s day-to-day operations and helps the team deliver projects smoothly from planning through launch.',
    photo: '/team/muhammad-shaheer.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/muhammad-shaheer-28bb1a3ab',
    githubUrl: 'https://github.com/Artfever',
  },
  {
    name: 'Rayyan Hassan',
    role: 'Product Manager',
    bio: 'Guides product planning and priorities, translating user and business needs into clear requirements for the team.',
    photo: '/team/rayyan-hassan.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/syed-muhammad-rayyan-hasan-8379b2386',
    githubUrl: 'https://github.com/rayyanhasan899',
  },
];
