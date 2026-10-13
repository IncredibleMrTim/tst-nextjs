# Live Sanity data

`useLiveSanityData` keeps a page's content current without a rebuild+deploy — a publish shows up for anyone already on the page within seconds, and a signed-in editor sees their own unpublished drafts live on the real site. Built for a **static export** with no server runtime (no ISR, no Route Handlers, no Sanity `defineLive`/Visual Editing — those all assume a running Next.js server). If your project does have a server, prefer Sanity's official Live Content API / Visual Editing stack instead; this exists specifically for projects that can't use it.

## Usage

A page fetches at build time as normal, then hands the result to a client component that calls the hook:

```tsx
// page.tsx (server component, unchanged)
export default async function Page() {
  const homePage = await client.fetch(homePageQuery)
  if (!homePage) return <EmptyState />
  return <PageContent initialHomePage={homePage} />
}
```

```tsx
// PageContent.tsx
"use client"
import { useLiveSanityData } from "@/sanity/live"

export function PageContent({ initialHomePage }: { initialHomePage: HomePageQueryResult }) {
  const homePage = useLiveSanityData(homePageQuery, initialHomePage)
  // render homePage as before
}
```

That's the whole integration — no other files need to change. Repeat per page/query.

## How it behaves

- **Anonymous visitors**: see whatever was published as of the last build. If a mutation happens on a matching document while they're already on the page, it's applied live. There's no "fetch the latest on load" step for this path — freshness for a fresh page load comes from keeping the build itself current (e.g. a Sanity webhook triggering a rebuild+deploy on publish), not from a client-side catch-up fetch.
- **Signed-in editors**: if this browser holds an authenticated Sanity session (e.g. signed into Studio at `/admin` in another tab on the *same origin*), the hook upgrades to a draft-aware view: an immediate fetch on mount to catch up to the current draft state, then live updates for every subsequent edit — published or not.

## Files

- `useLiveSanityData.ts` — the hook. Everything else is an implementation detail of this.
- `liveSubscribe.ts` — shared `client.listen()` wrapper. Requests `visibility: "query"` and reads the mutation event's own `result` rather than doing a follow-up `fetch()` — the default `visibility: "transaction"` fires as soon as a mutation *commits*, which can race ahead of a separate read hitting a not-yet-consistent replica. Also swallows connection errors: a blocked/failed live connection (ad blockers, network issues) means updates just don't arrive, never an unhandled exception that could blank the page.
- `editorSession.ts` — `hasEditorSession()`, a credentialed `client.users.getById("me")` check.

## Security model

The public path (`publicLiveClient`) is anonymous and published-only — always. The draft-aware path (`editorLiveClient`) is only ever used after `hasEditorSession()` resolves `true`.

Critically: **no token is ever embedded in the client bundle.** `hasEditorSession()` reads an *existing* browser session via `withCredentials: true` — it can only succeed if the visitor is actually signed into Sanity in that browser already. And even then, the real enforcement is server-side: Sanity's own ACL decides whether that session can actually read this project's drafts, regardless of what the client requests. A signed-in-but-unauthorized session's draft fetch just comes back empty (handled — see below), never an error that exposes anything.

Do not extend this pattern by adding a static API token to unlock drafts for everyone. That would ship a credential capable of reading every draft in the project to every visitor's browser.

## Known gotchas (all handled, documented here so a fix doesn't get silently reverted)

- **CORS**: the browser calls Sanity's API directly. Every origin this runs on (`localhost:3000`, your dev/prod domains) needs to be in the project's CORS origins list (manage.sanity.io → API → CORS Origins). Credentials don't need to be "Allowed" for the public path, but do for `hasEditorSession()`/the draft path to work.
- **Read-your-own-write race**: see the `visibility: "query"` note above — using a follow-up `fetch()` after a `listen()` event without it can read stale data.
- **Empty draft result ≠ error**: a session can pass `hasEditorSession()` yet still resolve nothing on the drafts perspective (permissions, cookie-partitioning edge cases). Sanity returns that as an empty/null result, not an error — `useLiveSanityData` explicitly ignores a falsy fetch result rather than letting it overwrite content that was already showing correctly.
- **Stable `params` identity**: the hook's `params` argument defaults to a module-level constant, not an inline `{}`. An inline default creates a new object every render, which — since a live update itself triggers a re-render — would tear down and rebuild the subscription on every single update, dropping whatever mutation arrives in that gap.
- **React StrictMode**: dev-mode double-invokes effects (subscribe → unsubscribe → subscribe). Expected, harmless, already accounted for.

## Lifting this into another project

Copy this `live/` folder into the new project's `src/sanity/`. The only dependency outside the folder is `@/sanity/client` exporting a configured `SanityClient` — standard in any `next-sanity` setup. Then:

1. Confirm the new project is also a client-heavy/static setup without server-side revalidation (otherwise prefer Sanity's official Live Content API instead — see the top of this file).
2. Add the app's own origins to that Sanity project's CORS origins list.
3. Wire `useLiveSanityData` into a page as shown above.
