'use server';

import { Section } from '@radix-ui/themes';
import { getExperience } from '../../_api/experienceApi';

import ExperienceCard from '@/_components/experienceCard/ExperienceCard';

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
      <Section className="!mt-0 md:mt-8" size="2">
        {data &&
          data.map(experience => (
            <ExperienceCard key={experience.company} experience={experience} />
          ))}
      </Section>
    </div>
  );
};

export default Experience;
