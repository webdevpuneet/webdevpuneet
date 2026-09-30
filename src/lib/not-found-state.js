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
