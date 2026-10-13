import { defineField } from "sanity"
import { imagesSchema } from "./imagesSchema"
import { portableTextSchema } from "./helpers/portableText"
import { videoGalleryMember } from "./videoGallerySchema"
import { TSanitySchema } from "./types"

export const gallerySchema = ({
  name,
  title,
  description,
  group,
}: TSanitySchema = {}) =>
  defineField({
    name: name ?? "galleries",
    title,
    description,
    group,
    type: "array",
    of: [
      defineField({
        name: "gallery",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            type: "string",
            validation: (rule) => rule.required(),
          }),
          defineField({
            type: "boolean",
            name: "showHeading",
            title: "Show Heading",
            description: "Show or hide the heading for this Gallery.",
            initialValue: true,
          }),
          defineField({
            name: "anchor",
            title: "Gallery Anchor (Optional)",
            description:
              "Adds a gallery anchor that can be used to jump to this gallery on link or button click.",
            type: "string",
          }),
          portableTextSchema({
            name: "description",
            title: "Gallery Description",
          }),
          defineField({
            name: "gallery",
            type: "object",
            fields: [
              imagesSchema({
                description: "The images to display in this gallery.",
              }),
            ],
          }),
        ],
        preview: {
          select: { title: "heading" },
        },
      }),
      videoGalleryMember,
    ],
  })
