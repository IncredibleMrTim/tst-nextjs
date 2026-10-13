import { defineQuery } from 'next-sanity';

export const profilePageQuery = defineQuery(`*[_type == "profilePage"][0]{
  profile
}`);

export const experiencePageQuery = defineQuery(`*[_type == "experiencePage"][0]{
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
