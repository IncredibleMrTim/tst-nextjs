'use server';

import { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';

export type FeaturedWork = Prisma.FeaturedWorkGetPayload<{}>;

const _getFeaturedWork = async (): Promise<FeaturedWork[]> =>
  prisma.featuredWork.findMany({ orderBy: { order: 'asc' } });

export const getFeaturedWork = unstable_cache(
  _getFeaturedWork,
  ['featured-work'],
  {
    revalidate: 604800,
    tags: ['featured-work']
  }
);
