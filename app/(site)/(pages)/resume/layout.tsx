import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume / CV',
  description:
    'Tim Smart Technology Ltd. Resume and CV for a senior full stack engineer with a history of enterprise, pharma, finance and government delivery, specialising in React, Next.js, TypeScript and AI integration.',
  keywords: [
    'Resume',
    'CV',
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

const ResumeLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-6xl px-gutter pt-[clamp(2rem,5vw,4rem)] pb-[clamp(3rem,6vw,5rem)]">
    {children}
  </div>
);

export default ResumeLayout;
