'use server';
import { Suspense, type ReactNode } from 'react';
import Loading from './loading';
import { Section } from '@radix-ui/themes';

import TstPageHeader from '@components/common/TstPageHeader';

const ExperienceLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TstPageHeader>Skills and Technologies</TstPageHeader>
      <Section size="1">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Section>
    </div>
  );
};

export default ExperienceLayout;
