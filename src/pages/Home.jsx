import React from 'react';
import '../assets/CSS/home.css'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Minbar from '../components/MinBar';
import HomeMar from '../components/HomeMarkets';

function Home(){
    return(
        // <React.Fragment>
        // <h1 style={{ backgroundColor: '#000', color: '#fff', padding: 20, border: '1px solid', borderRadius: 10 }}>This is the Home Page</h1>
        // {/* Hero */}
        // <Tree />
        // <section className='hero-section'>
        //   <h1>Fresh Find</h1>
        //   <small>Fresh All Along</small>
        // </section>
        // <img src="" alt="intemediary image"/>
        // <section>
        //   <img src="" alt="branch" />
        //   <h2></h2>
        // </section>
        // </React.Fragment>
        <React.Fragment>
            <Navbar></Navbar>
            <Hero></Hero>
            <Minbar></Minbar>
            <HomeMar></HomeMar>
             <section>
                
             </section>
        </React.Fragment>
    )
}
export default Home;
