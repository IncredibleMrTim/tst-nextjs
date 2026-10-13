import type { SanityClient, QueryParams } from "next-sanity"

/**
 * Subscribes to Sanity mutations matching the query and calls onResult
 * with the event's own materialized result. `visibility: 'transaction'`
 * (the listen default) fires as soon as a mutation commits, which can
 * race ahead of a separate fetch reading a not-yet-consistent replica,
 * so this requests `visibility: 'query'` and reads `event.result`
 * instead of refetching. Returns an unsubscribe function.
 *
 * The connection can fail for reasons outside our control — an ad/
 * tracker blocker (e.g. Brave Shields) treating a third-party API
 * domain as blockable, a network hiccup, whatever. Without an `error`
 * handler that becomes an unhandled exception, and in dev that trips
 * Next's full-page error overlay, hiding content that rendered fine.
 * So this swallows connection errors: worst case, live updates just
 * don't arrive and the page keeps showing whatever it already had.
 */
export function subscribeToLiveQuery<Result>(
  client: SanityClient,
  query: string,
  params: QueryParams,
  onResult: (result: Result) => void
): () => void {
  const subscription = client
    .listen(query, params, { includeResult: true, visibility: "query" })
    .subscribe({
      next: (event) => {
        if (event.type === "mutation" && event.result) {
          onResult(event.result as Result)
        }
      },
      error: () => {
        // Live updates unavailable (e.g. blocked by the browser) — the
        // page keeps whatever content it already rendered.
      },
    })

  return () => subscription.unsubscribe()
}
