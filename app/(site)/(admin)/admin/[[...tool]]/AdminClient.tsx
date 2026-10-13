"use client"

import { NextStudio } from "next-sanity/studio"
import { useEffect } from "react"

import config from "../../../../../sanity.config"
import "./admin-branding.css"

// Sanity's own "Sign out" menu item has no redirect option, and Studio
// unmounts its own component tree on sign-out (swapping straight to its
// login screen), so a component nested inside that tree can't reliably
// react to the transition — it gets torn down before or during the
// re-render, not after. Listening for the click itself, from this
// component that Studio never unmounts, sidesteps that entirely.
//
// This is a hard navigation rather than next/navigation's router: Studio
// is a self-contained app with its own CSS-in-JS theming, and a soft
// client-side transition out of it leaves the public site rendering
// without its own stylesheet applied. A full reload gives the public
// site a clean load.
function useRedirectOnSignOut() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return
      const menuItem = target.closest('[role="menuitem"]')
      if (menuItem?.textContent?.trim() === "Sign out") {
        window.location.href = "/"
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])
}

export default function AdminClient() {
  useRedirectOnSignOut()
  return <NextStudio config={config} />
}
