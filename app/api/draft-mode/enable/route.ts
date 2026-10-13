import { defineEnableDraftMode } from 'next-sanity/draft-mode';

import { client } from '@/sanity/client';
import { readToken } from '@/sanity/env';

// Studio's Presentation tool calls this with a signed secret; the token lets
// the handler verify it before turning draft mode on for that browser.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken })
});
