import { useCallback, useEffect, useState } from "react"

import { fetchSanityStatus, type SanityStatus } from "./sanityStatus"

const STATUS_POLL_INTERVAL_MS = 60_000

export interface UseSanityStatusResult {
  status: SanityStatus | null
  isLoading: boolean
  hasFetchFailed: boolean
  refresh: () => void
}

/**
 * Polls Sanity's status page while the Studio is open. A failed request
 * keeps the previous value rather than clearing it — a flaky connection
 * shouldn't make an ongoing incident banner flicker away.
 */
export function useSanityStatus(): UseSanityStatusResult {
  const [status, setStatus] = useState<SanityStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasFetchFailed, setHasFetchFailed] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    let isCancelled = false

    async function refreshStatus() {
      setIsLoading(true)
      try {
        const latestStatus = await fetchSanityStatus()
        if (isCancelled) return
        setStatus(latestStatus)
        setHasFetchFailed(false)
      } catch {
        if (!isCancelled) setHasFetchFailed(true)
      } finally {
        if (!isCancelled) setIsLoading(false)
      }
    }

    refreshStatus()
    const intervalId = setInterval(refreshStatus, STATUS_POLL_INTERVAL_MS)
    return () => {
      isCancelled = true
      clearInterval(intervalId)
    }
  }, [refreshCount])

  const refresh = useCallback(() => setRefreshCount((count) => count + 1), [])

  return { status, isLoading, hasFetchFailed, refresh }
}
