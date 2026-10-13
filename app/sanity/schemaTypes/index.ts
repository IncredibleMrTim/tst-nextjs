import type { SchemaTypeDefinition } from 'sanity';

import { colorPalette } from './colorPalette';

import { profilePageSchema } from './profile/profilePageSchema';
import { experiencePageSchema } from './experience/experiencePageSchema';

const profileSchemas = [profilePageSchema];
const experienceSchemas = [experiencePageSchema];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...profileSchemas, ...experienceSchemas, colorPalette]
};
