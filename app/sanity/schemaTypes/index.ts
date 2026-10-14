import type { SchemaTypeDefinition } from 'sanity';

import { colorPalette } from './colorPalette';

import { profileSectionSchema } from './profile/profileSectionSchema';
import { rolesSectionSchema } from './roles/rolesSectionSchema';

const profileSchemas = [profileSectionSchema];
const roleSchemas = [rolesSectionSchema];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...profileSchemas, ...roleSchemas, colorPalette]
};
