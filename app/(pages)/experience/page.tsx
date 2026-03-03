import {
  getExperiences,
  type ExperienceWithSkills
} from '@/actions/experience.actions';

import ExperienceList from './ExperienceList';
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
      index: 2,
      company: 'AstraZeneca',
      image: <AstraZenecaLogo />
    },
    { index: 3, company: 'Santander', image: <SantanderLogo /> },
    { index: 4, company: 'Coyote', image: <CoyoteLogo /> },
    { index: 5, company: 'Mdrx Tech', image: <MdrxTechLogo /> },
    { index: 6, company: 'Office of National Statistics', image: <OnsLogo /> },
    {
      index: 7,
      company: 'Lexis Nexis Risk Solutions',
      image: <LexisNexisLogo />
    },
    { index: 8, company: 'Proagrica (formerly DBT)', image: <ProagricaLogo /> },
    { index: 9, company: 'MAD Productions' },
    { index: 10, company: 'Webree Ltd.' }
  ];

  return data ? <ExperienceList data={data} imgMapping={imgMapping} /> : null;
};

export default Experience;
