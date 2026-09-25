import { createContext, useContext, useEffect, useState } from 'react';

const SavedContext = createContext(null);
const STORAGE_KEY = 'freshfind-saved';

function initialSaved() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      markets: Array.isArray(value.markets) ? value.markets : [],
      produce: Array.isArray(value.produce) ? value.produce : [],
    };
  } catch {
    return { markets: [], produce: [] };
  }
}

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState(initialSaved);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch { /* Storage may be unavailable. */ }
  }, [saved]);

  function toggleSaved(type, id) {
    setSaved((current) => {
      const ids = current[type];
      return {
        ...current,
        [type]: ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id],
      };
    });
  }

  return <SavedContext.Provider value={{ saved, toggleSaved }}>{children}</SavedContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSaved() {
  return useContext(SavedContext);
}
