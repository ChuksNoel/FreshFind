import { useState } from 'react';
import { Search, Sprout } from 'lucide-react';
import produce from '../JSON/produce.json';
import ProduceCard from '../components/ProduceCard';

export default function ProduceGuide() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All produce');
  const [seasonOnly, setSeasonOnly] = useState(false);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'Africa/Lagos' }).format(new Date());
  const categories = ['All produce', ...new Set(produce.map((item) => item.category))];
  const filtered = produce.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) && (category === 'All produce' || item.category === category) && (!seasonOnly || item.season.includes(month)));

  return (
    <>
      <section className="produce-hero"><div className="container produce-hero-inner"><span className="hero-kicker">THE FRESHFIND GUIDE</span><h1>Get to know what grows.</h1><p>A simple guide to fresh produce you can look for around Lagos, and when each item is at its best.</p></div></section>
      <div className="container page-section produce-page"><div className="section-heading"><div><span className="eyebrow">EXPLORE PRODUCE</span><h2>From the market to your table</h2><p>Find familiar favorites and discover something new.</p></div></div><div className="directory-toolbar"><label className="search-field"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search produce..." aria-label="Search produce" /></label><label className="select-field"><Sprout size={18} /><span className="sr-only">Filter by category</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((option) => <option key={option}>{option}</option>)}</select></label></div><div className="filter-row"><button type="button" className={`filter-pill ${!seasonOnly ? 'active' : ''}`} onClick={() => setSeasonOnly(false)}>All produce</button><button type="button" className={`filter-pill ${seasonOnly ? 'active' : ''}`} onClick={() => setSeasonOnly(true)}>In season this {month}</button><span className="result-count">{filtered.length} {filtered.length === 1 ? 'item' : 'items'}</span></div>{filtered.length ? <div className="produce-grid guide-grid">{filtered.map((item) => <ProduceCard key={item.id} item={item} />)}</div> : <div className="empty-state"><Sprout size={30} /><h2>No produce found</h2><p>Try a different search or category.</p></div>}<div className="produce-tip"><span className="eyebrow light">SHOPPING TIP</span><h2>Let the season lead.</h2><p>Freshness and availability vary by market. Ask local sellers what is at its best today.</p></div></div>
    </>
  );
}
