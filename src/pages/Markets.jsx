import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import markets from '../JSON/markets.json';
import MarketCard from '../components/MarketCard';
import { isOpenToday } from '../utils/market';

export default function Markets() {
  const [params, setParams] = useSearchParams();
  const [area, setArea] = useState('All areas');
  const [openToday, setOpenToday] = useState(false);
  const query = params.get('q') || '';
  const areas = ['All areas', ...new Set(markets.map((market) => market.area))];
  const filtered = markets.filter((market) => {
    const matchesQuery = !query || [market.name, market.area, market.address, ...market.produce].some((value) => value.toLowerCase().includes(query.toLowerCase()));
    return matchesQuery && (area === 'All areas' || market.area === area) && (!openToday || isOpenToday(market));
  });

  return (
    <div className="page-section container">
      <div className="page-intro"><span className="eyebrow">THE MARKET DIRECTORY</span><h1>Find your next fresh find.</h1><p>Discover local markets across Lagos and see what is waiting for you there.</p></div>
      <div className="directory-toolbar"><label className="search-field"><Search size={19} /><input aria-label="Search markets" placeholder="Search a market, area, or produce..." value={query} onChange={(event) => setParams(event.target.value ? { q: event.target.value } : {})} />{query && <button type="button" onClick={() => setParams({})} aria-label="Clear search"><X size={17} /></button>}</label><label className="select-field"><SlidersHorizontal size={18} /><span className="sr-only">Filter by area</span><select value={area} onChange={(event) => setArea(event.target.value)}>{areas.map((option) => <option key={option}>{option}</option>)}</select></label></div>
      <div className="filter-row"><button type="button" className={`filter-pill ${!openToday ? 'active' : ''}`} onClick={() => setOpenToday(false)}>All markets</button><button type="button" className={`filter-pill ${openToday ? 'active' : ''}`} onClick={() => setOpenToday(true)}>Open today</button><span className="result-count">{filtered.length} {filtered.length === 1 ? 'market' : 'markets'} found</span></div>
      {filtered.length ? <div className="market-grid directory-grid">{filtered.map((market) => <MarketCard key={market.id} market={market} />)}</div> : <div className="empty-state"><Search size={30} /><h2>No markets found</h2><p>Try another area or search term.</p><button type="button" className="button button-primary" onClick={() => { setParams({}); setArea('All areas'); setOpenToday(false); }}>Clear filters</button></div>}
      <div className="directory-note"><div><span className="eyebrow light">FRESHFIND TIP</span><h2>Go with a little curiosity.</h2><p>Market days can change. Check directly with a market before making a special trip.</p></div><span aria-hidden="true">✳</span></div>
    </div>
  );
}
