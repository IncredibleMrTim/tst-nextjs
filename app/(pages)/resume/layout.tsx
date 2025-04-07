import { Box } from '@radix-ui/themes';
import Head from 'next/head';

const ResumeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Resume / CV | Tim Smart Technology Ltd.</title>
        <meta
          name="description"
          content="Tim Smart Technology Ltd. Experienced Lead/Senior Software Engineer with a demonstrated history of working in the information technology and services industry. Skilled in ReactJS, JavaScript, Redux and supporting technologies within the Web, Front End and UI development echo system."
        />
        <meta
          name="keywords"
          content="Resume, CV, Tim Smart, Frontend, Software Engineer, Consultant, Contractor, Web Development, React, Next.js, Node.js"
        />
      </Head>
        <Box>{children}</Box>

    </>
  );
};
export default ResumeLayout;
