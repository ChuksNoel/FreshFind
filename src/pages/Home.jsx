import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Leaf, MapPin, Search, ShieldCheck, Sprout } from 'lucide-react';
import markets from '../JSON/markets.json';
import produce from '../JSON/produce.json';
import MarketCard from '../components/MarketCard';
import ProduceCard from '../components/ProduceCard';

export default function Home() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/markets${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`);
  }

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-shade" />
        <div className="container home-hero-content">
          <span className="hero-kicker"><span className="kicker-dot" /> FRESH ALL ALONG · LAGOS</span>
          <h1>Good food is<br /><em>closer than you think.</em></h1>
          <p>Explore Lagos markets, find local produce, and bring something fresher to the table.</p>
          <form className="hero-search" onSubmit={handleSearch}>
            <Search size={21} aria-hidden="true" />
            <input aria-label="Search markets or produce" placeholder="Search markets, areas, or produce..." value={search} onChange={(event) => setSearch(event.target.value)} />
            <button type="submit">Find markets <ArrowRight size={18} /></button>
          </form>
          <div className="hero-location"><MapPin size={16} /> Discovering fresh finds across Lagos</div>
        </div>
      </section>

      <section className="quick-links container" aria-label="Explore FreshFind">
        <Link to="/markets" className="quick-link"><span className="quick-icon"><MapPin size={21} /></span><span><strong>Explore markets</strong><small>Find a market near you</small></span><ArrowUpRight size={18} /></Link>
        <Link to="/produce-guide" className="quick-link"><span className="quick-icon amber"><Sprout size={21} /></span><span><strong>Seasonal produce</strong><small>Know what to look for</small></span><ArrowUpRight size={18} /></Link>
        <Link to="/saved" className="quick-link"><span className="quick-icon pale"><Leaf size={21} /></span><span><strong>Your saved finds</strong><small>Keep good things close</small></span><ArrowUpRight size={18} /></Link>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">LOCAL DISCOVERY</span><h2>Markets across Lagos</h2><p>Start with a few neighborhood favorites, then explore the full directory.</p></div><Link className="text-link" to="/markets">View all markets <ArrowRight size={18} /></Link></div>
          <div className="market-grid">{markets.slice(0, 3).map((market) => <MarketCard key={market.id} market={market} />)}</div>
        </div>
      </section>

      <section className="section container">
        <div className="seasonal-banner"><div className="seasonal-banner-copy"><span className="eyebrow light">THE PRODUCE GUIDE</span><h2>Fresh ideas for<br />every season.</h2><p>From market staples to new discoveries, learn when to find your favorites around Lagos.</p><Link className="button button-cream" to="/produce-guide">Explore produce <ArrowUpRight size={17} /></Link></div><div className="seasonal-banner-image" role="img" aria-label="A selection of fresh Nigerian produce" /></div>
      </section>

      <section className="section produce-section container">
        <div className="section-heading"><div><span className="eyebrow">FROM THE MARKET</span><h2>Meet your fresh favorites</h2><p>Get to know the produce you can look for in local markets.</p></div><Link className="text-link" to="/produce-guide">See the guide <ArrowRight size={18} /></Link></div>
        <div className="produce-grid">{produce.slice(0, 4).map((item) => <ProduceCard key={item.id} item={item} compact />)}</div>
      </section>

      <section className="values-strip"><div className="container values-grid"><div><span><Leaf size={22} /></span><h3>Shop more locally</h3><p>Explore fresh food in the neighborhoods around you.</p></div><div><span><MapPin size={22} /></span><h3>Know where to go</h3><p>See market locations, opening days, and produce at a glance.</p></div><div><span><ShieldCheck size={22} /></span><h3>Plan with confidence</h3><p>Save your favorites for your next market trip.</p></div></div></section>
    </>
  );
}
