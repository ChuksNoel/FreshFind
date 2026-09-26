import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, Leaf, Mail, MapPin, ShoppingBasket, Sprout } from 'lucide-react';
import { teamMembers } from '../config/team';
import markets from '../JSON/markets.json';
import produce from '../JSON/produce.json';
import Spanify from '../Components/Spanify';
import '../Style/InfoPages.css';

export default function About() {
  return (
    <div className="info-page">
      <section className="about-intro container" aria-labelledby="about-title">
        <div className="about-intro-copy">
          <span className="eyebrow"><Sprout size={15} /> THE STORY BEHIND FRESHFIND</span>
          <h1 id="about-title" aria-label="Good food has a local story">
            {Spanify("Good")} {Spanify("food")} {Spanify("has")}<br /><em>{Spanify("a")} {Spanify("local")} {Spanify("story.")}</em>
          </h1>
          <p>Ours starts in Lagos. At the market stalls, with the people who sell our everyday ingredients, and the little discoveries that make a shopping trip worthwhile.</p>
          <Link to="/markets" className="button button-primary">Find your next market <ArrowUpRight size={17} /></Link>
          <span className="about-location"><MapPin size={14} /> Made for discovering Lagos</span>
        </div>
        <div className="about-photo">
          <img src="/images/optimized/lagos-market-hero-960.webp" srcSet="/images/optimized/lagos-market-hero-480.webp 480w, /images/optimized/lagos-market-hero-960.webp 960w" sizes="(max-width: 760px) calc(100vw - 36px), 50vw" alt="A shopper choosing vegetables from a stall at a Lagos market" width="1024" height="1024" fetchPriority="high" />
          <div className="about-photo-note"><Leaf size={24} strokeWidth={1.4} /><span>Closer to the market.<br /><strong>Closer to what matters.</strong></span></div>
        </div>
      </section>

      <section className="about-story container" aria-labelledby="story-title">
        <div><span className="eyebrow">WHY WE EXIST</span><h2 id="story-title">A simpler way<br />to shop <em>closer to home.</em></h2></div>
        <div><p>Finding a market should be the easy part. But opening days, locations, and the produce you might find are often scattered across conversations and social posts.</p><p>FreshFind brings those details together. Explore markets by neighbourhood, get to know seasonal ingredients, and keep your favourites in one place before you head out.</p><p className="info-small-note">Our current directory is a small collection of sample listings. Check schedules and availability with sellers before making a special trip.</p></div>
      </section>

      <section className="about-values" aria-labelledby="values-title">
        <div className="container">
          <div className="info-section-heading"><span className="eyebrow">WHAT GUIDES US</span><h2 id="values-title">Rooted in the everyday.</h2></div>
          <div className="about-values-grid">
            <article><span className="info-icon"><MapPin size={24} /></span><h3>Know your neighbourhood.</h3><p>A familiar favourite or somewhere new. We help you explore the markets around Lagos.</p></article>
            <article><span className="info-icon"><ShoppingBasket size={24} /></span><h3>Get to know your food.</h3><p>Learn about the ingredients in your basket and the seasons listed in our produce guide.</p></article>
            <article><span className="info-icon"><Heart size={24} /></span><h3>Keep the good finds.</h3><p>Save the places and produce you love, ready for the next time you go shopping.</p></article>
          </div>
        </div>
      </section>

      <section className="about-how container" aria-labelledby="how-title">
        <div className="info-section-heading"><span className="eyebrow">FROM A LITTLE CURIOSITY TO A FULLER BASKET</span><h2 id="how-title">Your next trip starts here.</h2></div>
        <div className="about-steps">
          <Link to="/markets"><span>01</span><h3>Find a market</h3><p>Browse {markets.length} listings and filter by area or search for your favourite produce.</p><ArrowUpRight size={20} /></Link>
          <Link to="/produce-guide"><span>02</span><h3>Explore what grows</h3><p>Meet {produce.length} familiar ingredients and discover what is listed in season.</p><ArrowUpRight size={20} /></Link>
          <Link to="/saved"><span>03</span><h3>Make it your own</h3><p>Tap a heart to keep a market or ingredient in your saved collection.</p><ArrowUpRight size={20} /></Link>
        </div>
      </section>

      <section className="about-team container" aria-labelledby="team-title">
        <div className="info-section-heading"><span className="eyebrow">THE PEOPLE BEHIND FRESHFIND</span><h2 id="team-title">Meet <em>Team XI.</em></h2><p>A shared project, rooted in local discovery.</p></div>
        <div className="about-team-grid">
          {teamMembers.map((member) => (
            <article className="about-team-card" key={member.email}>
              <span className="about-team-initials" aria-hidden="true">{member.initials}</span>
              <h3>{member.name}</h3>
              {member.id && <p className="about-team-id">ID: {member.id}</p>}
              <a className="about-team-email" href={`mailto:${member.email}`}><Mail size={16} aria-hidden="true" /><span>{member.email}</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="info-invitation container"><div><span className="eyebrow light">LET’S KEEP GROWING</span><h2>Have something to share?</h2><p>A market we should know about, a detail that needs correcting, or just a question.</p></div><Link to="/contact" className="button button-cream">Get in touch <ArrowUpRight size={17} /></Link></section>
    </div>
  );
}
