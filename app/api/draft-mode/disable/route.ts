import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

/** Leaves preview mode and returns to the published site. */
export const GET = async (request: Request) => {
  (await draftMode()).disable();

  return NextResponse.redirect(new URL('/', request.url));
};
