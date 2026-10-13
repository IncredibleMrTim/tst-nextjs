import Link from 'next/link';

import { getProfile } from '@/actions/profile.actions';

const Footer = async () => {
  const profile = await getProfile();

  return (
    <footer className="pt-6 pb-10 text-[0.88rem] text-dim">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-x-8 gap-y-4 px-gutter">
        <span>© {profile?.companyName}</span>
        <Link
          href="#top"
          className="text-muted-foreground transition-colors hover:text-white"
        >
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
