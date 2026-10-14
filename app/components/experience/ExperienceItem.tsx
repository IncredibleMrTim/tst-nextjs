import { type Role } from '@/actions/role.actions';
import CompanyLogo from '@/components/companyLogo/CompanyLogo';
import TagList from '@/components/common/TagList';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { formatDateRange, formatDuration } from '@/utils/dateUtils';
import { getRoleMonths, getSummaryBullets } from '@/utils/experienceUtils';

interface ExperienceItemProps {
  experience: Role;
  isDimmed: boolean;
  highlightedSkill: string | null;
}

const activeDotClassName =
  'before:border-brand-1 before:bg-brand-1 before:shadow-[0_0_0_5px_color-mix(in_srgb,var(--brand-2)_18%,transparent)]';

const ExperienceItem = ({
  experience,
  isDimmed,
  highlightedSkill
}: ExperienceItemProps) => {
  const isCurrent = !experience.toDate;

  return (
    <AccordionItem
      value={experience.id}
      id={`role-${experience.id}`}
      className={cn(
        // The dot sits on the timeline rail to the left of the item
        "relative rounded-tile border-b-0 transition-[background-color,opacity] duration-200 before:absolute before:top-[1.55rem] before:left-[calc(-1.8rem-6px)] before:box-content before:size-[11px] before:rounded-full before:border-2 before:border-dim before:bg-background before:transition-all before:content-[''] data-[state=open]:bg-surface/80 data-[state=open]:before:border-brand-1 data-[state=open]:before:bg-brand-1 data-[state=open]:before:shadow-[0_0_0_5px_color-mix(in_srgb,var(--brand-2)_18%,transparent)]",
        isCurrent && activeDotClassName,
        isDimmed && 'opacity-30'
      )}
    >
      <AccordionTrigger
        className="grid cursor-pointer grid-cols-[1fr_auto] items-center gap-x-[0.8rem] gap-y-[0.7rem] rounded-tile px-[0.9rem] py-4 text-left text-[1.04rem] leading-[1.6] font-normal hover:bg-white/[0.03] hover:no-underline min-[561px]:grid-cols-[auto_1fr_auto] min-[561px]:gap-x-[1.1rem] min-[561px]:gap-y-[0.2rem] min-[561px]:px-[1.2rem] min-[561px]:py-[1.1rem]"
        iconClassName="size-8 rounded-full border border-line-strong stroke-[1.7] p-[0.39rem] text-foreground max-[560px]:col-start-2 max-[560px]:row-start-1"
      >
        <CompanyLogo
          logoUrl={experience.logoUrl}
          company={experience.company}
          className="max-[560px]:col-start-1 max-[560px]:row-start-1 max-[560px]:justify-self-start"
        />
        <span className="block max-[560px]:col-span-full max-[560px]:row-start-2">
          <span className="block text-[0.85rem] font-medium text-brand-1 tabular-nums">
            {formatDateRange(experience.fromDate, experience.toDate)} ·{' '}
            {formatDuration(getRoleMonths(experience))}
          </span>
          <strong className="block text-[1.3rem] font-semibold tracking-[-0.015em]">
            {experience.role}
            {isCurrent && (
              <span className="ml-[0.6rem] inline-block rounded-full border border-brand-2/40 px-[0.55rem] py-[0.05rem] align-middle text-[0.93rem] font-semibold tracking-normal text-muted-foreground">
                Current
              </span>
            )}
          </strong>
          <span className="block">
            <span className="text-[0.93rem] font-normal text-muted-foreground">
              {experience.company}
              {experience.type && ` · ${experience.type}`}
            </span>
          </span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-[1.2rem] pb-[1.4rem] text-[1.04rem] leading-[1.6] min-[700px]:pl-[calc(1.2rem+7.4rem+1.1rem)]">
        <ul className="mb-4 grid max-w-[46rem] gap-2 text-[0.97rem] text-foreground/85">
          {getSummaryBullets(experience.summary).map(bullet => (
            <li
              key={bullet}
              className="relative pl-[1.2rem] before:absolute before:top-[0.72em] before:left-0 before:h-[1.5px] before:w-2 before:bg-brand-1 before:content-['']"
            >
              {bullet}
            </li>
          ))}
        </ul>
        <TagList
          tags={experience.technologies}
          label="Technologies"
          highlightedTag={highlightedSkill}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

export default ExperienceItem;
