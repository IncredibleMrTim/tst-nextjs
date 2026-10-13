'use client';
export const getCurrentUrlPath = (path: string) =>
  window.location.pathname === path;

/**
 * Smooth scrolling unless the visitor has asked their device to reduce motion.
 */
export const getScrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';
