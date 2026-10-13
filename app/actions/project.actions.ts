'use server';

import { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';

export type Project = Prisma.ProjectGetPayload<{}>;

const _getProjects = async (): Promise<Project[]> =>
  prisma.project.findMany({ orderBy: { order: 'asc' } });

export const getProjects = unstable_cache(_getProjects, ['projects'], {
  revalidate: 604800,
  tags: ['projects']
});
