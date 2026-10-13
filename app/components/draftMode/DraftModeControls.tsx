import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';

/**
 * Shown only while an editor is previewing drafts: keeps Studio's Presentation
 * tool in sync with the page and offers a way back to the published site.
 */
const DraftModeControls = async () => {
  const { isEnabled: isDraftMode } = await draftMode();

  if (!isDraftMode) return null;

  return (
    <>
      <VisualEditing />
      <a
        href="/api/draft-mode/disable"
        className="fixed right-4 bottom-4 z-50 rounded-full bg-brand-1 px-4 py-2 text-sm font-semibold text-background shadow-lg"
      >
        Exit preview
      </a>
    </>
  );
};

export default DraftModeControls;
