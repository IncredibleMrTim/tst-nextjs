'use client';
import './globals.css';
import '@radix-ui/themes/styles.css';

import { Theme, Container } from '@radix-ui/themes';
import type { Metadata } from 'next';
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

const metadata: Metadata = {
  title: 'Tim Smart Technology Ltd.',
  description: 'Frontend Software Engineer Consultant and Contractor',
  icons: [
    {
      rel: 'icon',
      href: '/favicon.ico',
      url: '/favicon.ico'
    }
  ]
};

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
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
