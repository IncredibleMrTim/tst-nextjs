import { defineType, defineField } from "sanity"
import { buttonsSchema } from "../helpers/buttons"
import { portableTextSchema } from "../helpers/portableText"
import { headingFields } from "../helpers/heading"

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  preview: {
    prepare() {
      return { title: "Services Page" }
    },
  },
  groups: [
    {
      name: "hero",
      title: "Hero",
    },
    {
      name: "content",
      title: "Content",
      default: true,
    },
  ],
  fields: [
    ...headingFields({ group: "content" }),
    defineField({
      name: "hero",
      type: "hero",
      group: "hero",
    }),
    portableTextSchema({ name: "content", title: "Content", group: "content" }),

    defineField({
      name: "services",
      title: "Services",
      type: "array",
      group: "content",
      of: [
        defineField({
          name: "service",
          title: "Service",
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
            }),
            defineField({
              name: "urlQuery",
              title: "URL Query",
              type: "string",
            }),
            portableTextSchema({
              name: "content",
              title: "Content",
            }),
            buttonsSchema({
              name: "buttons",
              title: "Service Buttons",
              description: "Buttons for this specific service.",
            }),
          ],
        }),
      ],
    }),
    buttonsSchema({
      name: "buttons",
      title: "Buttons",
      group: "content",
      description: "Buttons shown at the bottom of the page.",
    }),
  ],
})
