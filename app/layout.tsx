'use client';
import './globals.css';
import Head from 'next/head';
import '@radix-ui/themes/styles.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Theme, Container } from '@radix-ui/themes';
// eslint-disable-next-line camelcase
import { Geist, Geist_Mono } from 'next/font/google';

import BrandBanner from '@components/brandBanner/BrandBanner';

import AppHeader from './_components/header/Header';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useNavigationStore } from '@store/navigation/useNavigationStore';

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
  const pathName = usePathname();

  const setActiveMenuItem = useNavigationStore(
    state => state.setActiveMenuItem
  );
  const menuItems = useNavigationStore(state => state.menuItems);

  useEffect(() => {
    setActiveMenuItem(
      menuItems.find(item => item.path === pathName) || menuItems[0]
    );
  }, [pathName]);

  return (
    <html lang="en">
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
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
          content="Frontend, Software Engineer, Consultant, Contractor, Web Development, React, Next.js"
        />

        {/* Links */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme>
          <AppHeader />
          <Container>
            <div className="flex flex-col justify-center mx-auto w-full">
              <BrandBanner />
              <div className="px-8">{children}</div>
            </div>
          </Container>
        </Theme>
      </body>
    </html>
  );
};

export default RootLayout;
