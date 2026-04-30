import '@testing-library/jest-dom/vitest';

class ResizeObserverMock {
  observe = () => undefined;
  unobserve = () => undefined;
  disconnect = () => undefined;
}

globalThis.ResizeObserver = ResizeObserverMock;

ElementInternals.prototype.setFormValue = () => undefined;
ElementInternals.prototype.setValidity = () => undefined;
