import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ATS — AI Software and Technology Solutions',
    template: '%s | ATS',
  },
  description: 'ATS builds AI-powered software and technology solutions for ambitious teams.',
  openGraph: {
    title: 'ATS — AI Software and Technology Solutions',
    description: 'ATS builds AI-powered software and technology solutions for ambitious teams.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATS — AI Software and Technology Solutions',
    description: 'ATS builds AI-powered software and technology solutions for ambitious teams.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
