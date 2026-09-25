import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, MapPin, Sprout } from 'lucide-react';
import markets from '../JSON/markets.json';
import produce from '../JSON/produce.json';
import MarketCard from '../components/MarketCard';
import ProduceCard from '../components/ProduceCard';
import { useSaved } from '../context/SavedContext';

export default function Bookmarks() {
  const [tab, setTab] = useState('markets');
  const { saved } = useSaved();
  const savedMarkets = markets.filter((item) => saved.markets.includes(item.id));
  const savedProduce = produce.filter((item) => saved.produce.includes(item.id));

  return <div className="container page-section"><div className="page-intro"><span className="eyebrow"><Heart size={14} /> YOUR COLLECTION</span><h1>Saved for later.</h1><p>All your favorite Lagos markets and produce in one easy place.</p></div><div className="saved-tabs" role="tablist" aria-label="Saved items"><button role="tab" aria-selected={tab === 'markets'} className={tab === 'markets' ? 'active' : ''} onClick={() => setTab('markets')}><MapPin size={18} /> Markets <span>{savedMarkets.length}</span></button><button role="tab" aria-selected={tab === 'produce'} className={tab === 'produce' ? 'active' : ''} onClick={() => setTab('produce')}><Sprout size={18} /> Produce <span>{savedProduce.length}</span></button></div>{tab === 'markets' ? (savedMarkets.length ? <div className="market-grid directory-grid">{savedMarkets.map((market) => <MarketCard key={market.id} market={market} />)}</div> : <div className="empty-state"><Heart size={31} /><h2>No saved markets yet</h2><p>Tap the heart on a market to keep it here for your next trip.</p><Link to="/markets" className="button button-primary">Explore markets <ArrowRight size={17} /></Link></div>) : (savedProduce.length ? <div className="produce-grid guide-grid">{savedProduce.map((item) => <ProduceCard key={item.id} item={item} />)}</div> : <div className="empty-state"><Sprout size={31} /><h2>No saved produce yet</h2><p>Find your favorites in the guide and save them here.</p><Link to="/produce-guide" className="button button-primary">Explore produce <ArrowRight size={17} /></Link></div>)}<div className="saved-promo"><div><span className="eyebrow light">KEEP EXPLORING</span><h2>There is always something fresh to find.</h2><p>See what is waiting at markets across Lagos.</p><Link to="/markets" className="button button-cream">Browse markets <ArrowRight size={17} /></Link></div></div></div>;
}
