import { defineArrayMember, defineField, defineType } from 'sanity';

import { portableTextSchema } from '../helpers/portableText';

export const qaPage = defineType({
  name: 'qaPage',
  title: 'Q&A Page',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Q&A Page' };
    }
  },

  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'qa', title: 'Q&A' }
  ],
  fields: [
    defineField({
      name: 'qaListsHeading',
      type: 'string',
      title: 'Q&A Lists Heading',
      description: 'Heading displayed over the Q&A lists',
      group: 'qa'
    }),
    defineField({
      name: 'qaLists',
      type: 'array',
      title: 'Q&A Lists',
      description: 'Add a list, then add questions and answers inside it.',
      group: 'qa',
      of: [defineArrayMember({ type: 'qaList' })]
    }),

    portableTextSchema({ name: 'content', title: 'Content', group: 'content' })
  ]
});
