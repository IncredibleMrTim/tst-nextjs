import type { SchemaTypeDefinition } from 'sanity';

import { colorPalette } from './colorPalette';

import { profileSectionSchema } from './profile/profileSectionSchema';
import { rolesSectionSchema } from './roles/rolesSectionSchema';
import { skillsSectionSchema } from './skills/skillsSectionSchema';
import { skillGroupSchema } from './skills/skillGroupSchema';

const profileSchemas = [profileSectionSchema];
const roleSchemas = [rolesSectionSchema];
const skillSchemas = [skillsSectionSchema, skillGroupSchema];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...profileSchemas, ...roleSchemas, ...skillSchemas, colorPalette]
};
