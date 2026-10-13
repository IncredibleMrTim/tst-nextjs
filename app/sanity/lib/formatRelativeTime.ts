/** Formats an ISO timestamp as relative text, e.g. "3 minutes ago". */
export function formatRelativeTime(isoTimestamp: string): string {
  const elapsedSeconds = Math.max(
    0,
    Math.round((Date.now() - new Date(isoTimestamp).getTime()) / 1000),
  )
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ]

  for (const [unit, secondsInUnit] of units) {
    if (elapsedSeconds >= secondsInUnit) {
      const value = Math.floor(elapsedSeconds / secondsInUnit)
      return new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" }).format(
        -value,
        unit,
      )
    }
  }
  return "just now"
}
