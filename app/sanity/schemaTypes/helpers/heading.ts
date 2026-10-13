import { defineField } from "sanity"
import { portableTextSchema } from "./portableText"
import { TSanitySchema } from "../types"
import { UncheckedByDefaultBooleanInput } from "./UncheckedByDefaultBooleanInput"

/**
 * Page heading, a toggle to show or hide it, and an optional page description. Returned as a list so pages can spread it into `fields`.
 */
export const headingFields = ({ group }: Pick<TSanitySchema, "group"> = {}) => [
  defineField({
    name: "heading",
    title: "Heading",
    description: "The main heading displayed at the top of the page.",
    group,
    type: "string",
  }),
  defineField({
    name: "showHeading",
    title: "Show Heading",
    description: "Show or hide the heading on the page.",
    group,
    type: "boolean",
    initialValue: false,
    components: { input: UncheckedByDefaultBooleanInput },
  }),
  portableTextSchema({
    name: "pageDescription",
    title: "Page Description",
    description: "Optional text displayed beneath the heading.",
    group,
  }),
]
