import { ArrowDown, ArrowRight } from 'lucide-react';

import { type Profile } from '@/actions/profile.actions';
import { Button } from '@/components/ui/button';
import HeroTiles, { type HeroStats } from './HeroTiles';
import { PortableText } from '@portabletext/react';
import { PORTABLE_TEXT_COMPONENTS } from '../portableText/marks';

interface HeroProps {
  profile: Profile;
  stats: HeroStats;
}

const Hero = ({ profile, stats }: HeroProps) => {
  const [firstName, ...otherNames] = profile.name.split(' ');

  return (
    <section className="pt-[clamp(3rem,7vw,5.5rem)] pb-[clamp(2.5rem,5vw,4rem)]">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-gutter min-[1000px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <div className="inline-flex max-w-full flex-col items-end gap-[0.45rem]">
            <h1 className="text-[clamp(2.8rem,8.5vw,6.25rem)] leading-[0.95] font-bold tracking-[-0.025em]">
              <span>{firstName}</span>
              <span className="ml-[0.22em]">
                {otherNames.join(' ')}
                <b className="font-bold text-brand-1">.</b>
              </span>
            </h1>
            <p className="text-[clamp(1rem,1.8vw,1.25rem)] font-medium tracking-[0.01em] whitespace-nowrap text-muted-foreground">
              {profile.companyName}
            </p>
          </div>
          <p className="mt-[1.8rem] mb-[0.8rem] text-[clamp(1.2rem,2.2vw,1.6rem)] font-semibold">
            {profile.jobTitle}
          </p>
          {/* A div, not a p: Portable Text renders its own <p>/<div> blocks. */}
          <div className="mb-[1.8rem] max-w-[30rem] text-[1.1rem] text-muted-foreground">
            <PortableText
              value={profile.introduction}
              components={PORTABLE_TEXT_COMPONENTS}
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-[1.15rem] gap-y-4">
            <Button asChild variant="brand" size="pill">
              <a href="#contact">
                Get in touch <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="underline" size="text">
              <a href="#experience">
                View experience <ArrowDown />
              </a>
            </Button>
            <span className="flex gap-[1.15rem]">
              <Button asChild variant="underline" size="text">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
              <Button asChild variant="underline" size="text">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Button>
            </span>
          </div>
        </div>
        <HeroTiles profile={profile} stats={stats} />
      </div>
    </section>
  );
};

export default Hero;
