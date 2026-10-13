import { Suspense, useState } from "react"
import { ColorInput, type ColorValue } from "@sanity/color-input"
import { Box, Button, Card, Flex, Stack, Text, TextInput } from "@sanity/ui"
import { AddIcon } from "@sanity/icons/Add"
import { CloseIcon } from "@sanity/icons/Close"
import { EditIcon } from "@sanity/icons/Edit"
import { set, type ObjectInputProps } from "sanity"
import tinycolor from "tinycolor2"
import {
  useCustomColorSwatches,
  type CustomSwatch,
} from "@/sanity/schemaTypes/helpers/useCustomColorSwatches"

const BRAND_SWATCHES = [
  { label: "Accent", hex: "#af7c3c" },
  { label: "Foreground", hex: "#ece9e4" },
  { label: "Muted Foreground", hex: "#6b6460" },
  { label: "Destructive", hex: "#e5484d" },
] as const

/** Mirrors `@sanity/color-input`'s own hex → ColorValue conversion so a
 * click here produces the same shape the plugin's own swatches write. */
function hexToColorValue(hex: string): ColorValue {
  const color = tinycolor(hex)
  return {
    hex: `#${color.toHex()}`,
    hsl: color.toHsl(),
    hsv: color.toHsv(),
    rgb: color.toRgb(),
  }
}

function SwatchDot({ hex }: { hex: string }) {
  return (
    <Box
      style={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: hex,
        border: "1px solid var(--card-border-color)",
        flexShrink: 0,
      }}
    />
  )
}

interface SwatchButtonProps {
  label: string
  hex: string
  disabled?: boolean
  onSelect: (hex: string) => void
}

/** A fixed brand swatch — always available, never removable. */
function SwatchButton({ label, hex, disabled, onSelect }: SwatchButtonProps) {
  return (
    <Card
      as="button"
      type="button"
      disabled={disabled}
      radius={2}
      padding={2}
      tone="default"
      shadow={1}
      style={{ cursor: disabled ? "default" : "pointer", flexShrink: 0 }}
      onClick={() => onSelect(hex)}
    >
      <Flex align="center" gap={2}>
        <SwatchDot hex={hex} />
        <Text size={1}>{label}</Text>
      </Flex>
    </Card>
  )
}

interface CustomSwatchButtonProps {
  swatch: CustomSwatch
  disabled?: boolean
  onSelect: (hex: string) => void
  onRemove: (hex: string) => void
  onRename: (hex: string, label: string | undefined) => void
}

/**
 * A saved custom swatch — selectable like a brand one, plus its own rename
 * (inline label edit) and remove controls.
 */
function CustomSwatchButton({
  swatch,
  disabled,
  onSelect,
  onRemove,
  onRename,
}: CustomSwatchButtonProps) {
  const { hex, label } = swatch
  const [isEditing, setIsEditing] = useState(false)
  const [labelDraft, setLabelDraft] = useState(label ?? "")

  const commitRename = () => {
    setIsEditing(false)
    onRename(hex, labelDraft.trim() || undefined)
  }

  if (isEditing) {
    return (
      <Card radius={2} padding={1} tone="default" shadow={1} style={{ flexShrink: 0 }}>
        <Flex align="center" gap={2} padding={1}>
          <SwatchDot hex={hex} />
          <TextInput
            fontSize={1}
            autoFocus
            placeholder={hex}
            value={labelDraft}
            onChange={(event) => setLabelDraft(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") commitRename()
              if (event.key === "Escape") {
                setLabelDraft(label ?? "")
                setIsEditing(false)
              }
            }}
            onBlur={commitRename}
            style={{ maxWidth: 160 }}
          />
        </Flex>
      </Card>
    )
  }

  return (
    <Card
      radius={2}
      padding={1}
      tone="default"
      shadow={1}
      style={{ flexShrink: 0 }}
    >
      <Flex align="center" gap={1}>
        <Card
          as="button"
          type="button"
          disabled={disabled}
          radius={2}
          padding={1}
          tone="default"
          style={{
            cursor: disabled ? "default" : "pointer",
            background: "transparent",
          }}
          onClick={() => onSelect(hex)}
        >
          <Flex align="center" gap={2}>
            <SwatchDot hex={hex} />
            <Text size={1}>{label ?? hex}</Text>
          </Flex>
        </Card>
        {!disabled && (
          <>
            <Button
              mode="bleed"
              padding={2}
              icon={EditIcon}
              aria-label={`Rename ${label ?? hex}`}
              onClick={() => {
                setLabelDraft(label ?? "")
                setIsEditing(true)
              }}
            />
            <Button
              mode="bleed"
              tone="critical"
              padding={2}
              icon={CloseIcon}
              aria-label={`Remove ${label ?? hex}`}
              onClick={() => onRemove(hex)}
            />
          </>
        )}
      </Flex>
    </Card>
  )
}

/**
 * Color input for the portable text "Text Color" annotation, restricted to
 * brand tokens from `src/app/globals.css`. Wraps the plugin's default
 * picker with a labeled, clickable, horizontally-scrolling list of brand
 * and custom colors, plus a name + "Save color" control for adding new
 * custom colors (persisted via `useCustomColorSwatches`).
 */
export function BrandSwatchColorInput(props: ObjectInputProps) {
  const { onChange, readOnly, value } = props
  const { customSwatches, saveSwatch, removeSwatch, renameSwatch } = useCustomColorSwatches()
  const [labelDraft, setLabelDraft] = useState("")

  const currentHex = (value as ColorValue | undefined)?.hex
  const isCurrentColorSaved =
    !currentHex ||
    BRAND_SWATCHES.some(
      (swatch) => swatch.hex.toLowerCase() === currentHex.toLowerCase(),
    ) ||
    customSwatches.some(
      (swatch) => swatch.hex.toLowerCase() === currentHex.toLowerCase(),
    )

  const selectHex = (hex: string) => onChange(set(hexToColorValue(hex)))

  const handleSave = () => {
    if (!currentHex) return
    saveSwatch(currentHex, labelDraft.trim() || undefined)
    setLabelDraft("")
  }

  return (
    <Stack gap={3}>
      <Suspense fallback={null}>
        <ColorInput {...props} />
      </Suspense>
      <Box style={{ overflowY: "auto", minHeight: 120 }}>
        <Flex direction="column" gap={2}>
          {BRAND_SWATCHES.map(({ label, hex }) => (
            <SwatchButton
              key={hex}
              label={`${label} (${hex})`}
              hex={hex}
              disabled={readOnly}
              onSelect={selectHex}
            />
          ))}
          {customSwatches.map((swatch) => (
            <CustomSwatchButton
              key={swatch._key}
              swatch={swatch}
              disabled={readOnly}
              onSelect={selectHex}
              onRemove={removeSwatch}
              onRename={renameSwatch}
            />
          ))}
        </Flex>
      </Box>
      {!readOnly && (
        <Flex gap={2} align="center">
          <TextInput
            fontSize={1}
            placeholder="Name this color (optional)"
            value={labelDraft}
            onChange={(event) => setLabelDraft(event.currentTarget.value)}
            style={{ maxWidth: 220 }}
          />
          <Button
            mode="ghost"
            icon={AddIcon}
            text="Save color"
            disabled={isCurrentColorSaved}
            onClick={handleSave}
          />
        </Flex>
      )}
    </Stack>
  )
}
