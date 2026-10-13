import { ArrowRight } from 'lucide-react';

import { type FeaturedWork } from '@/actions/featuredWork.actions';
import { Button } from '@/components/ui/button';

interface FeaturedWorkCardProps {
  work: FeaturedWork;
  /** Company of the role that produced the result, shown above the description. */
  company: string;
  onReadRole: (experienceId: string) => void;
}

const FeaturedWorkCard = ({
  work,
  company,
  onReadRole
}: FeaturedWorkCardProps) => (
  <article className="tile grid grid-cols-1 overflow-hidden transition-[transform,border-color] hover:-translate-y-[3px] hover:border-brand-2/50 min-[521px]:grid-cols-[minmax(7.5rem,9.5rem)_1fr]">
    <div className="flex flex-row items-baseline gap-[0.7rem] border-b border-line bg-surface-raised bg-[radial-gradient(circle_at_90%_0%,color-mix(in_srgb,var(--brand-2)_40%,transparent),transparent_70%)] p-[1.1rem] justify-end min-[521px]:flex-col min-[521px]:items-stretch min-[521px]:gap-[0.3rem] min-[521px]:border-r min-[521px]:border-b-0">
      <b className="text-[2.1rem] leading-none font-bold tracking-[-0.015em]">
        {work.metric}
      </b>
      <span className="text-[0.8rem] leading-[1.25] text-brand-soft">
        {work.label}
      </span>
    </div>
    <div className="flex flex-col gap-[0.4rem] px-[1.3rem] py-[1.2rem]">
      <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em]">
        {work.title}
      </h3>
      <div className="text-[0.8rem] text-dim">
        {company} · {work.technologies}
      </div>
      <p className="flex-1 text-[0.93rem] text-muted-foreground">
        {work.description}
      </p>
      <div className="mt-2">
        <Button
          variant="inline"
          size="bare"
          onClick={() => onReadRole(work.experienceId)}
        >
          Read the role <ArrowRight />
        </Button>
      </div>
    </div>
  </article>
);

export default FeaturedWorkCard;
