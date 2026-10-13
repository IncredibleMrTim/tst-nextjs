import { toPlainText } from "@/lib/sanity"
import { defineArrayMember, defineField, defineType } from "sanity"
import { imageSchema } from "../imageSchema"

export const belief = defineType({
  name: "belief",
  title: "Belief Banner",
  type: "array",
  of: [
    defineArrayMember({
      name: "card",
      title: "Belief Card",
      type: "object",
      preview: {
        select: {
          customTitle: "internalTitle",
          heading: "heading",
        },
        prepare({ customTitle, heading }) {
          return {
            title: customTitle || heading || "Untitled card",
          }
        },
      },
      fieldsets: [
        {
          name: "imageFieldset",
          title: "Icon/Image",
          description:
            "You may display an Image or Icon in the card (Note that if both are added, the Icon will take precedence).",
        },
      ],
      fields: [
        defineField({
          name: "internalTitle",
          title: "Internal Title (Sanity Only)",
          type: "string",
          description:
            "Not shown on the site — helps identify this card in the list.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "heading",
          title: "Heading",
          description: "Display text.",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "icon",
          title: "Icon",
          description: "Icon to be displayed next to the text.",
          type: "object",
          fieldset: "imageFieldset",
          fields: [
            defineField({
              name: "name",
              type: "string",
              description: "The icon component name from React Icons.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "package",
              type: "string",
              description: "The react-icons package (e.g. react-icons/fa).",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        imageSchema({
          name: "image",
          title: "Image",
          description: "An image to be displayed next to the text.",
          fieldset: "imageFieldset",
        }),
      ],
    }),
  ],
})
