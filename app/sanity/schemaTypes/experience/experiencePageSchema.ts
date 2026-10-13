import { defineType, defineField, defineArrayMember } from 'sanity';

import { imageSchema } from '../imageSchema';
import { RoleDatesInput } from './RoleDatesInput';
import { RolePreview } from './RolePreview';

const MONTH_YEAR_FORMAT = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  // Date fields are plain YYYY-MM-DD, which parse as UTC midnight.
  timeZone: 'UTC'
});

/** Formats a Sanity date string as e.g. "Oct 2026"; undefined if unset. */
const formatMonthYear = (date?: string) =>
  date ? MONTH_YEAR_FORMAT.format(new Date(date)) : undefined;

export const experiencePageSchema = defineType({
  name: 'experiencePage',
  title: 'Experience',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Experience Page' };
    }
  },

  fields: [
    defineField({
      name: 'jobRoles',
      title: 'Job Roles',
      type: 'array',

      of: [
        defineArrayMember({
          name: 'role',
          title: 'Role',
          type: 'object',
          components: { input: RoleDatesInput, preview: RolePreview },
          // Without this Sanity labels each role with its first string field
          // (the role title); lead with the company so the list scans by employer,
          // with the role title beneath and the date range on the right (drawn
          // by RolePreview).
          preview: {
            select: {
              title: 'roleCompany',
              roleTitle: 'roleTitle',
              roleFrom: 'roleFrom',
              roleTo: 'roleTo',
              rolePresent: 'rolePresent'
            },
            prepare({ title, roleTitle, roleFrom, roleTo, rolePresent }) {
              const dateRange = [
                formatMonthYear(roleFrom),
                rolePresent ? 'Present' : formatMonthYear(roleTo)
              ]
                .filter(Boolean)
                .join(' – ');

              return { title, subtitle: roleTitle, dateRange };
            }
          },
          fieldsets: [
            {
              name: 'dates',
              title: 'Role Start/End Dates',
              options: { columns: 3 }
            },
            { name: 'companyDetails', title: 'Company Details' }
          ],
          fields: [
            defineField({
              name: 'roleTitle',
              title: 'Role Title',
              type: 'string',
              validation: val => val.required()
            }),
            defineField({
              name: 'roleFrom',
              title: 'From Date',
              type: 'date',
              fieldset: 'dates',
              validation: val => val.required()
            }),
            defineField({
              name: 'roleTo',
              title: 'To Date',
              type: 'date',
              fieldset: 'dates',
              // A hidden required field would block publishing, so only
              // require it while the role has ended.
              validation: rule =>
                rule.custom((value, { parent }) =>
                  (parent as { rolePresent?: boolean } | undefined)
                    ?.rolePresent || value
                    ? true
                    : 'Required unless this is your current role'
                )
            }),
            defineField({
              name: 'rolePresent',
              title: 'Present',
              type: 'boolean',
              fieldset: 'dates'
            }),
            defineField({
              name: 'roleCompany',
              title: 'Company',
              type: 'string',
              fieldset: 'companyDetails',
              validation: val => val.required()
            }),
            imageSchema({
              name: 'companyLogo',
              title: 'Company Logo',
              fieldset: 'companyDetails'
            }),
            defineField({
              name: 'roleType',
              title: 'Engagement Type',
              description:
                'Shown beside the company, e.g. Contract. Leave blank for permanent roles.',
              type: 'string'
            }),
            defineField({
              name: 'roleLocation',
              title: 'Location',
              type: 'string'
            }),
            defineField({
              name: 'roleSummary',
              title: 'Summary',
              description: 'One bullet per line, each starting with "- ".',
              type: 'text',
              rows: 8
            }),
            defineField({
              name: 'roleTechnologies',
              title: 'Technologies',
              description: 'Drives the role tags and the skill usage counts.',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
              options: { layout: 'tags' }
            })
          ]
        })
      ]
    })
  ]
});
