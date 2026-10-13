import type { ElementType, ReactNode } from "react"
import type { PortableTextComponents } from "@portabletext/react"
import NextImage from "next/image"
import type { Image as SanityImage } from "sanity"
import { getImageDimensions, urlForImage } from "@/sanity/image"
import { InlineIcon } from "./InlineIcon"

/**
 * Single source of truth for how each custom Portable Text mark renders.
 * Consumed both by the real frontend (`@portabletext/react`) and by the
 * per-decorator/annotation/style `component` overrides wired up in
 * `helpers/portableText.tsx` and `blockStyles.tsx`, so the Studio editing
 * canvas and the live frontend can never drift out of sync.
 */

type MarkProps = { children: ReactNode }

export function SmallMark({ children }: MarkProps) {
  return <span className="text-sm">{children}</span>
}

export function MediumMark({ children }: MarkProps) {
  return <span className="text-2xl">{children}</span>
}

export function LargeMark({ children }: MarkProps) {
  return <span className="text-4xl">{children}</span>
}

export function AccentMark({ children }: MarkProps) {
  return <span style={{ color: "var(--accent)" }}>{children}</span>
}

/**
 * Portable Text has no block-level alignment field — `type: "block"` doesn't
 * accept custom `fields` (Sanity schema validation rejects it outright). The
 * documented workaround (see Sanity's "Align Text with Block Content" guide)
 * is a decorator applied to the block's full text selection, rendered as a
 * `w-full` block so `text-align` visually spans the whole line rather than
 * just the selected span. Only one alignment decorator should be applied to
 * a given selection at a time — nothing enforces that mutual exclusivity.
 */
export function LeftAlignMark({ children }: MarkProps) {
  return <div className="w-full text-left">{children}</div>
}

export function CenterAlignMark({ children }: MarkProps) {
  return <div className="w-full text-center">{children}</div>
}

export function RightAlignMark({ children }: MarkProps) {
  return <div className="w-full text-right">{children}</div>
}

/**
 * Heading-*looking* marks, not semantic headings — Portable Text's `style`
 * field is block-only, so there's no way to make part of a paragraph a real
 * `<h1>`. These give editors the same visual weight on an arbitrary text
 * selection via an inline `<span>`, sized to match the block-level heading
 * styles (see `STYLE_TAGS` below).
 */
export function Heading1Mark({ children }: MarkProps) {
  return <span className="text-4xl font-bold">{children}</span>
}

export function Heading2Mark({ children }: MarkProps) {
  return <span className="text-3xl font-bold">{children}</span>
}

export function Heading3Mark({ children }: MarkProps) {
  return <span className="text-2xl font-bold">{children}</span>
}

export function Heading4Mark({ children }: MarkProps) {
  return <span className="text-xl font-bold">{children}</span>
}

/**
 * `@portabletext/editor` ships no built-in decorator styling at all ("the
 * engine applies no decorator markup of its own") — unlike `@portabletext/react`,
 * which already renders these natively on the frontend. These exist only to
 * give the Studio editing canvas the same visual feedback for the standard
 * marks that the bundled editor would normally provide for free.
 */
export function StrongMark({ children }: MarkProps) {
  return <strong className="font-bold">{children}</strong>
}

export function EmMark({ children }: MarkProps) {
  return <em>{children}</em>
}

export function UnderlineMark({ children }: MarkProps) {
  return <span className="underline">{children}</span>
}

export function CodeMark({ children }: MarkProps) {
  return (
    <code className="rounded bg-black/10 px-1 font-mono text-sm">
      {children}
    </code>
  )
}

export function StrikeMark({ children }: MarkProps) {
  return <span className="line-through">{children}</span>
}

export function ColorMark({ children, hex }: MarkProps & { hex?: string }) {
  return hex ? <span style={{ color: hex }}>{children}</span> : <>{children}</>
}

/**
 * Tag/className for each `block.style` value. Shared by the Studio editing
 * canvas and the live frontend so headings/quotes look the same in both
 * places.
 */
export const STYLE_TAGS: Record<string, { tag: string; className: string }> = {
  h1: { tag: "h1", className: "text-4xl font-bold" },
  h2: { tag: "h2", className: "text-3xl font-bold" },
  h3: { tag: "h3", className: "text-2xl font-bold" },
  h4: { tag: "h4", className: "text-xl font-bold" },
  h5: { tag: "h5", className: "text-lg font-bold" },
  h6: { tag: "h6", className: "text-base font-bold" },
  blockquote: {
    tag: "blockquote",
    className: "border-l-2 pl-4 italic opacity-80",
  },
}

