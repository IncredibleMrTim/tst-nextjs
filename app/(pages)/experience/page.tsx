import {
  getExperiences,
  type ExperienceWithSkills
} from '@/actions/experience.actions';

import ExperienceCard from '@/components/experienceCard/ExperienceCard';
import {
  AstraZenecaLogo,
  CoyoteLogo,
  LexisNexisLogo,
  MdrxTechLogo,
  OnsLogo,
  ProagricaLogo,
  SantanderLogo
} from '@/components/logos';

const Experience = async () => {
  let data: ExperienceWithSkills[] | undefined;

  try {
    data = await getExperiences();
  } catch (error) {
    console.error('Error loading experiences:', error);
  }

  const imgMapping = [
    {
      index: 0,
      company: 'Wizzington Moos Boutique',
      image: (
        <img
          src="/images/wizz-logo-trans.webp"
          alt="Wizzington Moos Boutique"
        />
      )
    },
    {
      index: 1,
      company: 'AstraZeneca',
      image: <AstraZenecaLogo />
    },
    { index: 2, company: 'Santander', image: <SantanderLogo /> },
    { index: 3, company: 'Coyote', image: <CoyoteLogo /> },
    { index: 4, company: 'Mdrx Tech', image: <MdrxTechLogo /> },
    { index: 5, company: 'Office of National Statistics', image: <OnsLogo /> },
    {
      index: 6,
      company: 'Lexis Nexis Risk Solutions',
      image: <LexisNexisLogo />
    },
    { index: 7, company: 'Proagrica (formerly DBT)', image: <ProagricaLogo /> },
    { index: 8, company: 'MAD Productions' },
    { index: 9, company: 'Webree Ltd.' }
  ];

  return (
    <div className="!pt-4 md:!pt-8">
      {data &&
        data
          .sort((a, b) => b.order - a.order)
          .map((experience, idx) => (
            <ExperienceCard key={experience.company} experience={experience}>
              {imgMapping[idx]?.image ?? null}
            </ExperienceCard>
          ))}
    </div>
  );
};

export default Experience;
