import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Sprout } from 'lucide-react';

export default function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className={`site-footer${pathname === '/' ? ' soil-footer' : ''}`}>
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand"><span className="brand-mark"><Sprout size={20} /></span><span className="brand-copy"><strong>FreshFind</strong><small>FRESH ALL ALONG</small></span></Link>
          <p>Find fresh produce and discover the people growing our Lagos communities, one market at a time.</p>
        </div>
        <div><h3>Explore</h3><Link to="/markets">Market directory</Link><Link to="/produce-guide">Produce guide</Link><Link to="/saved">Saved items</Link></div>
        <div><h3>Made for Lagos</h3><Link to="/about">About FreshFind</Link><Link to="/contact">Contact us</Link><Link to="/login">Sign in</Link><Link to="/signup">Sign up</Link><p>Local discovery, seasonal inspiration, and a simpler way to shop fresh.</p></div>
        <div className="footer-cta"><span>Good food starts close to home.</span><Link to="/markets">Explore markets <ArrowUpRight size={16} /></Link></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} FreshFind</span><span>Fresh all along · Lagos, Nigeria</span></div>
    </footer>
  );
}
