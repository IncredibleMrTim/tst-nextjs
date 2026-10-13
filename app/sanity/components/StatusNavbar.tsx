import { Card, Flex, Text } from "@sanity/ui"
import type { NavbarProps } from "sanity"
import { StateLink } from "sanity/router"

import type { SanityStatus } from "@/sanity/lib/sanityStatus"
import { useSanityStatus } from "@/sanity/lib/useSanityStatus"

interface StatusBannerProps {
  status: SanityStatus
}

function StatusBanner({ status }: StatusBannerProps) {
  const isCritical =
    status.indicator === "major" || status.indicator === "critical"
  const activeIncident = status.incidents[0]
  const message = activeIncident
    ? `${status.description}: ${activeIncident.name}`
    : status.description

  return (
    <Card tone={isCritical ? "critical" : "caution"} padding={3} role="status">
      <Flex gap={3} justify="center" wrap="wrap">
        <Text size={1} weight="medium">
          Sanity is having issues, so pages may not load or save. {message}
        </Text>
        <Text size={1}>
          <StateLink state={{ tool: "sanity-status" }}>View details</StateLink>
        </Text>
      </Flex>
    </Card>
  )
}

/**
 * Studio navbar that shows a banner above the default one whenever Sanity
 * reports an incident. It lives in the navbar because that renders before
 * any document does, so it's still visible when a page is stuck on
 * "Loading document…" — exactly when you want to know it's Sanity's fault.
 */
export function StatusNavbar(props: NavbarProps) {
  const { status } = useSanityStatus()
  const hasIssue = status !== null && status.indicator !== "none"

  return (
    <>
      {hasIssue ? <StatusBanner status={status} /> : null}
      {props.renderDefault(props)}
    </>
  )
}
