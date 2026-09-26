import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Copy, Mail, MapPin, Navigation, Phone, Sprout } from 'lucide-react';
import { contactDetails } from '../config/contact';
import '../Style/InfoPages.css';

const faqs = [
  ['Can I buy produce through FreshFind?', 'FreshFind is a discovery guide. Browse the listings, check a market’s regular schedule, and visit sellers directly. We don’t take orders or payments.'],
  ['Are market schedules and produce availability guaranteed?', 'The current directory contains sample listings and regular schedules. Market days and stock can change, so confirm with sellers before travelling.'],
  ['Where are my saved items kept?', 'Saved markets and produce stay in this browser on this device. They may disappear if you clear browser storage, and they don’t sync between devices.'],
  ['How can I suggest a market or report a correction?', 'Choose “Suggest a market” or “Correct a listing” in the message form. Include the market name, neighbourhood, and the details you would like us to review.'],
];

export default function Contact() {
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');
  const [locating, setLocating] = useState(false);
  const [draft, setDraft] = useState('');
  const draftRef = useRef(null);
  const mapQuery = location ? `${location.latitude},${location.longitude}` : 'Lagos,Nigeria';
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}`;

  async function prepareMessage(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    if (String(fields.get('message')).trim().length < 10) {
      setStatus('Please write at least 10 characters in your message.');
      return;
    }
    const subject = `FreshFind: ${fields.get('topic')}`;
    const message = `Name: ${String(fields.get('name')).trim()}\nReply email: ${String(fields.get('email')).trim()}\nTopic: ${fields.get('topic')}\n\n${String(fields.get('message')).trim()}`;
    setCopied(false);
    setDraft(message);
    if (contactDetails.email) {
      window.location.href = `mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      setStatus('Your email app will open with this draft. Send it there to contact us. If it does not open, copy the draft below.');
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setStatus('Message copied. It has not been sent. Keep the draft until our contact address is available.');
    } catch {
      setStatus('Your draft is ready below. Select and copy it to keep it. It has not been sent.');
    }
  }

  function locate() {
    if (!navigator.geolocation) {
      setLocationStatus('This browser does not support location access. The Lagos map is still available.');
      return;
    }
    setLocating(true);
    setLocationStatus('Waiting for your browser’s location permission…');
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      setLocating(false);
      setLocationStatus('The map now shows your approximate location.');
    }, (error) => {
      setLocating(false);
      setLocationStatus(error.code === 1 ? 'Location permission was declined. You can still explore the Lagos map.' : 'Your location could not be found. Please try again, or use the Lagos map.');
    }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
  }

  return (
    <div className="info-page contact-page">
      <section className="contact-intro container" aria-labelledby="contact-title"><span className="eyebrow"><Sprout size={15} /> A LITTLE CONVERSATION GOES A LONG WAY</span><h1 id="contact-title">Let’s grow<br /><em>something good.</em></h1><p>A question, a suggestion, or a fresh find of your own.<br />We’d love to hear what’s on your mind.</p></section>
      <section className="contact-layout container" aria-label="Contact FreshFind">
        <aside className="contact-aside">
          <span className="info-icon"><Mail size={25} /></span><h2>Start a conversation.</h2><p>Tell us about a market, help improve a listing, or share your thoughts about FreshFind.</p>
          <div className="contact-channel"><MapPin size={19} /><div><strong>Our community</strong><span>Lagos, Nigeria</span><small>Discovering markets across the city.</small></div></div>
          {contactDetails.email && <a className="contact-channel" href={`mailto:${contactDetails.email}`}><Mail size={19} /><div><strong>Email us</strong><span>{contactDetails.email}</span></div><ArrowUpRight size={16} /></a>}
          {contactDetails.phone && <a className="contact-channel" href={`tel:${contactDetails.phone.replace(/[^+\d]/g, '')}`}><Phone size={19} /><div><strong>Call us</strong><span>{contactDetails.phone}</span></div><ArrowUpRight size={16} /></a>}
          {!contactDetails.email && <p className="contact-availability">Our public contact details are coming soon. For now, use this form to prepare and copy a message. Messages are not sent from this page.</p>}
          <div className="contact-help"><Sprout size={21} /><h3>Planning a market trip?</h3><p>Find locations, regular schedules, and listed produce in the directory.</p><Link className="text-link" to="/markets">Explore the markets <ArrowUpRight size={16} /></Link></div>
        </aside>
        <form className="contact-form" onSubmit={prepareMessage} onChange={() => { setStatus(''); setCopied(false); setDraft(''); }}>
          <span className="eyebrow">YOUR MESSAGE</span><h2>What’s on your mind?</h2>
          <div className="contact-fields-row"><label>Your name<input required name="name" autoComplete="name" placeholder="Your name" maxLength={100} pattern=".*\S.*" /></label><label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" maxLength={200} /></label></div>
          <label>What would you like to share?<select name="topic" defaultValue="General question"><option>General question</option><option>Suggest a market</option><option>Correct a listing</option><option>Website feedback</option></select></label>
          <label>Your message<textarea required name="message" rows={6} minLength={10} maxLength={2000} placeholder="Tell us a little more. For market suggestions, include the name and neighbourhood." /></label>
          <p className="contact-form-note">{contactDetails.email ? 'This opens your email app with a draft. Nothing is sent until you choose to send it.' : 'Your details stay in this form until you copy them. This form does not send or save your message.'}</p>
          <button type="submit" className="button button-primary">{contactDetails.email ? 'Open email draft' : copied ? 'Message copied' : 'Copy my message'}{copied ? <Check size={17} /> : contactDetails.email ? <ArrowUpRight size={17} /> : <Copy size={17} />}</button>
          <p className="contact-status" role="status">{status}</p>
          {draft && <label className="contact-draft">Your prepared message<textarea ref={draftRef} value={draft} readOnly rows={5} /><button type="button" className="text-link" onClick={() => { draftRef.current.focus(); draftRef.current.select(); }}>Select draft <Copy size={14} /></button></label>}
        </form>
      </section>

      <section className="contact-map-section container" aria-labelledby="map-title">
        <div className="contact-map-heading"><div><span className="eyebrow">ROOTED IN LAGOS</span><h2 id="map-title">Find your bearings.</h2><p>This map shows the city we’re exploring, rather than an office address.</p></div><button type="button" className="button contact-location-button" onClick={locate} disabled={locating}><Navigation size={16} />{locating ? 'Finding your location…' : 'Use my location'}</button></div>
        <iframe title={location ? 'Map of your approximate location' : 'Map of Lagos, Nigeria'} src={`${mapsUrl}&z=${location ? 14 : 11}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        <div className="contact-map-foot"><p>Your browser asks permission before using your location. Coordinates are shared with Google Maps to display the map; FreshFind does not store them.</p><a className="text-link" href={mapsUrl} target="_blank" rel="noreferrer">Open Google Maps <ArrowUpRight size={15} /></a></div>
        <p role="status" className="contact-status">{locationStatus}</p>
        {location && <button type="button" className="text-link" onClick={() => { setLocation(null); setLocationStatus('Showing the Lagos map again.'); }}>Back to the Lagos map</button>}
      </section>

      <section className="contact-faq container" aria-labelledby="faq-title"><div><span className="eyebrow">A FEW HELPFUL ANSWERS</span><h2 id="faq-title">Before you<br /><em>head to the market.</em></h2></div><div className="contact-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    </div>
  );
}
