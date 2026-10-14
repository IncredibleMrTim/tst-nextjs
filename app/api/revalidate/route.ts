import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

interface WebhookBody {
  _type?: string;
}

/**
 * Sanity publish webhook. Content is cached under a tag named after its
 * document type (see `sanityFetch`), so publishing a document refreshes just
 * the queries that read it, without waiting for the weekly revalidate.
 */
export const POST = async (request: NextRequest) => {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: 'SANITY_REVALIDATE_SECRET is not set' },
      { status: 500 }
    );
  }

  const { isValidSignature, body } = await parseBody<WebhookBody>(
    request,
    secret
  );

  if (!isValidSignature) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  if (!body?._type) {
    return NextResponse.json(
      { message: 'Webhook body has no _type; add it to the projection' },
      { status: 400 }
    );
  }

  // expire: 0 drops the cached copy immediately, so the next request waits for
  // fresh content. The 'max' profile would serve the stale copy once first, so
  // the first reload after a publish would still show the old content.
  revalidateTag(body._type, { expire: 0 });

  return NextResponse.json({ revalidated: body._type });
};
