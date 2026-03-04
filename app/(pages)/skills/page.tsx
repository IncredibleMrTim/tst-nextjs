import { getSkills, type SkillCategory } from '@actions/skills.actions';
import { Box, Section } from '@radix-ui/themes';
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { LuInfo } from 'react-icons/lu';

const Skills = async () => {
  try {
    const data: SkillCategory[] = await getSkills();

    return (
      <div className="flex flex-col md:flex-row flex-wrap w-full gap-4">
        {data &&
          data.map((category, i) => (
            <div
              key={category.title}
              className="flex flex-col grow w-full md:w-1/3 border border-gray-200 rounded p-4 shadow "
            >
              <h2>{category.title}</h2>
              <div className="py-4 px-8">
                <ul>
                  {category.skills.map(skill => (
                    <li className="pb-2 list-disc" key={skill.id}>
                      <h3>{skill.name}</h3>
                      <p className="text-sm">{skill.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <Section size="1">
        <div>Error loading skills</div>
      </Section>
    );
  }
};

export default Skills;
