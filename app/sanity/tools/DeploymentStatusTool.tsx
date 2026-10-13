import { useEffect, useState } from "react"
import { Badge, Box, Button, Card, Flex, Heading, Inline, Spinner, Stack, Text } from "@sanity/ui"
import { Icon } from "@sanity/icons"
import type { Tool } from "sanity"

import {
  fetchLatestSanityDeployStatuses,
  type DeployEnvironment,
  type DeployStatus,
} from "@/sanity/lib/deployStatus"
import { formatRelativeTime } from "@/sanity/lib/formatRelativeTime"

const ENVIRONMENT_LABELS: Record<DeployEnvironment, string> = {
  dev: "Dev — dev.skimreapers.co.uk",
  production: "Production — skimreapers.co.uk",
}

type DeployStatuses = Record<DeployEnvironment, DeployStatus | null>
type BadgeTone = "positive" | "critical" | "caution" | "default"

function RocketGlyph() {
  return <Icon symbol="rocket" />
}

function RefreshGlyph() {
  return <Icon symbol="refresh" />
}

function badgeToneFor(status: DeployStatus): BadgeTone {
  if (status.conclusion === "success") return "positive"
  if (status.conclusion === "failure" || status.conclusion === "cancelled") return "critical"
  if (status.status === "in_progress" || status.status === "queued") return "caution"
  return "default"
}

interface DeployStatusCardProps {
  environment: DeployEnvironment
  status: DeployStatus | null
}

function DeployStatusCard({ environment, status }: DeployStatusCardProps) {
  return (
    <Card padding={4} radius={3} shadow={1} flex={1}>
      <Stack gap={3}>
        <Text size={1} weight="semibold" muted>
          {ENVIRONMENT_LABELS[environment]}
        </Text>

        {!status && (
          <Text size={1} muted>
            No Sanity-triggered deploy found in recent history.
          </Text>
        )}

        {status && (
          <>
            <Inline gap={2}>
              <Badge tone={badgeToneFor(status)}>{status.conclusion ?? status.status}</Badge>
            </Inline>
            <Text size={1} muted>
              Built from commit <code>{status.commitSha}</code>
            </Text>
            <Text size={1} muted>
              {status.completedAt
                ? `Deployed ${formatRelativeTime(status.completedAt)}`
                : `Started ${formatRelativeTime(status.startedAt)}`}
            </Text>
            <Box>
              <a href={status.runUrl} target="_blank" rel="noreferrer">
                <Text size={1}>View run on GitHub →</Text>
              </a>
            </Box>
          </>
        )}
      </Stack>
    </Card>
  )
}

function DeploymentStatusTool() {
  const [statuses, setStatuses] = useState<DeployStatuses | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    let isStale = false

    async function loadStatuses() {
      setIsLoading(true)
      setError(null)
      try {
        const result = await fetchLatestSanityDeployStatuses()
        if (!isStale) setStatuses(result)
      } catch (fetchError) {
        if (!isStale) {
          setError(fetchError instanceof Error ? fetchError.message : "Failed to load deploy status.")
        }
      } finally {
        if (!isStale) setIsLoading(false)
      }
    }

    loadStatuses()
    return () => {
      isStale = true
    }
  }, [refreshCount])

  return (
    <Box padding={4}>
      <Stack gap={4}>
        <Flex align="center" justify="space-between">
          <Heading size={2}>Sanity Deploy Status</Heading>
          <Button
            icon={RefreshGlyph}
            text="Refresh"
            mode="ghost"
            disabled={isLoading}
            onClick={() => setRefreshCount((count) => count + 1)}
          />
        </Flex>

        <Text size={1} muted>
          Latest deploy triggered by a Sanity publish, for each environment.
        </Text>

        {error && (
          <Card padding={3} radius={2} tone="critical">
            <Text size={1}>{error}</Text>
          </Card>
        )}

        {isLoading && !statuses && (
          <Flex align="center" justify="center" padding={5}>
            <Spinner muted />
          </Flex>
        )}

        {statuses && (
          <Flex gap={4} wrap="wrap">
            <DeployStatusCard environment="dev" status={statuses.dev} />
            <DeployStatusCard environment="production" status={statuses.production} />
          </Flex>
        )}
      </Stack>
    </Box>
  )
}

/** Registers the "Deployments" Studio tool that shows the latest Sanity-triggered deploy status per environment. */
export function deploymentStatusTool(): Tool {
  return {
    name: "deployment-status",
    title: "Deployments",
    icon: RocketGlyph,
    component: DeploymentStatusTool,
  }
}
