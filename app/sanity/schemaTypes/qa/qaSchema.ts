import { defineArrayMember, defineField, defineType } from 'sanity';
import { portableTextSchema } from '../helpers/portableText';

export const qaSchema = defineType({
  name: 'qa',
  title: 'Question and answer',
  type: 'object',
  fields: [
    portableTextSchema({ name: 'question', title: 'Question' }),
    portableTextSchema({ name: 'answer', title: 'Answer' })
  ]
});

export const qaListSchema = defineType({
  name: 'qaList',
  title: 'Q&A list',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'List heading',
      type: 'string',
      description: 'Heading for this group of questions, e.g. Pricing.'
    }),
    defineField({
      name: 'items',
      title: 'Questions and answers',
      type: 'array',
      of: [defineArrayMember({ type: 'qa' })]
    })
  ],
  preview: {
    select: { heading: 'heading', items: 'items' },
    prepare({ heading, items }: { heading?: string; items?: unknown[] }) {
      return {
        title: heading || 'Untitled list',
        subtitle: `${items?.length ?? 0} questions`
      };
    }
  }
});
