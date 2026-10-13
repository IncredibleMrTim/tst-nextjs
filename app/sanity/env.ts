export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-01';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

/**
 * Viewer token that lets the server read unpublished drafts. Optional: without
 * it, preview mode quietly serves published content. Never expose it to the
 * browser.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN;
