'use server';
import { Suspense, type ReactNode } from 'react';
import Loading from './loading';
import { Box, Flex, Section } from '@radix-ui/themes';
import Image from 'next/image';
import TstPageHeader from '@/_components/common/TstPageHeader';

const ExperienceLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="column">
      <TstPageHeader>
        <Image
          src="/images/profile-sm.jpg"
          width="144"
          height="166"
          alt="Profile Picture"
          priority={true}
          className="!hidden absolute left-4 rounded-md shadow-md md:!flex"
        />

        <div className="flex flex-col md:ml-40">
          <h2 className="flex justify-left">Experience</h2>
          <p className="hidden md:flex">
            Experienced Lead/Senior Software Engineer with a demonstrated
            history of working in the information technology and services
            industry. Skilled in ReactJS, JavaScript, Redux and supporting
            technologies within the Web, Front End and UI development echo
            system.
          </p>
        </div>
      </TstPageHeader>
      <Section size="1">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Section>
    </Flex>
  );
};

export default ExperienceLayout;
