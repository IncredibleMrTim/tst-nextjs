import type { BooleanInputProps } from "sanity"

/**
 * Sanity draws a boolean with no saved value as "indeterminate" (a dash).
 * `initialValue` can't fix that for documents saved before the field existed,
 * so this passes `false` to the default input instead, which shows an empty
 * box. Nothing is written until the editor actually toggles it.
 */
export function UncheckedByDefaultBooleanInput(props: BooleanInputProps) {
  return props.renderDefault({ ...props, value: props.value ?? false })
}
