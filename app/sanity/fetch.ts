import 'server-only';

import { draftMode } from 'next/headers';

import { client } from './client';
import { readToken } from './env';

// One week, matching the page revalidation. A Sanity publish webhook can
// refresh sooner by revalidating a tag.
const REVALIDATE_SECONDS = 604800;

/**
 * Runs a GROQ query. Visitors get the published content from Next's data
 * cache, refreshed by `tags` or weekly. When an editor has entered preview
 * (draft mode) it reads unpublished drafts straight from the API instead, so
 * a change shows before it's published.
 */
export const sanityFetch = async <QueryResult>(
  query: string,
  tags: string[]
): Promise<QueryResult> => {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode && readToken) {
    return client
      .withConfig({ token: readToken, useCdn: false, perspective: 'drafts' })
      .fetch<QueryResult>(query, {}, { cache: 'no-store' });
  }

  return client.fetch<QueryResult>(
    query,
    {},
    { next: { revalidate: REVALIDATE_SECONDS, tags } }
  );
};
