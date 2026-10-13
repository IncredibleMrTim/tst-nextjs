import { defineType, defineField, defineArrayMember } from "sanity"
import { toPlainText } from "@/lib/sanity"
import { imageSchema } from "../imageSchema"

export const whatWeDo = defineType({
  name: "whatWeDo",
  title: "What We Do",
  type: "object",
  fields: [
    defineField({
      name: "cards",
      title: "What We Do Cards",
      type: "array",
      of: [
        defineArrayMember({
          name: "card",
          title: "What We Do Card",
          type: "object",
          preview: {
            select: {
              customTitle: "internalTitle",
              heading: "heading",
              subtitle: "subHeading",
              text: "text",
              media: "image.imageFile",
            },
            prepare({ customTitle, heading, subtitle, text, media }) {
              const fallbackSubtitle = subtitle ? subtitle : toPlainText(text)

              return {
                title: customTitle || heading || "Untitled card",
                subtitle: fallbackSubtitle,
                media,
              }
            },
          },

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
              name: "listCard",
              type: "boolean",
              description:
                "Switch off to exclude this from the What We Do main list.",
              initialValue: true,
            }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "subHeading", type: "string" }),
            imageSchema({
              name: "image",
              title: "Icon",
              description: "The image that is displayed in the card.",
            }),
            defineField({
              name: "text",
              title: "Text",
              description:
                "Text describing the card.  This will be displayed as the main content",
              type: "array",
              of: [
                {
                  type: "block",
                },
              ],
            }),
            defineField({
              name: "cardPath",
              type: "string",
              title: "Navigation Path",
              description: "Where to navigate when this card is clicked.",
            }),
            defineField({
              name: "buttons",
              type: "array",
              description:
                "Action buttons for this card.  These can link off to other pages.",
              of: [
                defineArrayMember({
                  name: "buttons",
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "path",
                      type: "string",
                      description:
                        "Where to navigate when this button is clicked.",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "icon",
                      description:
                        "The icon will be displayed on the button in place of the default -> icon.",
                      type: "image",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
