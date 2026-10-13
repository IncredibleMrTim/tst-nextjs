'use server';

import { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';

export type Profile = Prisma.ProfileGetPayload<{}>;

const PROFILE_ID = 'profile';

const _getProfile = async (): Promise<Profile | null> =>
  prisma.profile.findUnique({ where: { id: PROFILE_ID } });

export const getProfile = unstable_cache(_getProfile, ['profile'], {
  revalidate: 604800,
  tags: ['profile']
});
