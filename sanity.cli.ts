import { defineCliConfig } from 'sanity/cli';

import { dataset, projectId } from '@/sanity/env';

export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    path: './app/**/*.{ts,tsx}',
    schema: './schema.json',
    generates: './app/sanity/types.ts'
  }
});
