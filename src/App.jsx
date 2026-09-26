import { useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { SavedProvider } from './context/SavedContext';
import ChatBot from './components/chatbot/ChatBot';
import Navbar from './components/Navbar';
import Footer from './Shared/Footer';
import Home from './pages/Home';
import Markets from './pages/Markets';
import MarketsDetails from './pages/MarketsDetails';
import ProduceGuide from './pages/ProduceGuide';
import Bookmarks from './Shared/Bookmarks';
import Home1 from './pages/Home1';
import Home2 from './pages/Home2';
import About from './pages/About';
import Contact from './pages/Contact';


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <SavedProvider>
        <ScrollToTop />
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/markets/:id" element={<MarketsDetails />} />
            <Route path="/produce-guide" element={<ProduceGuide />} />
            <Route path="/saved" element={<Bookmarks />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<div className="container empty-page"><h1>Page not found</h1><Link to="/" className="button button-primary">Back to home</Link></div>} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </SavedProvider>
    </BrowserRouter>
  );
}

export default App;
