'use server';
import { Suspense, type ReactNode } from 'react';
import Loading from './loading';
import { Box, Section } from '@radix-ui/themes';
import Image from 'next/image';

const ExperienceLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Box className="flex relative bg-red-700 w-fill p-4 rounded-md text-white shadow-md mt-4 md:mt-8">
        <h2 className="flex justify-left md:justify-end">
          Skills and Technologies
        </h2>
      </Box>
      <Section size="1">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Section>
    </div>
  );
};

export default ExperienceLayout;
