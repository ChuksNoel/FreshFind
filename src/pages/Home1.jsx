import React from 'react';
import '../assets/CSS/home.css'
import Tree from '../Components/Tree';
import LandingPane from '../Components/LandingPane';

function Home1(){
    return(
      <React.Fragment>
        {/* <h1 style={{ backgroundColor: '#000', color: '#fff', padding: 20, border: '1px solid', borderRadius: 10 }}>This is the Home Page</h1>*/}
        {/* Hero */}
        <div className='Treetrunk'> <Tree /> </div>
        <section className='hero-section'>
          <h1>Fresh Find</h1>
          <small>Fresh All Along</small>
        </section>
        <img src={null} alt="intemediary-image" />
        <LandingPane>
          <h2>Where all your dreams</h2>
          <p>Hii</p>
        </LandingPane>
        <LandingPane>
          <h2>Where all your dreams</h2>
          <p>Hii</p>
        </LandingPane>
        <LandingPane>
          <h2>Where all your dreams</h2>
          <p>Hii</p>
        </LandingPane>
        <img src={null} alt="intemediary-image" />
      </React.Fragment>
    )
}
export default Home1;
