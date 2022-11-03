import { createContext, useContext } from 'react';

const noop = () => {};

const ssrDocument = {
  body: {
    classList: {
      add() {},
      remove() {}
    }
  },
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: ''
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {}
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      }
    };
  }
} as unknown as Document;

const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ''
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener: noop,
  removeEventListener: noop,
  getComputedStyle() {
    return {
      getPropertyValue() {
        return '';
      }
    };
  },
  matchMedia() {
    return {
      matches: false,
      addListener: noop,
      removeListener: noop
    };
  },
  requestAnimationFrame(callback: () => void) {
    if (typeof setTimeout === 'undefined') {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame(id: number) {
    if (typeof setTimeout === 'undefined') return;
    clearTimeout(id);
  },
  setTimeout: () => 0,
  clearTimeout: noop,
  setInterval: () => 0,
  clearInterval: noop
} as unknown as Window;

interface Environment {
  window: Window;
  document: Document;
}

const mockEnv = {
  window: ssrWindow,
  document: ssrDocument
};

const defaultEnv: Environment =
  typeof window !== 'undefined' ? { window, document } : mockEnv;

const EnvironmentContext = createContext(defaultEnv);

EnvironmentContext.displayName = 'EnvironmentContext';

export default function useEnvironment() {
  return useContext(EnvironmentContext);
}
