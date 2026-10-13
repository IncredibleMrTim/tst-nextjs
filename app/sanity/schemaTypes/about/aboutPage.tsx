import { defineField, defineType } from "sanity"
import { imagesSchema } from "../imagesSchema"
import { portableTextSchema } from "../helpers/portableText"
import { buttonsSchema } from "../helpers/buttons"
import { headingFields } from "../helpers/heading"

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  preview: {
    prepare() {
      return { title: "About Page" }
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
    portableTextSchema({ name: "about", title: "Content", group: "content" }),
    imagesSchema({
      name: "images",
      title: "Images",
      group: "content",
    }),
    buttonsSchema({
      name: "buttons",
      title: "Buttons",
      group: "content",
      description: "Buttons shown at the bottom of the page.",
    }),
  ],
})
