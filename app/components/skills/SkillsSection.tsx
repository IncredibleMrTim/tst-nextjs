import { type Role } from '@/actions/role.actions';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import SkillMatrix from './SkillMatrix';

interface SkillsSectionProps {
  /** Skills shown under a heading each; leave `name` out for a single ungrouped list. */
  groups: { name?: string; skills: string[] }[];
  experiences: Role[];
  experienceHref: string;
}

const SkillsSection = ({
  groups,
  experiences,
  experienceHref
}: SkillsSectionProps) => (
  <Section id="skills">
    <SectionHeading
      title="Skills in practice"
      description={`Each cell is one of my ${experiences.length} roles, oldest to newest. A lit cell means I used that skill there. Select a skill to filter experience.`}
    />
    {groups.map(group => (
      <div key={group.name ?? 'skills'} className="mb-10 last:mb-0">
        {group.name && (
          <h3 className="mb-2 text-[1.15rem] font-semibold">{group.name}</h3>
        )}
        <SkillMatrix
          skills={group.skills}
          experiences={experiences}
          experienceHref={experienceHref}
        />
      </div>
    ))}
  </Section>
);

export default SkillsSection;
