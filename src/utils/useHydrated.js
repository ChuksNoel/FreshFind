import { useSyncExternalStore } from 'react';
const subscribe = () => () => {};
// Query filters are applied after the static route snapshot hydrates.
export function useHydrated() { return useSyncExternalStore(subscribe, () => true, () => false); }
