import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  env: {
    TST_API: 'https://tst-server.vercel.app/',
    NEXT_PUBLIC_GA_ID: 'G-Q2N4DP8TH6',
    GOOGLE_CLIENT_ID:
      '340474634050-j7nslhps191cm5dnbj7s5816645d9nks.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    NEXTAUTH_SECRET: '6mPJL/4p7t1H0raJlRN3JOdjearnnncLiGRwoJZJF9s=',
    NEXTAUTH_URL: 'https://timsmarttechnology.co.uk'
  },

  experimental: {
    turbo: {
      resolveAlias: {
        canvas: './app/empty-module.ts'
      }
    }
  }
};

export default nextConfig;
