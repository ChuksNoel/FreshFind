import { Heart } from 'lucide-react';
import { useSaved } from '../context/SavedContext';

const produceEmoji = {
  Tomatoes: '🍅', Carrots: '🥕', Spinach: '🥬', Bananas: '🍌',
  Yam: '🍠', Pepper: '🌶️', Cucumber: '🥒', Watermelon: '🍉',
};

const produceTone = {
  Tomatoes: 'tomato', Carrots: 'carrot', Spinach: 'leaf', Bananas: 'banana',
  Yam: 'yam', Pepper: 'pepper', Cucumber: 'cucumber', Watermelon: 'melon',
};

export default function ProduceCard({ item, compact = false }) {
  const { saved, toggleSaved } = useSaved();
  const isSaved = saved.produce.includes(item.id);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'Africa/Lagos' }).format(new Date());
  const inSeason = item.season.includes(month);

  return (
    <article className={`produce-card ${compact ? 'compact' : ''}`}>
      <div className={`produce-art ${produceTone[item.name]}`} aria-hidden="true"><span>{produceEmoji[item.name] || '🌱'}</span></div>
      <button type="button" className={`save-button ${isSaved ? 'is-saved' : ''}`} onClick={() => toggleSaved('produce', item.id)} aria-label={`${isSaved ? 'Remove' : 'Save'} ${item.name}`} aria-pressed={isSaved}><Heart size={18} fill={isSaved ? 'currentColor' : 'none'} /></button>
      <div className="produce-card-body"><span className="card-eyebrow">{item.category}</span><h3>{item.name}</h3>{!compact && <p>{item.description}</p>}<span className={`season-tag ${inSeason ? 'current' : ''}`}>{inSeason ? 'In season now' : `Peak: ${item.season.slice(0, 2).join('–')}`}</span></div>
    </article>
  );
}
