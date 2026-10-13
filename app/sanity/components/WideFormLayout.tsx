import type { LayoutProps } from 'sanity';

const FORM_MAX_WIDTH_PX = 1100;

// Sanity caps the document form at a narrow column (about 640px) and offers
// no config option to change it. The cap sits on the form's root container,
// which is the first child of the document scroller. It's matched both by
// that structural selector and by the root's styled-components id
// (`sc-bzgyme-0`), so the rule survives either one changing in a Sanity
// upgrade. Re-check this if the form stops widening after an upgrade.
const WIDE_FORM_CSS = `
  [data-testid="document-panel-scroller"] > :first-child,
  .sc-bzgyme-0 {
    max-width: ${FORM_MAX_WIDTH_PX}px !important;
  }
`;

// Sanity's defaults are 52px between an object's fields and 32px between
// fields inside a fieldset. Neither has a config option, and the elements
// have no stable attribute to select, so they're matched by the readable part
// of Sanity's generated class names: `RootStack-sc-<hash>` (object fields)
// and `ColumnarGrid-sc-<hash>` (fieldsets). Scoped to the document form so
// the rest of the Studio is untouched. Array items open in a dialog rendered
// outside the document panel, so dialogs are matched too. Re-check these
// names after a Sanity upgrade.
const FIELD_GAP_PX = 32;
const FIELDSET_ROW_GAP_PX = 20;

const FIELD_SPACING_CSS = `
  [data-testid="document-panel-scroller"] [class*="RootStack-sc-"],
  [role="dialog"] [class*="RootStack-sc-"] {
    gap: ${FIELD_GAP_PX}px !important;
  }
  [data-testid="document-panel-scroller"] [class*="ColumnarGrid-sc-"],
  [role="dialog"] [class*="ColumnarGrid-sc-"] {
    row-gap: ${FIELDSET_ROW_GAP_PX}px !important;
  }
`;

/**
 * Studio layout that widens the document editor form for long CMS pages and
 * tightens the spacing between its fields.
 */
export function WideFormLayout(props: LayoutProps) {
  return (
    <>
      <style>{WIDE_FORM_CSS + FIELD_SPACING_CSS}</style>
      {props.renderDefault(props)}
    </>
  );
}
