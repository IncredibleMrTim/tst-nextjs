export const revalidate = 604800; // 7 days, matching the cached content actions

import { getExperiences } from '@/actions/experience.actions';
import { getSkillGroups } from '@/actions/skillGroup.actions';
import SkillsSection from '@/components/skills/SkillsSection';

const Skills = async () => {
  const [experiences, skillGroups] = await Promise.all([
    getExperiences(),
    getSkillGroups()
  ]);

  return (
    <div className="pt-[clamp(2rem,5vw,4rem)]">
      <SkillsSection
        groups={skillGroups.map(({ name, items }) => ({ name, skills: items }))}
        experiences={experiences}
        experienceHref="/experience"
      />
    </div>
  );
};

export default Skills;
