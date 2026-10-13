export const revalidate = 604800; // 7 days, matching the cached content actions

import { getExperiences } from '@/actions/experience.actions';
import ExperienceSection from '@/components/experience/ExperienceSection';

const Experience = async () => {
  const experiences = await getExperiences();

  return (
    <div className="pt-[clamp(2rem,5vw,4rem)]">
      <ExperienceSection experiences={experiences} />
    </div>
  );
};

export default Experience;
