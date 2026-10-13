import { defineArrayMember, defineField, defineType } from "sanity"
import { portableTextSchema } from "../helpers/portableText"
import { buttonsSchema } from "../helpers/buttons"
import { headingFields } from "../helpers/heading"

export const qaPage = defineType({
  name: "qaPage",
  title: "Q&A Page",
  type: "document",
  preview: {
    prepare() {
      return { title: "Q&A Page" }
    },
  },

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "qa", title: "Q&A" },
    { name: "hero", title: "Hero" },
  ],
  fields: [
    ...headingFields({ group: "content" }),
    defineField({
      name: "hero",
      type: "hero",
      group: "hero",
    }),
    defineField({
      name: "qaListsHeading",
      type: "string",
      title: "Q&A Lists Heading",
      description: "Heading displayed over the Q&A lists",
      group: "qa",
    }),
    defineField({
      name: "qaLists",
      type: "array",
      title: "Q&A Lists",
      description: "Add a list, then add questions and answers inside it.",
      group: "qa",
      of: [defineArrayMember({ type: "qaList" })],
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
