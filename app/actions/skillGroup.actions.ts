'use server';

import { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';

export type SkillGroup = Prisma.SkillGroupGetPayload<{}>;

const _getSkillGroups = async (): Promise<SkillGroup[]> =>
  prisma.skillGroup.findMany({ orderBy: { order: 'asc' } });

export const getSkillGroups = unstable_cache(
  _getSkillGroups,
  ['skill-groups'],
  {
    revalidate: 604800,
    tags: ['skill-groups']
  }
);
