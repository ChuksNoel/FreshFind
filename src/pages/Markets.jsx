import { useState } from 'react';
import { Search, SlidersHorizontal, X, SortAsc, SortDesc, ListSortAscending, FilterX } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import markets from '../JSON/markets.json';
import MarketCard from '../components/MarketCard';
import { isOpenToday } from '../utils/market';
import { useClock } from '../context/ClockContext';
import { useHydrated } from '../utils/useHydrated';
import Spanify from '../Components/Spanify';

export default function Markets() {
  const now = useClock();
  const [params, setParams] = useSearchParams();
  const [area, setArea] = useState('All areas');
  const [sort, setSort] = useState(0); // 0 for no sort, 1 for Market, 2 for Location, 3 for nearness to open
  const [order, setOrder] = useState(0); // 0 for Ascending, 1 for Descending
  const [openToday, setOpenToday] = useState(false);
  const hydrated = useHydrated();
  const query = hydrated ? params.get('q') || '' : '';
  const areas = ['All areas', ...new Set(markets.map((market) => market.area))];
  let filtered = markets
    .filter((market) => {
      const matchesQuery = !query || [market.name, market.area, market.address, ...market.produce].some((value) => value.toLowerCase().includes(query.toLowerCase()));
      return matchesQuery && (area === 'All areas' || market.area === area) && (!openToday || isOpenToday(market, now));
    })
    .sort((market1, market2) => { // -1 if less, 0 if equal, 1 if greater
      if (sort == 0) // No Sort
        return undefined;

      else if (sort == 1) // Market Name
        return market1.name.localeCompare(market2.name);

      else if (sort == 2)
        return market1.area.localeCompare(market2.area);

      // Opening Soon
      const currentDay = now.toLocaleString("en-US", { weekday: "long" });
      const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

      function soonness(market) {
        // If open now → 0
        if (
          market.days.includes(currentDay) &&
          currentTime >= market.openingTime &&
          currentTime <= market.closingTime
        ) return 0;

        // Find next opening day/time
        const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ];
        const todayIndex = now.getDay();

        for (let offset = 0; offset < daysOfWeek.length; offset++) {
          const checkDayIndex = (todayIndex + offset) % 7;
          const checkDay = daysOfWeek[checkDayIndex];

          if (market.days.includes(checkDay)) {
            const nextOpen = new Date(now);
            nextOpen.setDate(now.getDate() + offset);

            const [hours, minutes] = market.openingTime.split(":").map(Number);
            nextOpen.setHours(hours, minutes, 0, 0);

            return nextOpen.getTime() - now.getTime(); // ms until next open
          }
        }
        return Infinity; // never opens
      }

      return soonness(market1) - soonness(market2);
      })
    ;

  return (
    <div className="page-section container">
      <div className="page-intro">
        <span className="eyebrow">THE MARKET DIRECTORY</span>
        <h1 aria-label="Find your next fresh find.">
          {Spanify("Find")} {Spanify("your")} {Spanify("next")} {Spanify("fresh")} {Spanify("find.")}
        </h1>
        <p>Discover local markets across Lagos and see what is waiting for you there.</p>
      </div>
      <div className="directory-toolbar">
        <label className="search-field">
          <Search size={19} />
          <input aria-label="Search markets" placeholder="Search a market, area, or produce..." value={query} onChange={(event) => setParams(event.target.value ? { q: event.target.value } : {})} />
          {query && <button type="button" onClick={() => setParams({})} aria-label="Clear search">
            <X size={17} />
          </button>}
        </label>
        <label className="select-field">
          <SlidersHorizontal size={18} />
          <span className="sr-only">Filter by area</span>
          <select value={area} onChange={(event) => setArea(event.target.value)}>
            {areas.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label className="select-field">
          {sort != 0 ?
            <button type="button" className="sort-direction" aria-label={order ? 'Sort ascending' : 'Sort descending'} onClick={() => setOrder(order => (order + 1) % 2)}>
              {order ? <SortDesc /> : <SortAsc />}
            </button>
            :
            <ListSortAscending />
          }
          <span className="sr-only">Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="0">No Sort</option>
            <option value="1">Market</option>
            <option value="2">Location</option>
            <option value="3">Opening time</option>
          </select>
        </label>
        {(sort != 0 || query != "" || area != 'All areas' || openToday ) &&
          <button type="button" aria-label="Clear all filters" onClick={() => { setParams({}); setArea('All areas'); setOpenToday(false); setSort(0); setOrder(0); }}> <FilterX /> </button>}
      </div>
      <div className="filter-row">
        <button type="button" aria-pressed={!openToday} className={`filter-pill ${!openToday ? 'active' : ''}`} onClick={() => setOpenToday(false)}>All markets</button>
        <button type="button" aria-pressed={openToday} className={`filter-pill ${openToday ? 'active' : ''}`} onClick={() => setOpenToday(true)}>Open today</button>
        <span className="result-count" role="status">{filtered.length} {filtered.length === 1 ? 'market' : 'markets'} found</span>
      </div>
      <h2 className="sr-only">Market search results</h2>
      {filtered.length ?
        <div className="market-grid directory-grid">
          {order == 0 ?
            filtered.map((market) => <MarketCard key={market.id} market={market} />)
            :
            filtered.reverse().map((market) => <MarketCard key={market.id} market={market} />)
          }
        </div>
        :
        <div className="empty-state"><Search size={30} />
          <h2>No markets found</h2>
          <p>Try another area or search term.</p>
          <button type="button" className="button button-primary" onClick={() => { setParams({}); setArea('All areas'); setOpenToday(false); setSort(0); setOrder(0); }}>Clear filters</button>
        </div>
      }
      <div className="directory-note">
        <div>
          <span className="eyebrow light">FRESHFIND TIP</span>
          <h2>Go with a little curiosity.</h2>
          <p>Market days can change. Check directly with a market before making a special trip.</p>
        </div>
        <span aria-hidden="true">✳</span>
      </div>
    </div>
  );
}
