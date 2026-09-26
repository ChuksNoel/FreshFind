import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Clock3, Heart, MapPin, Navigation, Sprout } from 'lucide-react';
import markets from '../JSON/markets.json';
import { useSaved } from '../context/SavedContext';
import { formatTime, isOpenNow, marketImage } from '../utils/market';
import Spanify from '../Components/Spanify';
import { useClock } from '../context/ClockContext';

export default function MarketsDetails() {
  const { id } = useParams();
  const market = markets.find((item) => String(item.id) === id);
  const { saved, toggleSaved } = useSaved();
  const now = useClock();
  if (!market) return <div className="container empty-page"><h1>Market not found</h1><Link className="button button-primary" to="/markets">Browse markets</Link></div>;
  const isSaved = saved.markets.includes(market.id);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${market.latitude},${market.longitude}`;

  return (
    <>
      <section className="detail-hero" style={{ '--market-photo': `url(${marketImage(market, 960)})`, '--market-photo-mobile': `url(${marketImage(market, 480)})` }}>
        <div className="container detail-hero-inner">
          <Link to="/markets" className="back-link">
            <ArrowLeft size={17} /> Back to markets
          </Link>
          <span className={`status-badge ${isOpenNow(market, now) ? 'open' : 'closed'}`}>
            {isOpenNow(market, now) ? 'Open now' : 'Closed now'}</span>
          <h1 aria-label={market.name}>{Spanify(market.name)}</h1>
          <p>
            <MapPin size={17} /> {market.address}</p>
          <div className="detail-hero-actions">
            <button type="button" aria-pressed={isSaved} className={`button button-light ${isSaved ? 'saved' : ''}`} onClick={() => toggleSaved('markets', market.id)}>
              <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Saved' : 'Save market'}</button>
            <a className="button button-primary" href={mapsUrl} target="_blank" rel="noreferrer">
              <Navigation size={17} /> Get directions
            </a>
          </div>
        </div>
      </section>

      <div className="container detail-layout">
        <div className="detail-main">
          <section className="detail-panel">
            <span className="eyebrow">GET TO KNOW THE MARKET</span>
            <h2>About this market</h2>
            <p>{market.description}</p>
            <p>Browse the produce listed below and plan your visit around its regular market days.</p>
          </section>
          <section className="detail-panel">
            <span className="eyebrow">WHAT YOU MAY FIND</span>
            <h2>Fresh from the stalls</h2>
            <div className="detail-produce-list">
              {market.produce.map((item) => <span key={item}><Sprout size={16} /> {item}</span>)}
            </div>
            <Link to="/produce-guide" className="text-link">
              Explore produce guide <ArrowUpRight size={18} />
            </Link>
          </section>
        </div>
        <aside className="detail-aside">
          <div className="schedule-card">
            <div className="aside-heading">
              <Clock3 size={20} />
              <h2>Plan your visit</h2>
            </div>
            <div className="schedule-times">
              <span>Regular hours</span>
              <strong>{formatTime(market.openingTime)} – {formatTime(market.closingTime)}</strong>
            </div>
            <div className="schedule-days">
              <span>Market days</span>
              <div>
                {market.days.map((day) => <span key={day}>{day}</span>)}
              </div>
            </div>
            <p>Schedules may change on holidays. Confirm with the market before visiting.</p>
          </div>
          <div className="map-card">
            <MapPin size={24} />
            <h3>{market.area}, Lagos</h3>
            <p>{market.address}</p>
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              Open in Google Maps <ArrowUpRight size={16} />
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
