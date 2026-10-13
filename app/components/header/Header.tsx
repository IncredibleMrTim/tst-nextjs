import Link from 'next/link';

import { getProfile } from '@/actions/profile.actions';
import { Button } from '@/components/ui/button';
import { CV_URL } from '@/lib/navigation';
import Navigation from './navigation/Navigation';

const Header = async () => {
  const profile = await getProfile();

  return (
    <header className="sticky top-[0.9rem] z-40 mt-[0.9rem] px-gutter">
      <div className="mx-auto flex max-w-[62rem] items-center gap-4 rounded-full border border-line-strong bg-surface/70 py-2 pr-[0.55rem] pl-[1.2rem] shadow-dock backdrop-blur-[16px] backdrop-saturate-[1.3]">
        <Link
          href="/"
          className="mr-auto flex items-center gap-[0.55rem] text-[1.1rem] font-bold tracking-[-0.01em]"
        >
          <span
            aria-hidden
            className="size-[0.7rem] rounded-full bg-brand-gradient shadow-[0_0_14px_color-mix(in_srgb,var(--brand-2)_80%,transparent)]"
          />
          {profile?.name}
        </Link>
        <Navigation />
        <Button asChild variant="brand" size="dock">
          <a href={CV_URL} target="_blank" rel="noopener noreferrer">
            Download CV
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
