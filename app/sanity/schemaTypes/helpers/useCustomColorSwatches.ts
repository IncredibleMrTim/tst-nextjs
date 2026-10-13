import { useCallback, useEffect, useState } from "react"
import { useClient } from "sanity"
import { apiVersion } from "@/sanity/env"

const COLOR_PALETTE_DOC_ID = "colorPalette"
const COLOR_PALETTE_DOC_TYPE = "colorPalette"

export interface CustomSwatch {
  _key: string
  hex: string
  label?: string
}

/** Raw shape as it may exist in the dataset — includes the plain hex
 * strings an earlier version of this schema stored, before it grew a
 * `label` field. */
type RawSwatch = string | { _key?: string; hex?: string; label?: string }

interface RawColorPaletteDoc {
  swatches?: RawSwatch[]
}

function normalizeSwatch(raw: RawSwatch): CustomSwatch | null {
  if (typeof raw === "string") {
    return raw ? { _key: raw, hex: raw } : null
  }
  if (!raw.hex) return null
  return { _key: raw._key ?? raw.hex, hex: raw.hex, label: raw.label }
}

/**
 * Custom colors editors have saved from the text-color picker, stored in
 * the shared `colorPalette` singleton document so saved colors sync across
 * editors and devices rather than staying local to one browser.
 */
export function useCustomColorSwatches() {
  const client = useClient({ apiVersion })
  const [customSwatches, setCustomSwatches] = useState<CustomSwatch[]>([])

  useEffect(() => {
    let isMounted = true
    client
      .fetch<RawColorPaletteDoc | null>("*[_id == $id][0]{ swatches }", {
        id: COLOR_PALETTE_DOC_ID,
      })
      .then((doc) => {
        if (!isMounted) return
        const swatches = (doc?.swatches ?? [])
          .map(normalizeSwatch)
          .filter((swatch): swatch is CustomSwatch => swatch !== null)
        setCustomSwatches(swatches)
      })
    return () => {
      isMounted = false
    }
  }, [client])

  const saveSwatch = useCallback(
    async (hex: string, label?: string) => {
      if (customSwatches.some((saved) => saved.hex.toLowerCase() === hex.toLowerCase())) {
        return
      }
      const swatch: CustomSwatch = {
        _key: crypto.randomUUID(),
        hex,
        ...(label ? { label } : {}),
      }
      await client.createIfNotExists({
        _id: COLOR_PALETTE_DOC_ID,
        _type: COLOR_PALETTE_DOC_TYPE,
        swatches: [],
      })
      await client
        .patch(COLOR_PALETTE_DOC_ID)
        .setIfMissing({ swatches: [] })
        .insert("after", "swatches[-1]", [swatch])
        .commit()
      setCustomSwatches((current) => [...current, swatch])
    },
    [client, customSwatches],
  )

  // Removes by hex and rewrites the whole array (rather than an `_key`
  // patch) so it works uniformly for both the current object shape and any
  // legacy plain-string entries still in the dataset, which never had a
  // `_key` to match against.
  const removeSwatch = useCallback(
    async (hex: string) => {
      const next = customSwatches.filter(
        (swatch) => swatch.hex.toLowerCase() !== hex.toLowerCase(),
      )
      await client.patch(COLOR_PALETTE_DOC_ID).set({ swatches: next }).commit()
      setCustomSwatches(next)
    },
    [client, customSwatches],
  )

  const renameSwatch = useCallback(
    async (hex: string, label: string | undefined) => {
      const next = customSwatches.map((swatch) =>
        swatch.hex.toLowerCase() === hex.toLowerCase()
          ? { ...swatch, label: label || undefined }
          : swatch,
      )
      await client.patch(COLOR_PALETTE_DOC_ID).set({ swatches: next }).commit()
      setCustomSwatches(next)
    },
    [client, customSwatches],
  )

  return { customSwatches, saveSwatch, removeSwatch, renameSwatch }
}
