import { createContext, useContext, useEffect, useState } from 'react';

const ClockContext = createContext(null);
export function ClockProvider({ initialTime, children }) {
  const [now, setNow] = useState(() => new Date(initialTime || Date.now()));
  useEffect(() => {
    // Preserve the build snapshot while hydrating, then refresh live schedules.
    const first = setTimeout(() => setNow(new Date()), 1000);
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);
  return <ClockContext.Provider value={now}>{children}</ClockContext.Provider>;
}
// eslint-disable-next-line react-refresh/only-export-components
export function useClock() { return useContext(ClockContext); }
