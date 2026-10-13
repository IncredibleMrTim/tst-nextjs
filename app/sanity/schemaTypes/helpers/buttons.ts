import { defineField, defineArrayMember } from "sanity"

export const buttonsSchema = ({
  name,
  title,
  description,
  group,
}: {
  name?: string
  title?: string
  description?: string
  group?: string
}) =>
  defineField({
    name: name ?? "buttons",
    title: title ?? "Buttons",
    type: "array",
    group,
    description:
      description ?? "Action buttons.  These can link off to other pages.",
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
            description: "Where to navigate when this button is clicked.",
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "variant",
            title: "Variant",
            type: "string",
            options: {
              list: [
                { title: "Default", value: "default" },
                { title: "Outline", value: "outline" },
                { title: "Secondary", value: "secondary" },
                { title: "Ghost", value: "ghost" },
                { title: "Destructive", value: "destructive" },
                { title: "Link", value: "link" },
              ],
              layout: "dropdown",
            },
            initialValue: "default",
          }),
          defineField({
            name: "size",
            title: "Size",
            type: "string",
            options: {
              list: [
                { title: "Default", value: "default" },
                { title: "Extra Small", value: "xs" },
                { title: "Small", value: "sm" },
                { title: "Large", value: "lg" },
                { title: "Extra Large", value: "2xl" },
                { title: "Icon", value: "icon" },
                { title: "Icon Extra Small", value: "icon-xs" },
                { title: "Icon Small", value: "icon-sm" },
                { title: "Icon Large", value: "icon-lg" },
              ],
              layout: "dropdown",
            },
            initialValue: "default",
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
  })
