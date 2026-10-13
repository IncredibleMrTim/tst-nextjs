import '@testing-library/jest-dom';

// app/sanity/env.ts asserts these at import time; any component that renders
// Portable Text pulls it in, so give tests inert values.
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??= 'test-project';
process.env.NEXT_PUBLIC_SANITY_DATASET ??= 'test';

// jsdom has no layout engine, so provide inert versions of the browser APIs
// that components use for scrolling and observing sections.
window.HTMLElement.prototype.scrollIntoView = jest.fn();

class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}
window.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

window.matchMedia =
  window.matchMedia ??
  jest.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }));
