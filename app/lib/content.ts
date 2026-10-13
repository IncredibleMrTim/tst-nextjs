import { getProfile } from '@/actions/profile.actions';

/**
 * Pages can't render without the profile, so fail with a message that says
 * how to fix it instead of a blank page.
 */
export const getRequiredProfile = async () => {
  const profile = await getProfile();

  if (!profile) {
    throw new Error(
      'Profile content not found. Seed it with `yarn db:seed:portfolio`.'
    );
  }

  return profile;
};
