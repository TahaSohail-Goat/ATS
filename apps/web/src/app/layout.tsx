import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { colors } from '@ats/ui';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { themeInitScript } from '../lib/theme';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

// Monospace is used for numerals, indices, and technical labels — it does the
// "engineering" signalling so the sans face can stay neutral.
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' });

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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: colors.backgroundDark },
    { media: '(prefers-color-scheme: light)', color: colors.backgroundLight },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `dark` is the default scheme; the inline script below swaps in `light`
    // before paint when the visitor has chosen it, so there is no flash.
    // suppressHydrationWarning covers that intentional class difference.
    <html lang="en" className={`${inter.variable} ${mono.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-ats-canvas text-ats-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ats-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
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
