import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Heart, Leaf } from 'lucide-react';
import { useSaved } from '../context/SavedContext';

export default function ProduceCard({ item, compact = false }) {
  const { saved, toggleSaved } = useSaved();
  const isSaved = saved.produce.includes(item.id);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'Africa/Lagos' }).format(new Date());
  const inSeason = item.season.includes(month);
  const seasonRange = `${item.season[0].slice(0, 3)} – ${item.season.at(-1).slice(0, 3)}`;

  return (
    <article className={`produce-card ${compact ? 'compact' : ''}`}>
      <div className="produce-art">
        <img src={`/images/produce/${item.name.toLowerCase()}.webp`} alt={`Fresh ${item.name.toLowerCase()}`} loading="lazy" width="1254" height="1254" />
      </div>
      <button type="button" className={`save-button ${isSaved ? 'is-saved' : ''}`} onClick={() => toggleSaved('produce', item.id)} aria-label={`${isSaved ? 'Remove' : 'Save'} ${item.name}`} aria-pressed={isSaved}><Heart size={18} fill={isSaved ? 'currentColor' : 'none'} /></button>
      <div className="produce-card-body">
        <span className="card-eyebrow">{item.category}</span>
        <h3>{item.name}</h3>
        {!compact && <p>{item.description}</p>}
        <span className={`season-tag ${inSeason ? 'current' : ''}`}>{inSeason ? <Leaf size={13} /> : <CalendarDays size={13} />}{inSeason ? 'In season now' : seasonRange}</span>
        {!compact && <Link className="produce-market-link" to={`/markets?q=${encodeURIComponent(item.name)}`}>Find at markets <ArrowUpRight size={14} /></Link>}
      </div>
    </article>
  );
}
