import "@testing-library/jest-dom";

// Mock IntersectionObserver for JSDOM
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = () => null;
  unobserve = () => null;
  disconnect = () => null;
  takeRecords = () => [];
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock matchMedia for JSDOM
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => null,
    removeListener: () => null,
    addEventListener: () => null,
    removeEventListener: () => null,
    dispatchEvent: () => false,
  }),
});
