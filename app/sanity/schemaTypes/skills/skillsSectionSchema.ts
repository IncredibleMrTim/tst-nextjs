import { defineArrayMember, defineField, defineType } from 'sanity';

export const skillsSectionSchema = defineType({
  name: 'skillsSection',
  title: 'Skills',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Skills Section' };
    }
  },

  fields: [
    defineField({
      name: 'skillGroups',
      title: 'Skill Groups',
      description: 'Add a group, then add the skills inside it.',
      type: 'array',
      of: [defineArrayMember({ type: 'skillGroup' })]
    })
  ]
});
