import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Heart, Leaf, MapPin, Search, ShoppingBasket, Sprout } from 'lucide-react';
import markets from '../JSON/markets.json';
import produce from '../JSON/produce.json';
import MarketCard from '../components/MarketCard';
import ProduceCard from '../components/ProduceCard';

export default function Home2() {
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('All neighbourhoods');
  const navigate = useNavigate();
  const areas = ['All neighbourhoods', ...new Set(markets.map((market) => market.area))];
  const featured = markets.filter((market) => area === 'All neighbourhoods' || market.area === area).slice(0, 3);

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/markets${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`);
  }

  return (
    <>
      <section className="home-hero container">
        <div className="home-hero-content">
          <span className="hero-kicker"><span className="kicker-dot" /> THE LAGOS EDITION</span>
          <h1>A little closer.<br /><em>A lot fresher.</em></h1>
          <p>Good food. Local people. Your next favourite market. Discover the fresh side of Lagos, one neighbourhood at a time.</p>
          <form className="hero-search" onSubmit={handleSearch}>
            <Search size={20} aria-hidden="true" />
            <input aria-label="Search markets or produce" placeholder="Try Ikeja, tomatoes, or a market…" value={search} onChange={(event) => setSearch(event.target.value)} />
            <button type="submit" aria-label="Find markets"><ArrowRight size={21} /></button>
          </form>
          <div className="hero-location"><MapPin size={15} /> Fresh finds across Lagos, Nigeria</div>
          <div className="hero-footnote"><span><strong>{markets.length}</strong> local markets</span><span><strong>{produce.length}</strong> produce guides</span><Leaf size={20} /></div>
        </div>
        <div className="hero-visual">
          <img src="/images/optimized/lagos-market-hero-960.webp" alt="A shopper choosing fresh vegetables at a Lagos market" fetchPriority="high" />
          <div className="hero-photo-caption"><span className="caption-icon"><ShoppingBasket size={22} /></span><span><strong>From the market, with love.</strong><small>Fresh all along. Right here in Lagos.</small></span></div>
          <div className="fresh-stamp" aria-hidden="true"><Sprout size={26} /><span>GROWN LOCAL<br />FOUND FRESH</span></div>
        </div>
      </section>

      <section className="quick-links container" aria-label="Explore FreshFind">
        <Link to="/markets" className="quick-link"><span className="quick-icon"><MapPin size={22} /></span><span><strong>Around the corner</strong><small>Explore Lagos markets</small></span><ArrowUpRight size={18} /></Link>
        <Link to="/produce-guide" className="quick-link"><span className="quick-icon"><Sprout size={22} /></span><span><strong>Picked for the season</strong><small>Meet your fresh favourites</small></span><ArrowUpRight size={18} /></Link>
        <Link to="/saved" className="quick-link"><span className="quick-icon"><Heart size={22} /></span><span><strong>Keep the good finds</strong><small>Build your own collection</small></span><ArrowUpRight size={18} /></Link>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">01 / OUT IN THE NEIGHBOURHOOD</span><h2>Your next market morning.</h2><p>Find a familiar favourite or a new reason to take the scenic route.</p></div><Link className="text-link" to="/markets">All markets <ArrowUpRight size={18} /></Link></div>
          <div className="neighbourhood-filters" aria-label="Choose a neighbourhood">{areas.map((name) => <button key={name} type="button" className={`filter-pill ${area === name ? 'active' : ''}`} aria-pressed={area === name} onClick={() => setArea(name)}>{name}</button>)}</div>
          <div className="market-grid">{featured.map((market) => <MarketCard key={market.id} market={market} />)}</div>
        </div>
      </section>

      <section className="seasonal-section container">
        <div className="seasonal-banner">
          <div className="seasonal-banner-copy"><span className="eyebrow light"><Sprout size={15} /> A LITTLE SEASONAL INSPIRATION</span><h2>Good things<br />grow in season.</h2><p>Yam for a comforting meal. Greens for the pot. Get to know the produce that makes every market trip worth it.</p><Link className="button button-cream" to="/produce-guide">Explore the produce guide <ArrowUpRight size={17} /></Link><span className="seasonal-note">A little knowledge. A fresher basket.</span></div>
          <div className="seasonal-banner-image" role="img" aria-label="Yam, tomatoes, peppers, and fresh greens on a wooden table"><span className="photo-label">FRESH FROM THE EARTH</span></div>
        </div>
      </section>

      <section className="section produce-section container">
        <div className="section-heading"><div><span className="eyebrow">02 / GET TO KNOW YOUR PRODUCE</span><h2>Everyday ingredients.<br className="mobile-break" /> Extraordinary possibilities.</h2><p>A few familiar faces for your next shopping basket.</p></div><Link className="text-link" to="/produce-guide">The full guide <ArrowUpRight size={18} /></Link></div>
        <div className="produce-grid">{produce.slice(0, 4).map((item) => <ProduceCard key={item.id} item={item} compact />)}</div>
      </section>

      <section className="values-strip"><div className="container values-grid"><div><span><Leaf size={23} /></span><h3>A little more local.</h3><p>Discover fresh food and the neighbourhoods around you.</p></div><div><span><ShoppingBasket size={23} /></span><h3>A little more thoughtful.</h3><p>Get to know what you buy and when to look for it.</p></div><div><span><Heart size={23} /></span><h3>A little more you.</h3><p>Save the places and produce you want to come back to.</p></div></div></section>
    </>
  );
}
