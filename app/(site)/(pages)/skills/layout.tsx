import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'Skills and Technology',
  description:
    'Tim Smart Technology Ltd. Skilled in React, Next.js, TypeScript, Node.js, PostgreSQL and AI integration, shown against the roles where each was used.',
  keywords: [
    'Skills',
    'Technology',
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

const SkillsLayout = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

export default SkillsLayout;
