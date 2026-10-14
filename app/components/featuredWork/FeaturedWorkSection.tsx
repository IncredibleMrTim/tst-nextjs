'use client';

import { type Role } from '@/actions/role.actions';
import { type FeaturedWork } from '@/actions/featuredWork.actions';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import { focusExperience } from '@/store/experienceFilter/filterSlice';
import { useAppDispatch } from '@/store/redux/store';
import FeaturedWorkCard from './FeaturedWorkCard';

interface FeaturedWorkSectionProps {
  featuredWork: FeaturedWork[];
  experiences: Role[];
}

const FeaturedWorkSection = ({
  featuredWork,
  experiences
}: FeaturedWorkSectionProps) => {
  const dispatch = useAppDispatch();

  return (
    <Section id="work">
      <SectionHeading
        title="Selected work"
        description="Four results I’m proudest of, each with the full role behind it."
      />
      <div className="grid gap-[0.9rem] min-[860px]:grid-cols-2">
        {featuredWork.map(work => (
          <FeaturedWorkCard
            key={work.id}
            work={work}
            company={
              experiences.find(
                experience => experience.id === work.experienceId
              )?.company ?? ''
            }
            onReadRole={experienceId => dispatch(focusExperience(experienceId))}
          />
        ))}
      </div>
    </Section>
  );
};

export default FeaturedWorkSection;
