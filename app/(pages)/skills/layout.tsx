'use server';
import { Suspense, type ReactNode } from 'react';
import Loading from './loading';

import PageHeader from '@/components/common/PageHeader';
import PageContainer from '@/components/common/PageContainer';
import Head from 'next/head';

const ExperienceLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Head>
        <title>Skills and Technology | Tim Smart Technology Ltd.</title>
        <meta
          name="description"
          content="Tim Smart Technology Ltd. Skilled in ReactJS, JavaScript, Redux and supporting technologies within the Web, Front End and UI development echo system."
        />
        <meta
          name="keywords"
          content="Skills, Technology, Tim Smart, Frontend, Software Engineer, Consultant, Contractor, Web Development, React, Next.js, Node.js"
        />
      </Head>
      <PageHeader>Skills and Technologies</PageHeader>
      <PageContainer>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </PageContainer>
    </div>
  );
};

export default ExperienceLayout;
