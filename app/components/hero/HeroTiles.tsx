import Image from 'next/image';

import { type Profile } from '@/actions/profile.actions';
import { cn } from '@/lib/utils';

export interface HeroStats {
  yearsInSoftware: number;
  roleCount: number;
  technologyCount: number;
}

interface HeroTilesProps {
  profile: Profile;
  stats: HeroStats;
}

interface StatTileProps {
  value: string;
  label: string;
  className?: string;
}

const tileLayoutClassName =
  'relative flex min-h-[8.6rem] flex-col justify-between overflow-hidden px-[1.2rem] py-[1.1rem]';
const tileClassName = `tile ${tileLayoutClassName}`;

const StatTile = ({ value, label, className }: StatTileProps) => (
  <div className={cn(tileClassName, className)}>
    <div className="text-[clamp(1.7rem,2.9vw,2.35rem)] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap">
      {value}
    </div>
    <small className="text-[0.85rem] leading-[1.35] whitespace-pre-line text-muted-foreground">
      {label}
    </small>
  </div>
);

const HeroTiles = ({ profile, stats }: HeroTilesProps) => (
  <div className="grid grid-cols-6 gap-[0.8rem]">
    <div
      className={cn(
        tileClassName,
        'col-span-6 flex-row flex-wrap items-center justify-start gap-4 min-[521px]:col-span-4'
      )}
    >
      <Image
        src="/images/profile-sm.jpg"
        alt={profile.name}
        width={144}
        height={166}
        priority
        unoptimized
        className="size-[4.6rem] flex-none rounded-full border-2 border-white/85 object-cover"
      />
      <div className="min-w-[9rem] flex-1">
        <b className="block text-[1.25rem] font-semibold">{profile.name}</b>
        <span className="text-[0.9rem] text-muted-foreground">
          {profile.jobTitle}
        </span>
      </div>
      <ul className="flex basis-full flex-wrap gap-[0.35rem]">
        {profile.heroSkills.map(skill => (
          <li
            key={skill}
            className="rounded-full bg-brand-2/[0.14] px-[0.6rem] py-[0.12rem] text-[0.78rem] text-brand-soft"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>

    <StatTile
      value={`${stats.yearsInSoftware}+`}
      label={'Years in\nsoftware'}
      className="col-span-3 min-[521px]:col-span-2"
    />
    <StatTile
      value={profile.highlightMetric}
      label={profile.highlightLabel}
      className="col-span-3 min-[521px]:col-span-2"
    />

    <div
      className={cn(
        tileLayoutClassName,
        "col-span-6 rounded-tile bg-brand-gradient text-on-brand shadow-brand-glow after:absolute after:-right-12 after:-bottom-16 after:box-content after:size-48 after:rounded-full after:border-[2.5rem] after:border-white/[0.14] after:content-[''] min-[521px]:col-span-4"
      )}
    >
      <div className="flex items-center gap-2 text-[0.82rem] font-semibold">
        <span
          aria-hidden
          className="size-[0.55rem] animate-pulse-ring rounded-full bg-current shadow-[0_0_0_0_currentColor]"
        />
        Building now
      </div>
      <div>
        <p className="mt-2 max-w-80 text-[1.3rem] leading-[1.2] font-semibold tracking-[-0.01em]">
          {profile.currentProjectTitle}
        </p>
        <small className="mt-2 block text-[0.85rem] leading-[1.35] font-medium text-on-brand/80">
          {profile.currentProjectTechnologies}
        </small>
      </div>
    </div>

    <StatTile
      value={String(stats.roleCount)}
      label="Professional roles"
      className="col-span-3"
    />
    <StatTile
      value={String(stats.technologyCount)}
      label="Technologies used"
      className="col-span-3"
    />
  </div>
);

export default HeroTiles;
