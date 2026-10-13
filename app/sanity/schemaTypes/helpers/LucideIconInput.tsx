import { useMemo, useState, type MouseEvent } from "react"
import { icons, type IconNode } from "lucide-react"
import {
  Box,
  Button,
  Card,
  Grid,
  Select,
  Stack,
  Text,
  TextInput,
} from "@sanity/ui"
import { set, type ObjectInputProps } from "sanity"
import iconCategoriesByName from "./lucideIconCategories.json"
import iconTagsByName from "./lucideIconTags.json"

const MAX_RESULTS = 96
const ALL_CATEGORIES = "all"

// Snapshots of https://lucide.dev/api/categories and /api/tags (icon name ->
// categories / keywords), since `lucide-react` ships the icons but not their
// metadata. Re-download both when upgrading `lucide-react` to pick up newly
// added icons.
const CATEGORIES_BY_KEBAB_NAME: Record<string, string[]> = iconCategoriesByName
const TAGS_BY_KEBAB_NAME: Record<string, string[]> = iconTagsByName

interface IconEntry {
  name: string
  categories: string[]
  /** Search keywords, e.g. "call" for the Phone icon. */
  tags: string[]
}

/** "arrow-down-0-1" -> "ArrowDown01", the key format of `icons`. */
function kebabToPascalCase(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

/**
 * One entry per distinct icon: `icons` also lists aliases (e.g. Home and
 * House) that are the same component, which would show up as duplicates.
 * The name Lucide categorises the icon under is kept as the canonical one.
 */
function buildIconEntries(): IconEntry[] {
  const categorisedIcons = new Map<unknown, IconEntry>()
  for (const [kebabName, categories] of Object.entries(
    CATEGORIES_BY_KEBAB_NAME,
  )) {
    const name = kebabToPascalCase(kebabName)
    const component = icons[name as keyof typeof icons]
    if (component) {
      categorisedIcons.set(component, {
        name,
        categories,
        tags: TAGS_BY_KEBAB_NAME[kebabName] ?? [],
      })
    }
  }

  const entries = new Map<unknown, IconEntry>()
  for (const [name, component] of Object.entries(icons)) {
    if (entries.has(component)) continue
    entries.set(
      component,
      categorisedIcons.get(component) ?? { name, categories: [], tags: [] },
    )
  }
  return [...entries.values()].sort((a, b) => a.name.localeCompare(b.name))
}

const ICON_ENTRIES = buildIconEntries()
const CATEGORIES = [
  ALL_CATEGORIES,
  ...[...new Set(ICON_ENTRIES.flatMap((entry) => entry.categories))].sort(),
]

/** "food-beverage" -> "Food Beverage" */
function formatCategoryLabel(category: string): string {
  if (category === ALL_CATEGORIES) return "All"
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

interface LucideIconValue {
  name?: string
}

/** Lowercases and drops spaces/dashes so "arrow right" matches "ArrowRight". */
function normalizeSearchText(text: string): string {
  return text.toLowerCase().replace(/[\s-_]/g, "")
}

/**
 * Reads the drawing instructions back out of an icon already rendered in the
 * picker, so the site can draw the icon from saved data without bundling or
 * lazy-loading any part of the Lucide library.
 */
function readIconNode(svg: SVGElement): IconNode {
  return Array.from(svg.children).map((element) => [
    element.tagName.toLowerCase() as IconNode[number][0],
    Object.fromEntries(
      Array.from(element.attributes).map(({ name, value }) => [name, value]),
    ),
  ])
}

/**
 * Searchable Lucide icon picker for the inline `lucideIcon` portable text
 * object. Stores the icon's name and its SVG nodes (as JSON) rather than just
 * the name, so rendering the page never has to import the icon library.
 */
export function LucideIconInput(props: ObjectInputProps) {
  const { onChange, readOnly, renderDefault } = props
  const selectedName = (props.value as LucideIconValue | undefined)?.name
  const selectedComponent = selectedName
    ? icons[selectedName as keyof typeof icons]
    : undefined
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)

  const matchingNames = useMemo(() => {
    const searchText = normalizeSearchText(query)
    return ICON_ENTRIES.filter(
      (entry) =>
        (activeCategory === ALL_CATEGORIES ||
          entry.categories.includes(activeCategory)) &&
        [entry.name, ...entry.tags].some((term) =>
          normalizeSearchText(term).includes(searchText),
        ),
    ).map((entry) => entry.name)
  }, [query, activeCategory])

  function handleSelect(name: string, event: MouseEvent<HTMLButtonElement>) {
    const svg = event.currentTarget.querySelector("svg")
    if (!svg) return
    onChange([
      set(name, ["name"]),
      set(JSON.stringify(readIconNode(svg)), ["iconNode"]),
    ])
  }

  return (
    <Stack gap={3}>
      {/* Stacked, not side by side: the Select is full width and squeezes a
          flex sibling to nothing inside the narrow edit popover. */}
      <TextInput
        placeholder="Search by name or keyword, e.g. phone, call, rubbish"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        readOnly={readOnly}
      />
      <Select
        value={activeCategory}
        onChange={(event) => setActiveCategory(event.currentTarget.value)}
      >
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {formatCategoryLabel(category)}
          </option>
        ))}
      </Select>
      <Text size={1} muted>
        {selectedName ? `Selected: ${selectedName}` : "No icon selected"}
        {matchingNames.length > MAX_RESULTS
          ? ` — showing ${MAX_RESULTS} of ${matchingNames.length}, keep typing to narrow`
          : ` — ${matchingNames.length} found`}
      </Text>
      <Card border radius={2}>
        <Box padding={2}>
          <Grid gridTemplateColumns={6} gap={1}>
            {matchingNames.slice(0, MAX_RESULTS).map((name) => {
              const IconComponent = icons[name as keyof typeof icons]
              const isSelected = IconComponent === selectedComponent
              return (
                <Button
                  key={name}
                  mode="bleed"
                  padding={3}
                  title={name}
                  tone={isSelected ? "primary" : "default"}
                  selected={isSelected}
                  disabled={readOnly}
                  icon={<IconComponent />}
                  onClick={(event) => handleSelect(name, event)}
                />
              )
            })}
          </Grid>
        </Box>
      </Card>

      {/* Remaining visible fields (the color swatch) via the default form;
          name and iconNode are hidden, so only the picker above sets them. */}
      {renderDefault(props)}
    </Stack>
  )
}
