'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useActiveSection } from '@/hooks/useActiveSection';
import { navigationItems, type NavigationItem } from '@/lib/navigation';

const sectionIds = navigationItems.map(item => item.sectionId);

/**
 * Links jump to a section on the home page. On a section's own route (for
 * example /experience) they link to that route, or back to the home section.
 */
export const getNavigationHref = (item: NavigationItem, isHome: boolean) => {
  if (isHome) return `#${item.sectionId}`;
  return item.route ?? `/#${item.sectionId}`;
};

const Navigation = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const activeSectionId = useActiveSection(isHome ? sectionIds : []);

  const getIsActive = (item: NavigationItem) =>
    isHome ? activeSectionId === item.sectionId : item.route === pathname;

  return (
    <nav aria-label="Main" className="hidden gap-[0.2rem] min-[821px]:flex">
      {navigationItems.map(item => (
        <Link
          key={item.sectionId}
          href={getNavigationHref(item, isHome)}
          aria-current={getIsActive(item) ? 'true' : undefined}
          className="rounded-full px-[0.9rem] py-[0.45rem] text-[0.9rem] text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-white aria-[current=true]:bg-brand-2/[0.16] aria-[current=true]:text-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
