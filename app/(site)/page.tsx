export const revalidate = 604800; // 7 days, matching the cached content actions

import { getEducation } from '@/actions/education.actions';
import { getExperiences } from '@/actions/experience.actions';
import { getFeaturedWork } from '@/actions/featuredWork.actions';
import { getProjects } from '@/actions/project.actions';
import About from '@/components/about/About';
import ClosingCard from '@/components/contact/ClosingCard';
import ExperienceSection from '@/components/experience/ExperienceSection';
import FeaturedWorkSection from '@/components/featuredWork/FeaturedWorkSection';
import Hero from '@/components/hero/Hero';
import Projects from '@/components/projects/Projects';
import SkillsSection from '@/components/skills/SkillsSection';
import { getRequiredProfile } from '@/lib/content';
import {
  getUniqueTechnologyCount,
  getYearsSince
} from '@/utils/experienceUtils';

const Home = async () => {
  const [profile, experiences] = await Promise.all([
    getRequiredProfile(),
    getExperiences()
    // getFeaturedWork(),
    // getProjects(),
    // getEducation()
  ]);
  // Most recent first, so the last role is the earliest.
  const earliestExperience = experiences[experiences.length - 1];

  return (
    <>
      <Hero
        profile={profile}
        stats={{
          yearsInSoftware: earliestExperience
            ? getYearsSince(earliestExperience.fromDate)
            : 0,
          roleCount: experiences.length,
          technologyCount: getUniqueTechnologyCount(experiences)
        }}
      />
      {/* <About profile={profile} education={education} />
      <SkillsSection
        groups={[{ skills: profile.featuredSkills }]}
        experiences={experiences}
        experienceHref="/#experience"
      />
      <FeaturedWorkSection
        featuredWork={featuredWork}
        experiences={experiences}
      /> */}
      <ExperienceSection experiences={experiences} />
      {/* <Projects projects={projects} /> */}
      {/* <ClosingCard profile={profile} />  */}
    </>
  );
};

export default Home;
