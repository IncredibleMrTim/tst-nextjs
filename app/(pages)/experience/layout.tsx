'use server';
import { Suspense, type ReactNode } from 'react';
import Loading from './loading';
import { Flex, Section } from '@radix-ui/themes';
import Image from 'next/image';
import PageHeader from '@/components/common/PageHeader';
import Head from 'next/head';

const ExperienceLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Experience | Tim Smart Technology Ltd.</title>
        <meta
          name="description"
          content="Tim Smart Technology Ltd. Experienced Lead/Senior Software Engineer with a demonstrated history of working in the information technology and services industry. Skilled in ReactJS, JavaScript, Redux and supporting technologies within the Web, Front End and UI development echo system."
        />
        <meta
          name="keywords"
          content="Experience, Tim Smart, Frontend, Software Engineer, Consultant, Contractor, Web Development, React, Next.js, Node.js"
        />
      </Head>
      <Flex direction="column">
        <PageHeader>
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
            <p className="xs:hidden sm:flex md:flex md:visible">
              Experienced Lead/Senior Software Engineer with a demonstrated
              history of working in the information technology and services
              industry. Skilled in ReactJS, JavaScript, Redux and supporting
              technologies within the Web, Front End and UI development echo
              system.
            </p>
          </div>
        </PageHeader>
        <Section size="1">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Section>
      </Flex>
    </>
  );
};

export default ExperienceLayout;