/**
 * Every block gets bottom spacing regardless of style — otherwise adjacent
 * paragraphs (and the blank-line blocks editors use as spacers) collapse
 * to zero gap under Tailwind's preflight reset. This has to be `padding`,
 * not `margin`: adjacent block-level elements' vertical margins collapse
 * to the larger one instead of summing, so stacking several empty spacer
 * blocks in the Studio (to add extra vertical space) would still render
 * as a single ~0.5em gap. Padding doesn't collapse, so each blank block an
 * editor adds contributes its own space, matching what they see in Studio.
 *
 * `whitespace-pre-line` matters here too: editors press Enter mid-block
 * (soft line break) rather than always starting a new block, which the
 * editor stores as a literal "\n"/"\n\n" inside the span text rather than
 * a dedicated break node. The Studio's `contenteditable` canvas renders
 * that whitespace for free; a plain rendered `<p>` collapses it under
 * normal CSS whitespace handling, so line breaks silently disappear.
 *
 * `min-h-[1lh]` covers the other spacer case: pressing Enter to start a
 * whole new (empty) block, rather than a soft line break inside one. That
 * block's only span has `text: ""` — an empty string renders no text node
 * at all, so a plain `<p>` with no content doesn't establish a line box
 * and collapses to zero height, leaving only the `pb-[0.5em]` as its
 * visible gap. That's much smaller than the full blank line the Studio's
 * own canvas shows for it. Reserving one line's height keeps an empty
 * block's frontend footprint matching what the editor sees while typing.
 */
export function renderBlock(style: string | undefined, children: ReactNode) {
  const resolved = style ? STYLE_TAGS[style] : undefined
  const Tag = (resolved?.tag ?? "p") as ElementType
  return (
    <Tag
      className={`min-h-[1lh] pb-[0.5em] whitespace-pre-line ${resolved?.className ?? ""}`.trim()}
    >
      {children}
    </Tag>
  )
}

/**
 * Tailwind's preflight resets `ul`/`ol` to `list-style: none`, so
 * `@portabletext/react`'s default list/listItem renderers (bare `<ul>`,
 * `<ol>`, `<li>` with no classes) show no bullets/numbers at all — the list
 * items are in the DOM, just visually indistinguishable from paragraphs.
 * These restore markers via Tailwind's `list-disc`/`list-decimal` utilities.
 */
const LIST_TAGS: Record<string, { tag: "ul" | "ol"; className: string }> = {
  bullet: { tag: "ul", className: "list-disc" },
  number: { tag: "ol", className: "list-decimal" },
}

export function renderList(style: string | undefined, children: ReactNode) {
  const resolved = (style && LIST_TAGS[style]) || LIST_TAGS.bullet
  const Tag = resolved.tag
  return (
    <Tag className={`${resolved.className} pb-[0.5em] pl-6`}>{children}</Tag>
  )
}

export function renderListItem(children: ReactNode) {
  return <li className="pb-1">{children}</li>
}

/** Width class for each `image.size` option — matches the Studio's radio options. */
const IMAGE_SIZE_CLASSES: Record<string, string> = {
  small: "w-1/3",
  medium: "w-2/3",
  large: "w-full",
}

/** Margin class for each `image.alignment` option — matches the Studio's radio options. */
const IMAGE_ALIGNMENT_CLASSES: Record<string, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
}

/** Renders an `image` array member dropped into a Portable Text field. */
export function PortableTextImage({
  value,
}: {
  value: SanityImage & {
    alt?: string
    size?: string
    alignment?: string
    customDimensions?: { width?: number; height?: number; unit?: "px" | "%" }
  }
}) {
  if (!value?.asset) return null
  const alignmentClass = IMAGE_ALIGNMENT_CLASSES[value.alignment ?? "center"]
  const dimensions = getImageDimensions(value.asset._ref)
  const {
    width: customWidth,
    height: customHeight,
    unit = "px",
  } = value.customDimensions ?? {}
  // Custom dimensions are an explicit override, not another preset —
  // rendering them through `w-full` would just stretch the image back out
  // to the size class's width, silently discarding the override. The
  // `width`/`height` props stay tied to the asset's real aspect ratio (for
  // the pre-load CLS placeholder); the actual displayed box is set via
  // `style` so both `px` and `%` units work the same way.
  const hasCustomDimensions = Boolean(customWidth && customHeight)
  // The figure stays full-width and flex-positions the image via
  // `justify-*` instead of shrink-wrapping + `margin: auto` — the latter
  // depends on the figure being exactly as wide as the image, which broke
  // under some ancestor layouts.
  const widthClass = hasCustomDimensions
    ? ""
    : IMAGE_SIZE_CLASSES[value.size ?? "large"]
  return (
    <figure className={`flex my-4 min-w-0 ${widthClass} ${alignmentClass}`}>
      <NextImage
        src={urlForImage(value).width(1600).url()}
        alt={value.alt ?? ""}
        width={dimensions?.width ?? 1600}
        height={dimensions?.height ?? 900}
        style={
          hasCustomDimensions
            ? {
                width: `${customWidth}${unit}`,
                height: `${customHeight}${unit}`,
              }
            : undefined
        }
        className={
          hasCustomDimensions
            ? "min-w-0 rounded-[8px]"
            : "w-full h-auto rounded-[8px]"
        }
      />
    </figure>
  )
}

