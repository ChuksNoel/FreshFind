import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Markets from './pages/Markets';
import MarketsDetails from './pages/MarketsDetails';
// import Shared from './pages/Shared';
import ChatBot from './pages/Shared/Chatbot';
import Clock from './pages/Shared/Clock';
import Filter from './pages/Shared/Filter';
import Footer from './pages/Shared/Footer';
import Geolocation from './pages/Shared/Geolocation';
import Navbar from './pages/Shared/Navbar';
import Search from './pages/Shared/Search';


function App(){
  return(
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/markets' element={<Markets />} />
        <Route path='/markets/:id' element={<MarketsDetails />} />
        <Route path='/shared/chatbot' element={<ChatBot />} />
        <Route path='/shared/clock' element={<Clock />} />
        <Route path='/shared/filter' element={<Filter />} />
        <Route path='/shared/footer' element={<Footer />} />
        <Route path='/shared/geolocation' element={<Geolocation />} />
        <Route path='/shared/navbar' element={<Navbar />} />
        <Route path='/shared/search' element={<Search />} />
      </Routes>
      <Footer />
     </BrowserRouter>
  )
}
export default App;
