import { Send } from 'lucide-react';

import { type Profile } from '@/actions/profile.actions';
import { Button } from '@/components/ui/button';
import { CV_URL } from '@/lib/navigation';

interface ClosingCardProps {
  profile: Profile;
}

const ClosingCard = ({ profile }: ClosingCardProps) => (
  <section id="contact" className="pt-[clamp(3rem,7vw,6rem)] pb-12">
    <div className="mx-auto max-w-6xl px-gutter">
      <div className="relative overflow-hidden rounded-[32px] border border-line-strong bg-[radial-gradient(40rem_22rem_at_100%_100%,color-mix(in_srgb,var(--brand-2)_30%,transparent),transparent_70%),linear-gradient(180deg,var(--surface-raised),var(--surface))] p-[clamp(2rem,6vw,4.5rem)]">
        <h2 className="mb-[1.6rem] max-w-[13ch] text-[clamp(2.6rem,7.5vw,6rem)] leading-[0.95] font-bold tracking-[-0.022em]">
          Let’s build something reliable.
        </h2>
        <a
          href={`mailto:${profile.email}`}
          className="border-b-2 border-brand-1 pb-[0.2rem] text-[clamp(1.2rem,3vw,2rem)] font-semibold tracking-[-0.02em] break-words transition-colors hover:text-brand-hover"
        >
          {profile.email}
        </a>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-[1.2rem]">
          <Button asChild variant="brand" size="pill">
            <a href={`mailto:${profile.email}`}>
              Get in touch <Send />
            </a>
          </Button>
          <Button asChild variant="underline" size="text">
            <a href={CV_URL} target="_blank" rel="noopener noreferrer">
              Download CV
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
          <Button asChild variant="underline" size="text">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default ClosingCard;
