import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Heart, Leaf, MapPin, Pause, Play, Search, Sprout } from 'lucide-react';
import markets from '../JSON/markets.json';
import produce from '../JSON/produce.json';
import ProduceCard from '../components/ProduceCard';
import { marketImage } from '../utils/market';
import '../Style/TreeHome.css';
import Spanify from '../Components/Spanify';

// Home1's canopy → hanging panes → roots outline, with a shared scroll-driven axis.
function useTreeMotion(root, enabled) {
  useEffect(() => {
    const element = root.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const journey = element.querySelector('.tree-journey');
    const sections = [...element.querySelectorAll('.tree-chapter')];
    let frame = 0;
    function paint() {
      frame = 0;
      if (!enabled || preference.matches) {
        element.style.setProperty('--tree-turn', '0deg');
        sections.forEach(section => section.style.setProperty('--branch-turn', '0deg'));
        return;
      }
      const viewportCenter = window.innerHeight / 2;
      const top = journey.getBoundingClientRect().top;
      const turn = (viewportCenter - top) * 0.065;
      element.style.setProperty('--tree-turn', `${turn}deg`);
      sections.forEach((section) => {
        const bounds = section.getBoundingClientRect();
        // Each branch has a different starting angle on the same turning trunk.
        // Limit off-screen rotation so content never flips or becomes inaccessible.
        const angle = Math.max(-42, Math.min(42, (viewportCenter - bounds.top - bounds.height / 2) * 0.065));
        section.style.setProperty('--branch-turn', `${angle}deg`);
      });
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(paint);
    }
    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', schedule);
      observer.disconnect();
    };
  }, [root, enabled]);
}

function TreeSpine() {
  return (
    <div className="beanstalk" aria-hidden="true">
      <div className="beanstalk-cylinder">
        {Array.from({ length: 12 }, (_, index) => <i className="bark-face" key={index} style={{ '--face': index }} />)}
        {Array.from({ length: 15 }, (_, index) => (
          <span className="trunk-sprig" key={index} style={{ '--sprig': index }}><i /><i /></span>
        ))}
      </div>
    </div>
  );
}

