import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Menu, Search, Sprout, X } from 'lucide-react';
import { useSaved } from '../context/SavedContext';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const { length } = useSaved();
  const links = [
    { to: '/', label: 'Discover' },
    { to: '/markets', label: 'Markets' },
    { to: '/produce-guide', label: 'Produce Guide' },
    { to: '/saved', label: 'Saved' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><Sprout size={22} strokeWidth={2.2} /></span>
          <span className="brand-copy"><strong>FreshFind</strong><small>FRESH ALL ALONG</small></span>
        </Link>
        <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {links.map((link) => <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{link.label}</NavLink>)}
        </nav>
        <div className="header-actions">
          <Link className="icon-link" to="/markets" aria-label="Search markets"><Search size={19} /></Link>
          <Link className="icon-link saved-link" to="/saved" aria-label="Saved items"><Heart fill={length? 'currentColor' : 'transparent'} size={19} /> {(length > 0) && <small className='bubble' role='note'>{length}</small>}</Link>
          <Link className="header-signin" to="/login" onClick={() => setMenuOpen(false)}>Sign in</Link>
          <button ref={menuButton} type="button" className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-navigation">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
