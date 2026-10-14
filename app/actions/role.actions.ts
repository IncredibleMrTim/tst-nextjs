import 'server-only';

import { sanityFetch } from '@/sanity/fetch';
import { urlForImage } from '@/sanity/image';
import { rolesSectionQuery } from '@/sanity/queries';
import type { RolesSectionQueryResult } from '@/sanity/types';

// The logo tile is about 120px wide; 360 covers 3x screens.
const LOGO_WIDTH_PX = 360;

type JobRole = NonNullable<
  NonNullable<RolesSectionQueryResult>['jobRoles']
>[number];

export interface Role {
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
const toRole = (jobRole: JobRole): Role => ({
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
export const getRoles = async (): Promise<Role[]> => {
  const rolesSection = await sanityFetch<RolesSectionQueryResult>(
    rolesSectionQuery,
    ['rolesSection']
  );

  return (rolesSection?.jobRoles ?? [])
    .map(toRole)
    .sort((a, b) => b.fromDate.getTime() - a.fromDate.getTime());
};
