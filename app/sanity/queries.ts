import { defineQuery } from 'next-sanity';

export const profileSectionQuery = defineQuery(`*[_type == "profileSection"][0]{
  profile
}`);

export const rolesSectionQuery = defineQuery(`*[_type == "rolesSection"][0]{
  jobRoles[]{
    _key,
    roleTitle,
    roleCompany,
    roleFrom,
    roleTo,
    rolePresent,
    roleType,
    roleLocation,
    roleSummary,
    roleTechnologies,
    companyLogo
  }
}`);
