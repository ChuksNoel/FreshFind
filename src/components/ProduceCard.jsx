import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Heart, Leaf } from 'lucide-react';
import { useSaved } from '../context/SavedContext';
import { useClock } from '../context/ClockContext';

export default function ProduceCard({ item, compact = false }) {
  const { saved, toggleSaved } = useSaved();
  const isSaved = saved.produce.includes(item.id);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'Africa/Lagos' }).format(useClock());
  const inSeason = item.season.includes(month);
  const seasonRange = `${item.season[0].slice(0, 3)} – ${item.season.at(-1).slice(0, 3)}`;

  return (
    <article className={`produce-card ${compact ? 'compact' : ''}`}>
      <div className="produce-art">
        <img src={`/images/optimized/${item.name.toLowerCase()}-400.webp`} srcSet={`/images/optimized/${item.name.toLowerCase()}-320.webp 320w, /images/optimized/${item.name.toLowerCase()}-400.webp 400w`} sizes={compact ? '160px' : '(max-width: 760px) calc((100vw - 54px) / 2), (max-width: 1100px) 30vw, 280px'} alt={`Fresh ${item.name.toLowerCase()}`} loading="lazy" decoding="async" width="400" height="400" />
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
