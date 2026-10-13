import lodash from "lodash"

interface ToPlainTextBlock {
  _type: string
  children?: Array<{ text?: string }>
}

export const toPlainText = (
  blocks: ToPlainTextBlock[] = [],
  length = 100,
): string =>
  blocks
    .map((block) =>
      block._type !== "block" || !block.children
        ? ""
        : block.children
            .map(
              (child) =>
                lodash.truncate(child.text ?? "", {
                  length,
                }) ?? "",
            )
            .join(""),
    )
    .join(" ")

// Raw-text elements like <style> end at the literal "</style" substring regardless of
// escaping, so any match here is a potential tag-breakout/script-injection attempt.
// Rejecting outright (rather than stripping) avoids the bypass risk of partial regex edits.
const DANGEROUS_CSS_PATTERNS = [
  /<\/style/i,
  /@import/i,
  /expression\s*\(/i,
  /-moz-binding/i,
  /url\(\s*['"]?\s*(javascript|data):/i,
]

/**
 * Guards against CSS injection from Sanity's freeform `customCss` field by
 * rejecting the entire value if it contains a known-dangerous construct.
 */
export const sanitizeCustomCss = (css?: string | null): string => {
  if (!css) return ""
  return DANGEROUS_CSS_PATTERNS.some((pattern) => pattern.test(css)) ? "" : css
}
