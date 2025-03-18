'use client';
import { useState, useEffect } from 'react';
import { Box, Container, Section } from '@radix-ui/themes';
import { getExperience } from '../../_api/experienceApi';
import { ExperienceModal } from '@/_model/experienceModal';
import ExperienceCard from '@/_components/experienceCard/ExperienceCard';

const Experience = () => {
  const [message, setMessage] = useState('Loading...');
  const [experiences, setExperiences] = useState<ExperienceModal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExperience();
        setExperiences(data);
        setMessage('');
      } catch (error) {
        setMessage('Error fetching experiences');
      }
    };

    fetchData();
  }, []);

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

      <Section className="mt-8">
        {experiences.map(experience => (
          <ExperienceCard experience={experience} />
        ))}
      </Section>
    </div>
  );
};

export default Experience;
