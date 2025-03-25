'use server';

import { Box, Card, Container, Section } from '@radix-ui/themes';
import { getExperience } from '../../_api/experienceApi';

import ExperienceCard from '@/_components/experienceCard/ExperienceCard';

import dynamic from 'next/dynamic';

const Experience = async () => {
  const fetchData = async () => {
    try {
      return await getExperience();
    } catch (error) {
      console.error(error);
    }
  };

  const data = await fetchData();

  return (
    <div>
      <Section className="mt-8">
        {data &&
          data.map(experience => (
            <ExperienceCard key={experience.company} experience={experience} />
          ))}
      </Section>
    </div>
  );
};

export default Experience;
