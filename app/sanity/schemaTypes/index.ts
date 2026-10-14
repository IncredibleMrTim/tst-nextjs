import type { SchemaTypeDefinition } from 'sanity';

import { colorPalette } from './colorPalette';

import { profilePageSchema } from './profile/profilePageSchema';
import { rolesPageSchema } from './roles/rolesPageSchema';

const profileSchemas = [profilePageSchema];
const roleSchemas = [rolesPageSchema];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...profileSchemas, ...roleSchemas, colorPalette]
};
