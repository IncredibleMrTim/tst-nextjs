import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Tim Smart Technology Ltd. Senior engineering roles across enterprise, pharma, finance and government, from React migrations and design systems to production AI integration.',
  keywords: [
    'Experience',
    'Tim Smart',
    'Full Stack',
    'Software Engineer',
    'Consultant',
    'Contractor',
    'React',
    'Next.js',
    'TypeScript'
  ]
};

const ExperienceLayout = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

export default ExperienceLayout;
