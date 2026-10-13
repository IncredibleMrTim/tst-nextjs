import { Badge, Box, Button, Card, Flex, Heading, Spinner, Stack, Text } from "@sanity/ui"
import { Icon } from "@sanity/icons"
import type { Tool } from "sanity"

import { formatRelativeTime } from "@/sanity/lib/formatRelativeTime"
import {
  SANITY_STATUS_PAGE_URL,
  type SanityComponent,
  type SanityIncident,
} from "@/sanity/lib/sanityStatus"
import { useSanityStatus } from "@/sanity/lib/useSanityStatus"

type BadgeTone = "positive" | "critical" | "caution" | "default"

function WarningGlyph() {
  return <Icon symbol="warning-outline" />
}

function RefreshGlyph() {
  return <Icon symbol="refresh" />
}

/** Sentence-case label for Statuspage's snake_case values, e.g. "major_outage" → "Major outage". */
function formatStatusLabel(value: string): string {
  const spaced = value.replaceAll("_", " ")
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

function toneForComponent(componentStatus: string): BadgeTone {
  if (componentStatus === "operational") return "positive"
  if (componentStatus === "major_outage") return "critical"
  return "caution"
}

function toneForImpact(impact: string): BadgeTone {
  if (impact === "critical" || impact === "major") return "critical"
  if (impact === "minor") return "caution"
  return "default"
}

interface IncidentCardProps {
  incident: SanityIncident
}

function IncidentCard({ incident }: IncidentCardProps) {
  return (
    <Card padding={4} radius={3} shadow={1} tone={toneForImpact(incident.impact)}>
      <Stack gap={4}>
        <Stack gap={3}>
          <Flex gap={2} wrap="wrap">
            <Badge tone={toneForImpact(incident.impact)}>{formatStatusLabel(incident.impact)} impact</Badge>
            <Badge>{formatStatusLabel(incident.status)}</Badge>
          </Flex>
          <Text weight="semibold">{incident.name}</Text>
          <Text size={1} muted>
            Started {formatRelativeTime(incident.startedAt)}
          </Text>
        </Stack>

        <Stack gap={3}>
          {incident.updates.map((update) => (
            <Stack key={update.id} gap={2}>
              <Text size={1} weight="medium">
                {formatStatusLabel(update.status)} · {formatRelativeTime(update.createdAt)}
              </Text>
              <Text size={1} muted>
                {update.body}
              </Text>
            </Stack>
          ))}
        </Stack>

        <Box>
          <a href={incident.shortlink} target="_blank" rel="noreferrer">
            <Text size={1}>View incident on Sanity status →</Text>
          </a>
        </Box>
      </Stack>
    </Card>
  )
}

interface ComponentListProps {
  components: SanityComponent[]
}

function AffectedComponentList({ components }: ComponentListProps) {
  const affectedComponents = components.filter(({ status }) => status !== "operational")
  if (affectedComponents.length === 0) return null

  return (
    <Stack gap={3}>
      <Text size={1} weight="semibold" muted>
        Affected services
      </Text>
      <Flex gap={2} wrap="wrap">
        {affectedComponents.map(({ name, status }) => (
          <Badge key={name} tone={toneForComponent(status)}>
            {name}: {formatStatusLabel(status)}
          </Badge>
        ))}
      </Flex>
    </Stack>
  )
}

function SanityStatusTool() {
  const { status, isLoading, hasFetchFailed, refresh } = useSanityStatus()
  const isAllClear = status !== null && status.indicator === "none" && status.incidents.length === 0

  return (
    <Box padding={4}>
      <Stack gap={4}>
        <Flex align="center" justify="space-between">
          <Heading size={2}>Sanity Status</Heading>
          <Button icon={RefreshGlyph} text="Refresh" mode="ghost" disabled={isLoading} onClick={refresh} />
        </Flex>

        <Text size={1} muted>
          Live from Sanity&apos;s own status page, refreshed every minute. If pages in the Studio won&apos;t load
          or save, check here first.
        </Text>

        {hasFetchFailed && (
          <Card padding={3} radius={2} tone="caution">
            <Text size={1}>
              Couldn&apos;t reach Sanity&apos;s status page.{" "}
              <a href={SANITY_STATUS_PAGE_URL} target="_blank" rel="noreferrer">
                Open it directly
              </a>
              .
            </Text>
          </Card>
        )}

        {isLoading && !status && (
          <Flex align="center" justify="center" padding={5}>
            <Spinner muted />
          </Flex>
        )}

        {isAllClear && (
          <Card padding={4} radius={3} shadow={1} tone="positive">
            <Text weight="semibold">{status.description}</Text>
          </Card>
        )}

        {status && !isAllClear && (
          <>
            <Card padding={4} radius={3} shadow={1} tone={status.indicator === "minor" ? "caution" : "critical"}>
              <Text weight="semibold">{status.description}</Text>
            </Card>
            <AffectedComponentList components={status.components} />
            {status.incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </>
        )}
      </Stack>
    </Box>
  )
}

/** Registers the "Sanity Status" Studio tool that shows Sanity's current incidents and affected services. */
export function sanityStatusTool(): Tool {
  return {
    name: "sanity-status",
    title: "Sanity Status",
    icon: WarningGlyph,
    component: SanityStatusTool,
  }
}
