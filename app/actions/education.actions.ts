'use server';

import { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';

export type Education = Prisma.EducationGetPayload<{}>;

const _getEducation = async (): Promise<Education[]> =>
  prisma.education.findMany({ orderBy: { order: 'asc' } });

export const getEducation = unstable_cache(_getEducation, ['education'], {
  revalidate: 604800,
  tags: ['education']
});
