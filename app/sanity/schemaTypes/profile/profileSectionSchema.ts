import { defineType, defineField } from 'sanity';
import { portableTextSchema } from '../helpers/portableText';

export const profileSectionSchema = defineType({
  name: 'profileSection',
  title: 'Profile',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Profile Section' };
    }
  },
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'otherNames', title: 'Other Names', type: 'string' }),
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({ name: 'jobTitle', title: 'Job Title', type: 'string' }),
    portableTextSchema({ name: 'introduction', title: 'Introduction' }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' })
  ]
});
