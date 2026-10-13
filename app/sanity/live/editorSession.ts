import { client } from "@/sanity/client"

/**
 * Checks whether this browser already holds an authenticated Sanity
 * session (e.g. the visitor is signed into Studio in another tab on
 * the same origin) — reads the existing session cookie via
 * withCredentials, never ships a static token. Returns false for
 * anonymous visitors. A signed-in Sanity account with no access to
 * this project still can't read its drafts: that's enforced
 * server-side by Sanity's own ACL, not by this check.
 */
export async function hasEditorSession(): Promise<boolean> {
  try {
    const user = await client
      .withConfig({ withCredentials: true })
      .users.getById("me")
    return Boolean(user)
  } catch {
    return false
  }
}
