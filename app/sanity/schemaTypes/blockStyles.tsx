import type { BlockStyleProps } from "sanity"
import { STYLE_TAGS } from "@/components/portableText/marks"

/**
 * Applies only the visual className via a `<div>`, not the semantic tag —
 * Sanity's default block `children` can itself contain `<div>`-based
 * editing UI, and wrapping that in a real `<h1>`/`<blockquote>` here
 * produces invalid HTML nesting ("<div> cannot be a descendant of <p>")
 * inside the Studio editing canvas. The live frontend still renders real
 * heading/quote tags via `renderBlock` in `@/components/portableText/marks`
 * — this only needs to *look* right in Studio, not be semantically correct
 * there too.
 */
function styleComponent(props: BlockStyleProps) {
  const className = props.value ? STYLE_TAGS[props.value]?.className : undefined
  return <div className={className}>{props.children}</div>
}

/**
 * Shared block styles for `type: "block"` fields. "Normal" must stay first —
 * the Portable Text engine treats the first style as the default a new
 * block resets to after Enter.
 */
export const BLOCK_STYLES = [
  { title: "Normal", value: "normal", component: styleComponent },
  { title: "Heading 1", value: "h1", component: styleComponent },
  { title: "Heading 2", value: "h2", component: styleComponent },
  { title: "Heading 3", value: "h3", component: styleComponent },
  { title: "Heading 4", value: "h4", component: styleComponent },
  { title: "Quote", value: "blockquote", component: styleComponent },
]
