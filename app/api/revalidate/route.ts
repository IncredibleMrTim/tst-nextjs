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

  // 'max' serves the stale copy once while the fresh one is fetched.
  revalidateTag(body._type, 'max');

  return NextResponse.json({ revalidated: body._type });
};
