// Sanity's public status page is a standard Atlassian Statuspage, whose
// JSON API sends `access-control-allow-origin: *`, so the Studio can read
// it straight from the browser — no token, no proxy.
const SANITY_STATUS_SUMMARY_URL =
  "https://www.sanity-status.com/api/v2/summary.json"

export const SANITY_STATUS_PAGE_URL = "https://www.sanity-status.com"

export type SanityStatusIndicator = "none" | "minor" | "major" | "critical"

export interface SanityComponent {
  name: string
  status: string
}

export interface SanityIncidentUpdate {
  id: string
  status: string
  body: string
  createdAt: string
}

export interface SanityIncident {
  id: string
  name: string
  status: string
  impact: string
  shortlink: string
  startedAt: string
  updates: SanityIncidentUpdate[]
}

export interface SanityStatus {
  indicator: SanityStatusIndicator
  description: string
  components: SanityComponent[]
  incidents: SanityIncident[]
}

interface RawIncidentUpdate {
  id: string
  status: string
  body: string
  created_at: string
}

interface RawIncident {
  id: string
  name: string
  status: string
  impact: string
  shortlink: string
  started_at: string
  incident_updates: RawIncidentUpdate[]
}

interface StatusSummaryResponse {
  status: { indicator: SanityStatusIndicator; description: string }
  components: SanityComponent[]
  incidents: RawIncident[]
}

/**
 * Reads Sanity's current platform status. Throws on a network or HTTP
 * failure — callers decide whether that matters (the banner just stays
 * hidden, since "can't reach the status page" isn't itself a Sanity outage).
 */
export async function fetchSanityStatus(): Promise<SanityStatus> {
  const response = await fetch(SANITY_STATUS_SUMMARY_URL)
  if (!response.ok) {
    throw new Error(`Sanity status request failed: ${response.status}`)
  }

  const summary = (await response.json()) as StatusSummaryResponse
  return {
    indicator: summary.status.indicator,
    description: summary.status.description,
    components: summary.components.map(({ name, status }) => ({
      name,
      status,
    })),
    incidents: summary.incidents.map((incident) => ({
      id: incident.id,
      name: incident.name,
      status: incident.status,
      impact: incident.impact,
      shortlink: incident.shortlink,
      startedAt: incident.started_at,
      // Newest first, as the status page itself lists them.
      updates: incident.incident_updates.map((update) => ({
        id: update.id,
        status: update.status,
        body: update.body,
        createdAt: update.created_at,
      })),
    })),
  }
}
