'use server';
import { Suspense, type ReactNode } from 'react';
import Loading from './loading';
import { Flex } from '@radix-ui/themes';
import Image from 'next/image';
import PageHeader from '@/components/common/PageHeader';
import Head from 'next/head';
import PageContainer from '@/components/common/PageContainer';

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
        <PageHeader
          title="Experience"
          className="border-b-0 md:border-b"
          showBorder={false}
        >
          <p>
            Experienced Lead/Senior Software Engineer with a demonstrated
            history of working in the information technology and services
            industry. Skilled in ReactJS, JavaScript, Redux and supporting
            technologies within the Web, Front End and UI development echo
            system.
          </p>
        </PageHeader>
        <PageContainer>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </PageContainer>
      </Flex>
    </>
  );
};

export default ExperienceLayout;
