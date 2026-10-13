"use client"

import { useEffect, useState } from "react"
import type { QueryParams } from "next-sanity"

import { client } from "@/sanity/client"
import { hasEditorSession } from "./editorSession"
import { subscribeToLiveQuery } from "./liveSubscribe"

// The CDN-backed client (useCdn: true) that build-time fetches use can
// lag real-time mutations, so live updates go through a direct client.
const publicLiveClient = client.withConfig({ useCdn: false })

// Only ever used after hasEditorSession() confirms a real, existing
// authenticated session in this browser — withCredentials reads that
// session's cookie, no token is embedded here. Sanity's own ACL still
// enforces whether that session can actually read this project's
// drafts, regardless of what this client requests.
const editorLiveClient = client.withConfig({
  useCdn: false,
  withCredentials: true,
  perspective: "drafts",
})

// A stable reference so callers who omit `params` don't create a new
// object on every render — that would change the effect's dependency
// every time setData runs, forcing an unsubscribe/resubscribe cycle
// on every update that can drop whatever mutation arrives next.
const EMPTY_PARAMS: QueryParams = {}

/**
 * Seeds state with build-time (published) data, then listens for
 * Sanity mutations matching the query and applies the result — so a
 * publish shows up for anyone already on the page without waiting for
 * a rebuild+deploy. If this browser turns out to hold an authenticated
 * Sanity session (e.g. the visitor is signed into Studio in another
 * tab), it upgrades to a draft-aware live view instead, so an editor
 * sees their own unpublished edits on the real site in real time.
 *
 * Depends only on a Sanity client exported from "@/sanity/client" —
 * drop this whole `live` folder into another project's `src/sanity/`
 * and it works as long as that file exists.
 */
export function useLiveSanityData<Result>(
  query: string,
  initialData: Result,
  params: QueryParams = EMPTY_PARAMS
): Result {
  const [data, setData] = useState<Result>(initialData)

  useEffect(() => {
    let isCancelled = false
    let unsubscribe = subscribeToLiveQuery<Result>(
      publicLiveClient,
      query,
      params,
      setData
    )

    hasEditorSession().then((isEditor) => {
      if (isCancelled || !isEditor) return

      unsubscribe()
      editorLiveClient
        .fetch<Result>(query, params)
        .then((result) => {
          // A session can pass the `/users/me` check yet still not
          // resolve a document on the drafts perspective (permissions,
          // cookie-partitioning edge cases, etc.) — Sanity returns that
          // as an empty/null result rather than an error. Never let
          // that overwrite content that's already showing correctly.
          if (!isCancelled && result) setData(result)
        })
        .catch(() => {
          // Draft fetch unavailable (e.g. blocked by the browser) —
          // fall through to the published live subscription below.
        })
      unsubscribe = subscribeToLiveQuery<Result>(
        editorLiveClient,
        query,
        params,
        setData
      )
    })

    return () => {
      isCancelled = true
      unsubscribe()
    }
  }, [query, params])

  return data
}
