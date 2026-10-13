import { defineField, defineType } from "sanity"
import { portableTextSchema } from "../helpers/portableText"
import { buttonsSchema } from "../helpers/buttons"
import { headingFields } from "../helpers/heading"

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  preview: {
    prepare() {
      return { title: "Contact Page" }
    },
  },
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "hero", title: "Hero" },
  ],
  fields: [
    ...headingFields({ group: "content" }),
    defineField({
      name: "hero",
      type: "hero",
      group: "hero",
    }),
    portableTextSchema({ name: "content", title: "Content", group: "content" }),
    buttonsSchema({
      name: "buttons",
      title: "Buttons",
      group: "content",
      description: "Buttons shown at the bottom of the page.",
    }),
  ],
})
