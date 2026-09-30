import { useSyncExternalStore } from 'react';

let isNotFound = false;
const listeners = new Set();

export function setNotFound(value) {
  if (isNotFound === value) return;
  isNotFound = value;
  listeners.forEach((fn) => fn());
}

export function subscribeNotFound(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getNotFound() {
  return isNotFound;
}

export function getNotFoundServerSnapshot() {
  return false;
}

// Hook form for client components that must hide ads on the 404 page.
export function useIsNotFound() {
  return useSyncExternalStore(subscribeNotFound, getNotFound, getNotFoundServerSnapshot);
}
