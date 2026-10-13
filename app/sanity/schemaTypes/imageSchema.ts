import { defineField } from 'sanity';
import { TSanitySchema } from './types';
import { portableTextSchema } from './helpers/portableText';

// Exported separately so array schemas can reuse the same fields as an
// array member without nesting an object inside another object.
export const imageFields = [
  defineField({
    name: 'imageName',
    title: 'Image Title',
    type: 'string',
    validation: rule => rule.required()
  }),
  defineField({
    name: 'imageAlt',
    title: 'Image Alt Text',
    description:
      'Describe the image for screen readers. Although this is optional, it helps with Search Engine Optimisation (SEO).',
    type: 'string'
  }),

  defineField({
    name: 'anchor',
    title: 'Image Anchor (Optional)',
    description:
      'Adds and image anchor that can be used to jump to this image on link or button click.',
    type: 'string'
  }),
  defineField({
    name: 'imageFile',
    title: 'Image',
    type: 'image',
    options: { hotspot: true },
    validation: rule => rule.required()
  })
];

// The inner fields are only validated once the object exists, so an unset
// optional image doesn't raise errors; isRequired makes the image itself
// mandatory.
export const imageSchema = ({
  name,
  title,
  description,
  group,
  fieldset,
  isRequired = false
}: TSanitySchema = {}) =>
  defineField({
    name: name ?? 'image',
    title,
    description,
    group,
    fieldset,
    type: 'object',
    fields: imageFields,
    validation: isRequired ? rule => rule.required() : undefined
  });
