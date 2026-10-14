import { defineQuery } from 'next-sanity';

export const profilePageQuery = defineQuery(`*[_type == "profilePage"][0]{
  profile
}`);

export const rolesPageQuery = defineQuery(`*[_type == "rolesPage"][0]{
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
