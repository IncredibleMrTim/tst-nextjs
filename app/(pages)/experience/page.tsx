'use server';

import { Section } from '@radix-ui/themes';
import { getExperience } from '@api/experienceApi';

import ExperienceCard from '@components/experienceCard/ExperienceCard';

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
    <Section size="1">
      {data &&
        data
          .sort((a, b) => b.order - a.order)
          .map(experience => (
            <ExperienceCard key={experience.company} experience={experience} />
          ))}
    </Section>
  );
};

export default Experience;
