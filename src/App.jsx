import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Markets from './components/HomeMarkets';
import MarketsDetails from './pages/MarketsDetails';
// import Shared from './pages/Shared';
import ChatBot from './Shared/Chatbot';
import Clock from './Shared/Clock';
import Filter from './Shared/Filter';
import Footer from './Shared/Footer';
import Geolocation from './Shared/Geolocation';
import Navbar from './components/Navbar';
import Search from './Shared/Search';


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
        <Route path='/components/navbar' element={<Navbar />} />
        <Route path='/shared/search' element={<Search />} />
      </Routes>
      <Footer />
     </BrowserRouter>
  )
}
export default App;
