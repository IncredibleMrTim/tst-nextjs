'use server';
import { Suspense, type ReactNode } from 'react';
import Loading from './loading';

import PageHeader from '@components/common/PageHeader';
import PageContainer from '@components/common/PageContainer';

const ExperienceLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <PageHeader>Skills and Technologies</PageHeader>
      <PageContainer className="!pt-4 md:!pt-8">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </PageContainer>
    </div>
  );
};

export default ExperienceLayout;
