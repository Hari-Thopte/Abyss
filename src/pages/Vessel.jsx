import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const Vessel = () => {
  const features = [
    { icon: '🔵', name: 'ACRYLIC PRESSURE HULL APERTURE', detail: '360° VIEW' },
    { icon: '🛏️', name: 'INTEGRATED HOSPITALITY POD', detail: 'ONBOARD' },
    { icon: '🎮', name: 'DUAL PILOT FLIGHT DECK', detail: 'EXPERT LED' },
    { icon: '🗺️', name: 'CUSTOM NAVIGATION MAPPING', detail: 'TAILORED' },
    { icon: '🌊', name: 'ADVANCED SONAR SYSTEM', detail: 'PRECISION TRACKING' },
    { icon: '⚡', name: 'BIOLUMINESCENT LIGHTING', detail: 'AMBIENT GLOW' },
  ];

  return (
    <>
      <Navbar />
      <div className="page-container" style={{ paddingTop: '100px' }}>
        <div className="section-content">
          <div className="section-label">03 / THE VESSEL ASSEMBLY</div>
          <h1 className="section-title">Panoramic Sphere Core.</h1>
          
          <div className="vessel-grid">
            {features.map((feature) => (
              <div key={feature.name} className="vessel-feature">
                <span className="vessel-icon">{feature.icon}</span>
                <div className="vessel-feature-content">
                  <h4>{feature.name}</h4>
                  <p>{feature.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Vessel;