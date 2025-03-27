import { getSkills, Skill } from '@api/skillsApi';
import { Box, Section } from '@radix-ui/themes';
import { Accordion } from '@components/accordion/Accordion';

const Skills = async () => {
  try {
    const data = await getSkills();

    return (
      <div>
        <Section size="1" className="!p-0 mt-4">
          {data &&
            data.map((category, i) => (
              <div key={category.title}>
                <Accordion
                  title={category.title}
                  open={i === 0}
                  lastItem={i === data.length - 1}
                >
                  {category.skills.map(skill => (
                    <Box className="pb-4" key={skill.name}>
                      <h3 className="pb-2">{skill.name}</h3>
                      <div className="pb-4 pl-0 whitespace-pre-line md:pl-4">
                        {skill.description}
                      </div>
                    </Box>
                  ))}
                </Accordion>
              </div>
            ))}
        </Section>
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
