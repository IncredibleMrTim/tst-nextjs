import type { StructureResolver } from 'sanity/structure';

import { ContentListPane, type ContentListItem } from './ContentListPane';

// Each entry is a singleton (a single editable document, not a list of
// documents) since there's exactly one of each. Add a `description` to show
// a short line under the title in the Content list.
const CONTENT_ITEMS: ContentListItem[] = [
  { id: 'profilePage', title: 'Profile', schemaType: 'profilePage' },
  { id: 'experiencePage', title: 'Experience', schemaType: 'experiencePage' },

  { id: 'colorPalette', title: 'Custom Colors', schemaType: 'colorPalette' }
];

export const structure: StructureResolver = S =>
  S.component(ContentListPane)
    .id('content')
    .title('Content')
    .options({ items: CONTENT_ITEMS })
    .child(childId => {
      const item = CONTENT_ITEMS.find(({ id }) => id === childId);
      return S.document()
        .schemaType(item?.schemaType ?? childId)
        .documentId(childId);
    });
