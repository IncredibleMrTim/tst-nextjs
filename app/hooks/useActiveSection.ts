'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which page section sits at the middle of the viewport, for the
 * navigation highlight. Returns null until a section has been seen.
 */
export const useActiveSection = (sectionIds: string[]) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const sectionKey = sectionIds.join(',');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSectionId(entry.target.id);
        }),
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sectionKey
      .split(',')
      .map(sectionId => document.getElementById(sectionId))
      .forEach(section => section && observer.observe(section));

    return () => observer.disconnect();
  }, [sectionKey]);

  return activeSectionId;
};
