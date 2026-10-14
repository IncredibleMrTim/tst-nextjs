'use client';

import { useEffect, useState } from 'react';

import { type Role } from '@/actions/role.actions';
import Section from '@/components/common/Section';
import SectionHeading from '@/components/common/SectionHeading';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  ALL_DECADES,
  clearFocusedExperience,
  focusExperience,
  setDecade,
  setSkill
} from '@/store/experienceFilter/filterSlice';
import { useAppDispatch, useAppSelector } from '@/store/redux/store';
import { getScrollBehavior } from '@/utils/browserUtils';
import { getDecade, getExperiencesUsingSkill } from '@/utils/experienceUtils';
import CareerRuler from './CareerRuler';
import ExperienceFilters from './ExperienceFilters';
import ExperienceItem from './ExperienceItem';

interface ExperienceSectionProps {
  /** Most recent role first. */
  experiences: Role[];
}

// The latest roles start open so the page isn't a wall of closed rows
const DEFAULT_OPEN_COUNT = 2;

const getDefaultOpenIds = (
  experiences: Role[],
  rolesUsingSkill: Role[] | null
) =>
  (rolesUsingSkill ?? experiences.slice(0, DEFAULT_OPEN_COUNT)).map(
    experience => experience.id
  );

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  const dispatch = useAppDispatch();
  const { skill, decade, focusedExperienceId } = useAppSelector(
    state => state.experienceFilter
  );

  const rolesUsingSkill = skill
    ? getExperiencesUsingSkill(experiences, skill)
    : null;
  const [openIds, setOpenIds] = useState(() =>
    getDefaultOpenIds(experiences, rolesUsingSkill)
  );

  const decades = [
    ...new Set(experiences.map(experience => getDecade(experience.fromDate)))
  ].map(decadeLabel => ({
    decade: decadeLabel,
    count: experiences.filter(
      experience => getDecade(experience.fromDate) === decadeLabel
    ).length
  }));
  const visibleExperiences =
    decade === ALL_DECADES
      ? experiences
      : experiences.filter(
          experience => getDecade(experience.fromDate) === decade
        );
  const dimmedExperienceIds = new Set(
    rolesUsingSkill
      ? experiences
          .filter(experience => !rolesUsingSkill.includes(experience))
          .map(experience => experience.id)
      : []
  );
  const areAllRolesOpen = visibleExperiences.every(experience =>
    openIds.includes(experience.id)
  );

  // Changing the filter resets which roles are open, as the roles shown change
  useEffect(() => {
    setOpenIds(getDefaultOpenIds(experiences, rolesUsingSkill));
  }, [skill, decade]);

  // Other sections ask for a role to be opened and scrolled to by id
  useEffect(() => {
    if (!focusedExperienceId) return;

    setOpenIds(ids =>
      ids.includes(focusedExperienceId) ? ids : [...ids, focusedExperienceId]
    );
    // Wait a frame so the role has expanded before measuring where to scroll
    requestAnimationFrame(() =>
      document.getElementById(`role-${focusedExperienceId}`)?.scrollIntoView({
        behavior: getScrollBehavior(),
        block: 'start'
      })
    );
    dispatch(clearFocusedExperience());
  }, [focusedExperienceId, dispatch]);

  const handleToggleAllRoles = () =>
    setOpenIds(
      areAllRolesOpen ? [] : visibleExperiences.map(experience => experience.id)
    );

  return (
    <Section id="experience">
      <SectionHeading
        title="Experience"
        description="Select a bar to jump to that role."
      />
      <CareerRuler
        experiences={experiences}
        dimmedExperienceIds={dimmedExperienceIds}
        onSelectExperience={experienceId =>
          dispatch(focusExperience(experienceId))
        }
      />
      <ExperienceFilters
        decades={decades}
        selectedDecade={decade}
        areAllRolesOpen={areAllRolesOpen}
        onSelectDecade={selectedDecade => dispatch(setDecade(selectedDecade))}
        onToggleAllRoles={handleToggleAllRoles}
      />
      <div
        aria-live="polite"
        className="mb-[0.8rem] flex min-h-8 items-center gap-[0.8rem] text-[0.92rem] text-muted-foreground"
      >
        {skill && rolesUsingSkill && (
          <>
            Roles that used {skill}: {rolesUsingSkill.length} of{' '}
            {experiences.length}
            <Button
              variant="ghost"
              className="h-auto rounded-full bg-brand-2/[0.18] px-[0.8rem] py-[0.2rem] text-[0.85rem] font-normal text-brand-soft hover:bg-brand-2/[0.28] hover:text-brand-soft"
              onClick={() => dispatch(setSkill(null))}
            >
              Clear
            </Button>
          </>
        )}
      </div>
      <Accordion
        type="multiple"
        value={openIds}
        onValueChange={setOpenIds}
        className="ml-2 grid gap-[0.4rem] border-l border-line-strong pl-[1.8rem]"
      >
        {visibleExperiences.map(experience => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            isDimmed={dimmedExperienceIds.has(experience.id)}
            highlightedSkill={skill}
          />
        ))}
      </Accordion>
    </Section>
  );
};

export default ExperienceSection;
