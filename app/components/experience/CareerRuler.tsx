import { type Role } from '@/actions/role.actions';
import { formatDateRange } from '@/utils/dateUtils';
import {
  getTimelineBounds,
  getTimelineSpan,
  getTimelineYears,
  getYearPercent
} from '@/utils/experienceUtils';

interface CareerRulerProps {
  experiences: Role[];
  /** Ids of roles to fade out, e.g. those not using the selected skill. */
  dimmedExperienceIds: Set<string>;
  onSelectExperience: (experienceId: string) => void;
}

const CareerRuler = ({
  experiences,
  dimmedExperienceIds,
  onSelectExperience
}: CareerRulerProps) => {
  const bounds = getTimelineBounds(experiences);

  return (
    <>
      <div
        role="group"
        aria-label="Career timeline"
        className="relative mb-[0.4rem] h-[3.4rem] overflow-hidden rounded-[14px] border border-line bg-white/[0.04]"
      >
        {experiences.map(experience => {
          const { left, width } = getTimelineSpan(experience, bounds);
          const range = formatDateRange(experience.fromDate, experience.toDate);

          return (
            <button
              key={experience.id}
              type="button"
              title={`${experience.company}, ${range}`}
              aria-label={`${experience.company}, ${range}. Show role.`}
              onClick={() => onSelectExperience(experience.id)}
              style={{ left: `${left}%`, width: `${width}%` }}
              className={`absolute top-[0.4rem] bottom-[0.4rem] min-w-[7px] cursor-pointer rounded-[7px] bg-brand-gradient shadow-[0_0_0_2px_var(--background)] transition-[opacity,transform] hover:scale-y-[1.12] hover:opacity-100 ${
                dimmedExperienceIds.has(experience.id)
                  ? 'opacity-10'
                  : 'opacity-55 even:opacity-40'
              }`}
            />
          );
        })}
      </div>
      <div
        aria-hidden
        className="relative mb-[1.6rem] h-[1.3rem] text-[0.78rem] text-dim"
      >
        {getTimelineYears(bounds).map((year, index) => (
          <span
            key={year}
            style={{ left: `${getYearPercent(year, bounds)}%` }}
            className={`absolute ${index === 0 ? '' : '-translate-x-1/2'}`}
          >
            {year}
          </span>
        ))}
      </div>
    </>
  );
};

export default CareerRuler;
