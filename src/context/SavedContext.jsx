import { createContext, useContext, useSyncExternalStore } from 'react';

const SavedContext = createContext(null);
const STORAGE_KEY = 'freshfind-saved';
const emptySaved = { markets: [], produce: [] };
let cachedRaw;
let cachedSaved = emptySaved;
let memoryOnly = false;

function initialSaved() {
  if (typeof window === 'undefined') return emptySaved;
  if (memoryOnly) return cachedSaved;
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || '{}';
    if (raw === cachedRaw) return cachedSaved;
    const value = JSON.parse(raw);
    cachedRaw = raw;
    cachedSaved = {
      markets: Array.isArray(value.markets) ? value.markets : [],
      produce: Array.isArray(value.produce) ? value.produce : [],
    };
    return cachedSaved;
  } catch {
    return cachedSaved;
  }
}

function subscribe(callback) {
  window.addEventListener('storage', callback);
  window.addEventListener('freshfind-saved-change', callback);
  return () => { window.removeEventListener('storage', callback); window.removeEventListener('freshfind-saved-change', callback); };
}

export function SavedProvider({ children }) {
  const saved = useSyncExternalStore(subscribe, initialSaved, () => emptySaved);

  function toggleSaved(type, id) {
    const current = initialSaved();
    const ids = current[type];
    cachedSaved = { ...current, [type]: ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id] };
    cachedRaw = JSON.stringify(cachedSaved);
    try { localStorage.setItem(STORAGE_KEY, cachedRaw); } catch { memoryOnly = true; }
    window.dispatchEvent(new Event('freshfind-saved-change'));
  }

  return <SavedContext.Provider value={{ saved, toggleSaved }}>{children}</SavedContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSaved() {
  return useContext(SavedContext);
}