export function LinkMark({ children, href }: MarkProps & { href?: string }) {
  return (
    <a
      href={href}
      className="underline hover:text-brand-accent"
      {...(href?.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  )
}

/** Decorators with no data of their own — just wrap `children`. */
export const DECORATOR_MARKS: Record<string, (props: MarkProps) => ReactNode> =
  {
    small: SmallMark,
    medium: MediumMark,
    large: LargeMark,
    accent: AccentMark,
    heading1: Heading1Mark,
    heading2: Heading2Mark,
    heading3: Heading3Mark,
    heading4: Heading4Mark,
    strong: StrongMark,
    em: EmMark,
    underline: UnderlineMark,
    code: CodeMark,
    "strike-through": StrikeMark,
    "align-left": LeftAlignMark,
    "align-center": CenterAlignMark,
    "align-right": RightAlignMark,
  }

export function renderDecoratorMark(name: string, children: ReactNode) {
  const Mark = DECORATOR_MARKS[name]
  return Mark ? <Mark>{children}</Mark> : children
}

/** Annotations carry their own data (href, color), read from the markDef/value object. */
export function renderAnnotationMark(
  typeName: string,
  value: unknown,
  children: ReactNode,
) {
  if (typeName === "link") {
    const href = (value as { href?: string } | undefined)?.href
    return <LinkMark href={href}>{children}</LinkMark>
  }
  if (typeName === "color") {
    const hex = (value as { swatch?: { hex?: string } } | undefined)?.swatch
      ?.hex
    return <ColorMark hex={hex}>{children}</ColorMark>
  }
  return children
}

/**
 * Drop this straight into `<PortableText components={PORTABLE_TEXT_COMPONENTS} />`
 * on any page rendering these custom marks. Strong/em/underline/code/strike
 * aren't listed here — `@portabletext/react` already renders those natively.
 */
export const PORTABLE_TEXT_COMPONENTS: PortableTextComponents = {
  types: {
    image: ({ value }) => <PortableTextImage value={value} />,
    // Inline object: `@portabletext/react` resolves inline types through
    // `types` too, so this renders within the surrounding line of text.
    lucideIcon: ({ value }) => (
      <InlineIcon
        iconNode={value?.iconNode}
        hex={value?.swatch?.hex}
        size={value?.size}
      />
    ),
  },
  block: {
    normal: ({ children }) => renderBlock("normal", children),
    h1: ({ children }) => renderBlock("h1", children),
    h2: ({ children }) => renderBlock("h2", children),
    h3: ({ children }) => renderBlock("h3", children),
    h4: ({ children }) => renderBlock("h4", children),
    h5: ({ children }) => renderBlock("h5", children),
    h6: ({ children }) => renderBlock("h6", children),
    blockquote: ({ children }) => renderBlock("blockquote", children),
  },
  list: {
    bullet: ({ children }) => renderList("bullet", children),
    number: ({ children }) => renderList("number", children),
  },
  listItem: {
    bullet: ({ children }) => renderListItem(children),
    number: ({ children }) => renderListItem(children),
  },
  marks: {
    small: ({ children }) => renderDecoratorMark("small", children),
    medium: ({ children }) => renderDecoratorMark("medium", children),
    large: ({ children }) => renderDecoratorMark("large", children),
    accent: ({ children }) => renderDecoratorMark("accent", children),
    heading1: ({ children }) => renderDecoratorMark("heading1", children),
    heading2: ({ children }) => renderDecoratorMark("heading2", children),
    heading3: ({ children }) => renderDecoratorMark("heading3", children),
    heading4: ({ children }) => renderDecoratorMark("heading4", children),
    "align-left": ({ children }) => renderDecoratorMark("align-left", children),
    "align-center": ({ children }) =>
      renderDecoratorMark("align-center", children),
    "align-right": ({ children }) =>
      renderDecoratorMark("align-right", children),
    link: ({ children, value }) =>
      renderAnnotationMark("link", value, children),
    color: ({ children, value }) =>
      renderAnnotationMark("color", value, children),
  },
}
