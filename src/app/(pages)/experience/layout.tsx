import { Suspense, type ReactNode } from 'react';
import Loading from './loading';
import { Box } from '@radix-ui/themes';

const ExperienceLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Box className="flex relative bg-red-700 w-full p-4 rounded-md text-white">
        <img
          src="/images/profile.svg"
          alt="Profile Picture"
          className="absolute left-4 w-36 rounded-md shadow-md"
        />

        <div className="flex flex-col ml-40">
          <h1>Experience</h1>
          <p>
            Experienced Lead/Senior Software Engineer with a demonstrated
            history of working in the information technology and services
            industry. Skilled in ReactJS, JavaScript, Redux and supporting
            technologies within the Web, Front End and UI development echo
            system.
          </p>
        </div>
      </Box>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default ExperienceLayout;