function TreeChapter({ number, side = 'right', title, note, children, id }) {
  return (
    <section id={id} className={`tree-chapter tree-chapter-${side}`} aria-labelledby={`${id}-title`}>
      <div className="chapter-caption" aria-hidden="true"><span>{number}</span><p>{note}</p><Leaf size={22} strokeWidth={1} /></div>
      <div className="branch-arm">
        <div className="living-branch" aria-hidden="true"><i /><i /><i /></div>
        <div className="branch-panel">
          <span className="eyebrow"><span className="chapter-seed">{number}</span> {title}</span>
          {children}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const root = useRef(null);
  const [search, setSearch] = useState('');
  const [motion, setMotion] = useState(true);
  const navigate = useNavigate();
  useTreeMotion(root, motion);

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/markets${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`);
  }

  return (
    <div ref={root} className={`tree-home${motion ? '' : ' tree-is-still'}`}>
      <section className="tree-hero" aria-labelledby="tree-title">
        <div className="tree-hero-orbit" aria-hidden="true" />
        <div className="tree-hero-copy">
          <span className="hero-kicker">
            <span className="kicker-dot" />
            ROOTED IN LAGOS. GROWING CLOSER.
          </span>

          <h1 id="tree-title" aria-label="Fresh Find. Deep Roots.">
            {Spanify('Fresh')} {Spanify('Find.')}<br />{Spanify('Deep')} {Spanify('Roots.')}</h1>
          <p>
            Follow the branches to good food, local markets,
            <br className="tree-desktop-break" />
            and a little more connection to where it all begins.
          </p>
          <form className="hero-search tree-search" role="search" action="/markets" method="get" onSubmit={handleSearch}>
            <Search size={20} aria-hidden="true" />
            <input name="q" aria-label="Search markets or produce" placeholder="A neighbourhood, a market, a fresh craving…" value={search} onChange={(event) => setSearch(event.target.value)} />
            <button type="submit" aria-label="Find markets">
              <ArrowUpRight size={21} />
            </button>
          </form>
          <span className="tree-location"><MapPin size={13} /> A little closer to the fresh side of Lagos</span>
        </div>
        <picture><source type="image/avif" media="(max-width: 760px)" srcSet="/images/optimized/canopy-640.avif" /><source type="image/avif" srcSet="/images/optimized/canopy-1120.avif" /><source media="(max-width: 760px)" srcSet="/images/optimized/canopy-640.webp" /><img className="tree-canopy" src="/images/optimized/canopy-1120.webp" alt="" width="1536" height="1024" fetchPriority="high" /></picture>
        <span className="canopy-note canopy-note-left">
          <Sprout size={21} />
          <span>
            Grown with care.
            <br />
            <strong>Found close to home.</strong>
          </span>
        </span>
        <span className="canopy-note canopy-note-right"><span className="canopy-count">{markets.length}</span><span>neighbourhood markets.<br /><strong>So much to discover.</strong></span></span>
        <a className="tree-scroll" href="#market-branch"><span>FOLLOW THE ROOTS</span><ArrowDown size={16} /></a>
        <div className="tree-hero-foot"><span>THE FRESHFIND TREE</span><span>Every good thing starts somewhere.</span><span>01 — 03</span></div>
      </section>

      <div className="tree-journey">
        <TreeSpine />
        <div className="tree-journey-tools">
          <span><Sprout size={15} /> A small journey. A fresher everyday.</span>
          <button type="button" className="tree-motion-toggle" aria-pressed={!motion} onClick={() => setMotion(!motion)}>{motion ? <Pause size={13} /> : <Play size={13} />}{motion ? 'Pause tree motion' : 'Resume tree motion'}</button>
        </div>

        <TreeChapter id="market-branch" number="01" title="THE NEIGHBOURHOOD BRANCH" note={<>Good food.<br />Even better company.</>}>
          <h2 id="market-branch-title">A market morning,<br /><em>made for you.</em></h2>
          <p>Familiar faces. Full baskets. Find your next favourite spot, right here in Lagos.</p>
          <div className="branch-market-list">
            {markets.slice(0, 2).map((market) => (
              <Link key={market.id} to={`/markets/${market.id}`} className="branch-market">
                <img src={marketImage(market, 160)} alt="Fresh produce at a Lagos market" loading="lazy" width="100" height="100" />
                <span><small><MapPin size={11} />{market.area}, Lagos</small><strong>{market.name}</strong><span>Discover this market</span></span>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
          <Link to="/markets" className="text-link">Explore all markets <ArrowUpRight size={17} /></Link>
        </TreeChapter>

        <TreeChapter id="produce-branch" number="02" side="left" title="THE SEASONAL BRANCH" note={<>A little knowledge.<br />A fresher basket.</>}>
          <h2 id="produce-branch-title">Good things<br /><em>grow in season.</em></h2>
          <p>From the earth to your everyday. Get to know what’s in your basket, and when it’s at its best.</p>
          <div className="branch-produce-grid">{produce.slice(0, 2).map((item) => <ProduceCard key={item.id} item={item} compact />)}</div>
          <Link to="/produce-guide" className="text-link">Meet your fresh favourites <ArrowUpRight size={17} /></Link>
        </TreeChapter>

        <TreeChapter id="saved-branch" number="03" title="YOUR OWN LITTLE BRANCH" note={<>Keep what you love.<br />Come back for more.</>}>
          <div className="branch-saved-photo"><img src="/images/optimized/seasonal-produce-480.webp" alt="Yam, peppers, tomatoes and leafy greens gathered on a table" loading="lazy" width="800" height="450" /><span><Heart size={17} /> A basket full of possibilities</span></div>
          <h2 id="saved-branch-title">Let your favourites<br /><em>take root.</em></h2>
          <p>That market you loved. The produce you want to try. Keep your good finds together for the next trip.</p>
          <Link to="/saved" className="button button-primary">My saved finds <ArrowUpRight size={17} /></Link>
        </TreeChapter>
      </div>

      <section className="tree-roots" aria-labelledby="roots-title">
        <div className="roots-copy"><span className="eyebrow">FRESH ALL ALONG</span><h2 id="roots-title">It all comes back<br />to <em>our roots.</em></h2><p>Good food connects us.<br />To the earth. To our neighbours. To home.</p><Link to="/markets" className="text-link">Find your fresh start <ArrowUpRight size={17} /></Link></div>
        <img src="/images/optimized/roots-760.webp" alt="The tree’s moss-covered stump and spreading roots reaching into the earth" className="roots-art" loading="lazy" width="1536" height="1024" />
        <div className="roots-signoff"><Sprout size={25} strokeWidth={1.3} /><span>ROOTED IN COMMUNITY.<br />FRESH ALL ALONG.</span></div>
        <div className="earth-edge" aria-hidden="true" />
      </section>
    </div>
  );
}
