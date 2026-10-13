import 'server-only';

import { sanityFetch } from '@/sanity/fetch';
import { urlForImage } from '@/sanity/image';
import { experiencePageQuery } from '@/sanity/queries';
import type { ExperiencePageQueryResult } from '@/sanity/types';

// The logo tile is about 120px wide; 360 covers 3x screens.
const LOGO_WIDTH_PX = 360;

type JobRole = NonNullable<
  NonNullable<ExperiencePageQueryResult>['jobRoles']
>[number];

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string | null;
  /** Markdown bullet list ("- one\n- two"). */
  summary: string | null;
  fromDate: Date;
  toDate: Date | null;
  /** Engagement type shown beside the company, e.g. "Contract". */
  type: string | null;
  /** CDN URL of the uploaded company logo; null falls back to initials. */
  logoUrl: string | null;
  technologies: string[];
}

const getLogoUrl = (companyLogo: JobRole['companyLogo']): string | null =>
  companyLogo?.imageFile?.asset
    ? urlForImage(companyLogo.imageFile)
        .width(LOGO_WIDTH_PX)
        .fit('max')
        .auto('format')
        .url()
    : null;

/**
 * Maps a Studio role to the shape the components read. A role marked Present
 * has no end date, however an old To Date may linger in the document.
 */
const toExperience = (jobRole: JobRole): Experience => ({
  id: jobRole._key,
  role: jobRole.roleTitle,
  company: jobRole.roleCompany,
  location: jobRole.roleLocation,
  summary: jobRole.roleSummary,
  fromDate: new Date(jobRole.roleFrom),
  toDate:
    jobRole.rolePresent || !jobRole.roleTo ? null : new Date(jobRole.roleTo),
  type: jobRole.roleType,
  logoUrl: getLogoUrl(jobRole.companyLogo),
  technologies: jobRole.roleTechnologies ?? []
});

/**
 * Most recent role first, matching how the experience timeline reads.
 */
export const getExperiences = async (): Promise<Experience[]> => {
  const experiencePage = await sanityFetch<ExperiencePageQueryResult>(
    experiencePageQuery,
    ['experiencePage']
  );

  return (experiencePage?.jobRoles ?? [])
    .map(toExperience)
    .sort((a, b) => b.fromDate.getTime() - a.fromDate.getTime());
};
