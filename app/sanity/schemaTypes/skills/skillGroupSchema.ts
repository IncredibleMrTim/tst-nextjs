import { defineArrayMember, defineField, defineType } from 'sanity';

export const skillGroupSchema = defineType({
  name: 'skillGroup',
  title: 'Skill group',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Group name',
      description: 'Heading for this group of skills, e.g. Frontend.',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      description: 'Press enter after each skill.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      validation: rule => rule.required().min(1)
    })
  ],
  preview: {
    select: { name: 'name', skills: 'skills' },
    prepare({ name, skills }: { name?: string; skills?: string[] }) {
      return {
        title: name || 'Untitled group',
        subtitle: `${skills?.length ?? 0} skills`
      };
    }
  }
});
