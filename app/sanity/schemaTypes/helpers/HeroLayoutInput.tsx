import { useEffect, useRef } from "react"
import { set, unset, type ObjectInputProps } from "sanity"

const SPLIT_LAYOUT_RULE = ":root { --hero-content-width: 28%; }"

// Matches a :root rule whose only declaration is --hero-content-width, so
// any other :root rules an editor has written are left alone.
const HERO_WIDTH_RULE_PATTERN =
  /:root\s*\{\s*--hero-content-width\s*:[^;}]*;?\s*\}\s*/g

interface CustomCssValue {
  _type?: string
  language?: string
  code?: string
}

/**
 * Returns the CSS with the split-layout width rule added (`hasFullLayout`
 * false) or stripped (`hasFullLayout` true).
 */
function applyHeroWidthRule(code: string, hasFullLayout: boolean): string {
  const withoutRule = code.replace(HERO_WIDTH_RULE_PATTERN, "").trim()
  if (hasFullLayout) return withoutRule
  return withoutRule
    ? `${SPLIT_LAYOUT_RULE}\n\n${withoutRule}`
    : SPLIT_LAYOUT_RULE
}

/**
 * Object input for the hero that keeps customCss in step with the "full
 * hero layout" toggle: the split layout needs a narrower text column,
 * which is set through the --hero-content-width variable.
 *
 * This lives on the hero object rather than on the toggle because a
 * field's input can only patch itself — field-level changes are prefixed
 * with the field name — while the object's own onChange is relative to
 * the hero, so it can reach the sibling customCss field.
 */
export function HeroLayoutInput(props: ObjectInputProps) {
  const { onChange, readOnly, renderDefault } = props
  const value = props.value as
    { floating?: boolean; customCss?: CustomCssValue } | undefined
  const hasFullLayout = value?.floating
  const previousHasFullLayout = useRef(hasFullLayout)
  const currentCss = useRef(value?.customCss)
  const customCss = value?.customCss

  useEffect(() => {
    currentCss.current = customCss
  }, [customCss])

  useEffect(() => {
    const hasToggled = previousHasFullLayout.current !== hasFullLayout
    previousHasFullLayout.current = hasFullLayout
    // Only react to the editor flipping the toggle, not to the document
    // first loading (undefined -> value) or to read-only views.
    if (!hasToggled || readOnly || typeof hasFullLayout !== "boolean") return

    const css = currentCss.current
    const code = applyHeroWidthRule(css?.code ?? "", hasFullLayout)
    onChange(
      code
        ? set({ ...css, _type: "code", language: "css", code }, ["customCss"])
        : unset(["customCss"]),
    )
  }, [hasFullLayout, onChange, readOnly])

  return renderDefault(props)
}
