import { defineArrayMember, defineField } from "sanity"
import { portableTextSchema } from "./helpers/portableText"

/**
 * Array member for `gallerySchema`'s list. Mirrors the image gallery's shape
 * (heading, show heading, description) so editing a video gallery feels the same.
 */
export const videoGalleryMember = defineArrayMember({
  name: "videoGallery",
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
      description: "Show or hide the heading for this video gallery.",
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
      name: "videos",
      type: "array",
      description: "The videos to display in this gallery.",
      of: [
        defineArrayMember({
          name: "galleryVideo",
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Video Heading",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "videoFile",
              title: "Video",
              type: "file",
              options: { accept: "video/*" },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "posterImage",
              title: "Thumbnail",
              description: "Optional image shown before the video is played.",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "heading", media: "posterImage" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
  },
})
