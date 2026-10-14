'use client';

import { useRouter } from 'next/navigation';

import { type Role } from '@/actions/role.actions';
import { useAppDispatch } from '@/store/redux/store';
import { setSkill } from '@/store/experienceFilter/filterSlice';
import { getExperiencesUsingSkill } from '@/utils/experienceUtils';

interface SkillMatrixProps {
  skills: string[];
  /** Any order; roles are shown oldest to newest. */
  experiences: Role[];
  /** Where to send the visitor after choosing a skill, so they see the filtered roles. */
  experienceHref: string;
}

const SkillMatrix = ({
  skills,
  experiences,
  experienceHref
}: SkillMatrixProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const rolesOldestFirst = [...experiences].sort(
    (a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime()
  );

  const handleSelectSkill = (skill: string) => {
    dispatch(setSkill(skill));
    router.push(experienceHref);
  };

  return (
    <div className="grid gap-x-12 min-[900px]:grid-cols-2">
      {skills.map(skill => {
        const rolesUsingSkill = getExperiencesUsingSkill(experiences, skill);

        return (
          <button
            key={skill}
            type="button"
            onClick={() => handleSelectSkill(skill)}
            className="group grid w-full cursor-pointer grid-cols-[5.2rem_1fr_1.4rem] items-center gap-[0.6rem] rounded-[10px] border-t border-line px-[0.4rem] py-[0.85rem] text-left transition-colors hover:bg-white/[0.03] min-[521px]:grid-cols-[minmax(6.5rem,9rem)_1fr_2.6rem] min-[521px]:gap-4"
          >
            <span className="text-[0.85rem] font-medium min-[521px]:text-[0.95rem]">
              {skill}
            </span>
            <span
              aria-hidden
              className="grid gap-[3px]"
              style={{
                gridTemplateColumns: `repeat(${rolesOldestFirst.length}, 1fr)`
              }}
            >
              {rolesOldestFirst.map(experience => {
                const isUsed = rolesUsingSkill.includes(experience);

                return (
                  <i
                    key={experience.id}
                    title={`${experience.company}${isUsed ? ' – used' : ''}`}
                    className={
                      isUsed
                        ? 'aspect-square max-w-6 rounded-[4px] bg-brand-gradient shadow-[0_0_10px_-2px_color-mix(in_srgb,var(--brand-2)_60%,transparent)] transition-transform group-hover:-translate-y-0.5'
                        : 'aspect-square max-w-6 rounded-[4px] bg-white/[0.07]'
                    }
                  />
                );
              })}
            </span>
            <span className="text-right font-semibold tabular-nums">
              <span className="sr-only">used in </span>
              {rolesUsingSkill.length}
              <span className="sr-only">
                {' '}
                of {experiences.length} roles. Show those roles.
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SkillMatrix;
