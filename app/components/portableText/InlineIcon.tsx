import { Icon, type IconNode } from "lucide-react"

// Only drawing elements Lucide icons actually use, since the saved data is
// turned into DOM elements.
const ALLOWED_ELEMENTS = new Set([
  "path",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "rect",
])

/**
 * Icon size presets, relative to the surrounding text so an icon in a
 * heading is still bigger than one in body copy. Shared with the Studio's
 * size field so the editor list and the rendered size can't drift apart.
 */
export const ICON_SIZES = {
  small: { title: "Small", size: "0.75em" },
  default: { title: "Default (matches text)", size: "1em" },
  large: { title: "Large", size: "1.5em" },
  xlarge: { title: "Extra Large", size: "2em" },
  xxlarge: { title: "2X Large", size: "3em" },
} as const

export type IconSizeKey = keyof typeof ICON_SIZES

function resolveIconSize(sizeKey?: string): string {
  return sizeKey && sizeKey in ICON_SIZES
    ? ICON_SIZES[sizeKey as IconSizeKey].size
    : ICON_SIZES.default.size
}

function parseIconNode(rawIconNode?: string): IconNode | undefined {
  if (!rawIconNode) return undefined
  try {
    const parsed: unknown = JSON.parse(rawIconNode)
    if (!Array.isArray(parsed)) return undefined
    // `Icon` renders these as a list and expects a `key` on each; the picker
    // reads the nodes back from the DOM, where keys don't exist.
    return (parsed as IconNode)
      .filter(([tag]) => ALLOWED_ELEMENTS.has(tag))
      .map(([tag, attributes], index) => [
        tag,
        { ...attributes, key: `${tag}-${index}` },
      ])
  } catch {
    return undefined
  }
}

interface InlineIconProps {
  iconNode?: string
  /** Hex from the brand swatch picker; inherits the text color when unset. */
  hex?: string
  /** One of the `ICON_SIZES` keys; falls back to the default. */
  size?: string
}

/** A Lucide icon drawn from the node data saved by the Studio icon picker. */
export function InlineIcon({ iconNode, hex, size }: InlineIconProps) {
  const parsedIconNode = parseIconNode(iconNode)
  if (!parsedIconNode?.length) return null

  return (
    <Icon
      iconNode={parsedIconNode}
      size={resolveIconSize(size)}
      color={hex}
      className="inline-block align-[-0.125em]"
    />
  )
}
