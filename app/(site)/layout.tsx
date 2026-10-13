import '../globals.css';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import localFont from 'next/font/local';
import { Suspense } from 'react';

import ReduxProvider from '@/store/redux/provider';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import DraftModeControls from '@/components/draftMode/DraftModeControls';

// Bundled (latin subset, variable weight 100-800) rather than fetched through
// next/font/google: Turbopack ignores `adjustFontFallback: false` for Google
// fonts, and the auto-generated Arial fallback has wider arrow glyphs than
// system-ui, which shifted the layout.
const sora = localFont({
  src: '../fonts/Sora-latin.woff2',
  variable: '--font-sora',
  weight: '100 800',
  display: 'swap',
  adjustFontFallback: false
});

const SITE_NAME = 'Tim Smart Technology Ltd.';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://timsmarttechnology.co.uk'
  ),
  title: {
    default: `${SITE_NAME} | Senior Full Stack Engineer`,
    template: `%s | ${SITE_NAME}`
  },
  description: `${SITE_NAME} specialises in full stack software engineering with React, Next.js, TypeScript and AI integration, available for consulting and contracting.`,
  authors: [{ name: SITE_NAME }],
  keywords: [
    'Tim Smart',
    'Full Stack',
    'Frontend',
    'Software Engineer',
    'Consultant',
    'Contractor',
    'Web Development',
    'React',
    'Next.js',
    'TypeScript',
    'AI Integration'
  ],
  openGraph: {
    images: ['/images/tst-social-og.webp']
  }
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${sora.variable} font-sans antialiased`}>
        {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
        <Analytics />
        <ReduxProvider>
          <Header />
          <main id="top">{children}</main>
          <Footer />
        </ReduxProvider>
        <Suspense>
          <DraftModeControls />
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
