import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Eye, EyeOff, Heart, Leaf, Sprout } from 'lucide-react';
import '../Style/AuthPages.css';

function PasswordField({ label, name, confirm = false }) {
  const [visible, setVisible] = useState(false);
  return <div className="auth-field"><label htmlFor={`auth-${name}`}>{label}</label><span className="auth-password"><input id={`auth-${name}`} name={name} type={visible ? 'text' : 'password'} required minLength={8} maxLength={128} autoComplete="off" placeholder={confirm ? 'Repeat your demo password' : 'At least 8 characters'} /><button type="button" aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`} aria-pressed={visible} onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></div>;
}

export default function AuthPage({ mode }) {
  const signup = mode === 'signup';
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState('');
  const successRef = useRef(null);

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    if (signup && !String(fields.get('name')).trim()) {
      setError('Please enter a name for this preview.');
      form.elements.namedItem('name').focus();
      return;
    }
    if (signup && fields.get('password') !== fields.get('confirmPassword')) {
      setError('The passwords do not match. Please try again.');
      form.elements.namedItem('confirmPassword').focus();
      return;
    }
    // This static demo does not store, transmit, or authenticate credentials.
    form.reset();
    setError('');
    setComplete(true);
    requestAnimationFrame(() => successRef.current?.focus());
  }

  return (
    <div className="auth-page container">
      <section className="auth-story" aria-label="FreshFind community">
        <img src="/images/lagos-market-hero.png" alt="Fresh vegetables and friendly faces at a Lagos market" width="1024" height="1024" />
        <div className="auth-story-overlay" />
        <Link to="/" className="auth-back"><ArrowLeft size={16} /> Back to discovering</Link>
        <div className="auth-story-copy"><span className="eyebrow light"><Sprout size={16} /> FRESH ALL ALONG</span><h2>{signup ? <>A little more local.<br /><em>A little more you.</em></> : <>Your next fresh find<br /><em>is closer than you think.</em></>}</h2><p>Neighbourhood markets. Seasonal favourites. Good food worth coming back for.</p><div className="auth-story-tags"><span><Leaf size={14} /> Discover Lagos</span><span><Heart size={14} /> Keep your favourites</span></div></div>
      </section>

      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="auth-panel-inner">
          <span className="auth-symbol"><Sprout size={25} strokeWidth={1.5} /></span>
          <span className="eyebrow">{signup ? 'MAKE ROOM FOR FRESH FINDS' : 'A FAMILIAR PLACE TO RETURN'}</span>
          <h1 id="auth-title">{signup ? <>Let’s put down<br /><em>some roots.</em></> : <>Welcome<br /><em>back.</em></>}</h1>
          <p className="auth-intro">{signup ? 'Explore the FreshFind sign-up experience.' : 'Explore the FreshFind sign-in experience.'}</p>
          <div className="auth-demo-note"><strong>Demo only</strong><p>No real account is created or verified. Use sample details and a made-up password. Nothing entered here is sent or saved by FreshFind.</p></div>

          {complete ? <div className="auth-complete" ref={successRef} tabIndex={-1} role="status"><span><Check size={23} /></span><h2>{signup ? 'Sign-up preview complete.' : 'Sign-in preview complete.'}</h2><p>This was a demonstration. No account or signed-in session was created. You can still browse markets and save favourites on this device.</p><Link className="button button-primary" to="/markets">Explore markets <ArrowUpRight size={17} /></Link><button type="button" className="auth-text-button" onClick={() => setComplete(false)}>Try the form again</button></div> : <>
            <form className="auth-form" onSubmit={submit} onChange={() => setError('')} autoComplete="off" aria-describedby="auth-error">
              {signup && <label className="auth-field">Your name<input name="name" required maxLength={100} placeholder="e.g. Alex" autoComplete="off" /></label>}
              <label className="auth-field">Email address<input type="email" name="email" required maxLength={200} placeholder="alex@example.com" autoComplete="off" /></label>
              <PasswordField label="Password" name="password" />
              {signup && <PasswordField label="Confirm password" name="confirmPassword" confirm />}
              <p id="auth-error" className="auth-error" role="alert">{error}</p>
              <button className="button button-primary auth-submit" type="submit">{signup ? 'Preview sign up' : 'Preview sign in'}<ArrowUpRight size={17} /></button>
            </form>
            <p className="auth-switch">{signup ? 'Already explored sign up?' : 'New to FreshFind?'} <Link to={signup ? '/login' : '/signup'}>{signup ? 'Sign in' : 'Create an account'} <ArrowUpRight size={13} /></Link></p>
          </>}
          <div className="auth-guest"><span>OR KEEP EXPLORING</span><Link to="/markets">Continue without an account <ArrowUpRight size={15} /></Link></div>
        </div>
      </section>
    </div>
  );
}
