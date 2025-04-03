'use client';

import './globals.css';
import Head from 'next/head';
import '@radix-ui/themes/styles.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Theme, Container } from '@radix-ui/themes';
import { Geist, Geist_Mono } from 'next/font/google';

import BrandBanner from '@components/brandBanner/BrandBanner';
import AppHeader from './_components/header/Header';

import ReduxProvider from '@/_store/redux/provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <title>Tim Smart Technology Ltd. | Frontend Software Engineer</title>
        <meta
          name="description"
          content="Tim Smart Technology Ltd. specializes in frontend software engineering, consulting, and contracting services."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Tim Smart Technology Ltd." />
        <meta
          name="keywords"
          content="Tim Smart, Frontend, Software Engineer, Consultant, Contractor, Web Development, React, Next.js, Node.js"
        />

        {/* Links */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
        <ReduxProvider>
          <Theme>
            <AppHeader />
            <Container>
              <div className="flex flex-col justify-center mx-auto w-full">
                <BrandBanner />
                <div className="px-8 mb-8">{children}</div>
              </div>
            </Container>
          </Theme>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
