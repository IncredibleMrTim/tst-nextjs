import { defineArrayMember, defineField, defineType } from "sanity"
import { Palette } from "lucide-react"

const HEX_COLOR_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

interface SwatchListItem {
  hex?: string
}

/**
 * Singleton (fixed id `colorPalette`) holding custom colors editors have
 * saved from the portable text "Text Color" picker (`BrandSwatchColorInput`),
 * so saved colors sync across editors and devices instead of staying local
 * to one browser.
 */
export const colorPalette = defineType({
  name: "colorPalette",
  title: "Custom Colors",
  type: "document",
  icon: Palette,
  fields: [
    defineField({
      name: "swatches",
      title: "Saved Colors",
      type: "array",
      description: "Custom colors editors have saved from the text color picker.",
      of: [
        defineArrayMember({
          type: "object",
          name: "swatch",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({
              name: "hex",
              type: "string",
              title: "Hex",
              validation: (Rule) =>
                Rule.required().regex(HEX_COLOR_PATTERN, { name: "hex color" }),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "hex" },
            prepare({ title, subtitle }) {
              return { title: title || subtitle, subtitle: title ? subtitle : undefined }
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((swatches: SwatchListItem[] | undefined) => {
          if (!swatches?.length) return true
          const hexes = swatches.map((swatch) => swatch.hex?.toLowerCase())
          return new Set(hexes).size === hexes.length
            ? true
            : "Each saved color must have a unique hex value"
        }),
    }),
  ],
})
