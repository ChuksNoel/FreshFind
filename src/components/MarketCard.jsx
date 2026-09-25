import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3, Heart, MapPin } from 'lucide-react';
import { useSaved } from '../context/SavedContext';
import { formatTime, isOpenNow, marketImage } from '../utils/market';

export default function MarketCard({ market }) {
  const { saved, toggleSaved } = useSaved();
  const isSaved = saved.markets.includes(market.id);
  const open = isOpenNow(market);

  return (
    <article className="market-card">
      <div className="market-card-image-wrap">
        <Link className="market-card-image-link" to={`/markets/${market.id}`} aria-label={`Explore ${market.name}`}>
        <img src={marketImage(market)} alt={`Fresh produce at a Lagos market`} className="market-card-image" loading="lazy" />
        </Link>
        <span className={`status-badge ${open ? 'open' : 'closed'}`}>{open ? 'Open now' : 'Closed now'}</span>
        <button type="button" className={`save-button ${isSaved ? 'is-saved' : ''}`} onClick={() => toggleSaved('markets', market.id)} aria-label={`${isSaved ? 'Remove' : 'Save'} ${market.name}`} aria-pressed={isSaved}><Heart size={18} fill={isSaved ? 'currentColor' : 'none'} /></button>
      </div>
      <div className="market-card-body">
        <div className="card-eyebrow">{market.area} · Lagos</div>
        <h3><Link to={`/markets/${market.id}`}>{market.name}</Link></h3>
        <p className="card-meta"><MapPin size={15} /> {market.address}</p>
        <p className="card-meta"><Clock3 size={15} /> {formatTime(market.openingTime)} – {formatTime(market.closingTime)}</p>
        <div className="card-tags">{market.produce.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>
        <Link to={`/markets/${market.id}`} className="card-action">View market <ArrowUpRight size={16} /></Link>
      </div>
    </article>
  );
}
