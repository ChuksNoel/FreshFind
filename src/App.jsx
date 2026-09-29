// React (Our classic dev point mehnnn)
import { Suspense, useEffect } from 'react';

// React Router DOM
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

// Contexts
import { SavedProvider } from './context/SavedContext';
import { ClockProvider } from './context/ClockContext';

// Components
import ChatBot from './components/chatbot/ChatBot';
import Navbar from './components/Navbar';
import Footer from './Shared/Footer';
import { pageElement } from './routePages';
import Spanify from './Components/Spanify';
import PageMetadata from './components/PageMetadata';

// The styles
import './App.css';
import './Style/TreeHome.css';
import './Style/InfoPages.css';
import './Style/AuthPages.css';
import './Style/Quality.css';
import './Style/TreeAlignment.css';


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const target = window.location.hash && document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Site({ initialTime }) {
  return (
    <ClockProvider initialTime={initialTime}><SavedProvider>
        <PageMetadata />
        <ScrollToTop />
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Suspense fallback={
            <div className="container page-section" role="status">Loading your fresh finds…</div>
          }>
            <Routes>
              <Route path="/" element={pageElement('Home')} />
              <Route path="/markets" element={pageElement('Markets')} />
              <Route path="/markets/:id" element={pageElement('MarketsDetails')} />
              <Route path="/produce-guide" element={pageElement('ProduceGuide')} />
              <Route path="/saved" element={pageElement('Bookmarks')} />
              <Route path="/about" element={pageElement('About')} />
              <Route path="/contact" element={pageElement('Contact')} />
              <Route path="/login" element={pageElement('Login')} />
              <Route path="/signin" element={<Navigate to="/login" replace />} />
              <Route path="/signup" element={pageElement('SignUp')} />
              <Route path="*" element={
                <div className="container empty-page">
                  <h1 aria-label='Page not found'>
                    {Spanify("Page")} {Spanify("not")} {Spanify("found")}
                  </h1>
                  <Link to="/" className="button button-primary">Back to home</Link>
                  </div>
                } />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ChatBot />
      </SavedProvider>
    </ClockProvider>
  );
}

export default function App({ initialTime }) {
  return <BrowserRouter><Site initialTime={initialTime} /></BrowserRouter>;
}
