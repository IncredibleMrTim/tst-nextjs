import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  env: {
    TST_API: 'https://tst-server.vercel.app/',
    NEXT_PUBLIC_GA_ID: 'G-Q2N4DP8TH6'
  }
};

export default nextConfig;
