import { defineArrayMember, defineField } from "sanity"
import { imageFields } from "./imageSchema"
import { TSanitySchema } from "./types"

export const imagesSchema = ({
  name,
  title,
  description,
  group,
}: TSanitySchema = {}) =>
  defineField({
    name: name ?? "images",
    title,
    description: description ?? "Image list",
    type: "array",
    group,
    of: [
      defineArrayMember({
        name: "galleryImage",
        type: "object",
        fields: imageFields,
        preview: {
          select: { title: "imageName", media: "imageFile" },
        },
      }),
    ],
  })
