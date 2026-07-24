import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="page-container" style={{ paddingTop: '100px' }}>
        <div className="section-content">
          <div className="section-label">ABOUT US</div>
          <h1 className="section-title">A Private Encounter<br />With The Unknown</h1>
          
          <div style={{ maxWidth: '800px' }}>
            <p className="section-text" style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
              The surface is only the first chapter. We transform the world's ultimate wilderness 
              into something deeply personal. Every ABYSS deployment brings together deep-ocean 
              hardware systems and moments of extreme planetary stillness.
            </p>
            <p className="section-text" style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
              No ambient congestion. No structural concessions. Just you, the deep, and the unknown.
            </p>
          </div>

          <div className="stats-grid" style={{ marginTop: '60px' }}>
            <div className="stat-item">
              <span className="stat-number">11,000m</span>
              <span className="stat-label">PRESSURE CEILING</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">VOYAGE MANIFEST CAP</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">MARINE SCIENCES DESK</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;