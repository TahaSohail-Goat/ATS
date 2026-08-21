import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ATS — AI Software and Technology Solutions',
    template: '%s | ATS',
  },
  description:
    'ATS is a software studio building custom software, AI features, and cloud infrastructure for ambitious teams.',
  openGraph: {
    title: 'ATS — AI Software and Technology Solutions',
    description:
      'ATS is a software studio building custom software, AI features, and cloud infrastructure for ambitious teams.',
    type: 'website',
    siteName: 'ATS',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATS — AI Software and Technology Solutions',
    description:
      'ATS is a software studio building custom software, AI features, and cloud infrastructure for ambitious teams.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ats-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
