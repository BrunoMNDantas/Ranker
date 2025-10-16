// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill for structuredClone (not available in Jest environment)
if (!global.structuredClone) {
  global.structuredClone = function structuredClone<T>(obj: T): T {
    if (obj === undefined) return undefined as T;
    if (obj === null) return null as T;
    return JSON.parse(JSON.stringify(obj));
  };
}

// Polyfill for crypto.randomUUID (not available in Jest environment)
if (!global.crypto) {
  global.crypto = {} as Crypto;
}
if (!global.crypto.randomUUID) {
  global.crypto.randomUUID = function randomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
}
