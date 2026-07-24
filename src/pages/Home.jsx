import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import WaveDivider from '../components/Layout/WaveDivider';
import LoadingScreen from '../components/Layout/LoadingScreen';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-subtitle">BEYOND THE SURFACE</span>
            <span className="hero-main">DISCOVER THE<br />UNKNOWN</span>
            <span className="hero-description">
              Private deep-ocean expeditions for those who seek<br />
              planetary discovery beyond ordinary travel.
            </span>
          </h1>
          <div className="hero-cta">
            <a href="/simulation" className="hero-btn">CHOOSE DESCENT</a>
            <a href="/expeditions" className="hero-btn-secondary">Learn More ↓</a>
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* Mission Section */}
      <section className="mission-section">
        <div className="section-content">
          <div className="section-label">01 / MISSION PROFILE</div>
          <h2 className="section-title">A PRIVATE ENCOUNTER<br />WITH THE UNKNOWN</h2>
          <p className="section-text">
            The surface is only the first chapter.<br />
            We transform the world's ultimate wilderness into something deeply personal.<br />
            Every ABYSS deployment brings together deep-ocean hardware systems and<br />
            moments of extreme planetary stillness. No ambient congestion.<br />
            No structural concessions.
          </p>
        </div>
      </section>

      <WaveDivider flip />

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
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
      </section>

      <WaveDivider />

      {/* Destinations Section */}
      <section className="destinations-section" id="expeditions">
        <div className="section-content">
          <div className="section-label">02 / DESTINATIONS</div>
          <h2 className="section-title">Formulated for the curious.</h2>
          
          <div className="destinations-grid">
            <div className="destination-card">
              <div className="destination-header">
                <span className="destination-icon">🌴</span>
                <span className="destination-duration">03 DAYS</span>
              </div>
              <h3 className="destination-name">CARIBBEAN</h3>
              <p className="destination-desc">Living Cathedrals — Sheer deep reef wall faces dropping immediately into clear ocean floors.</p>
            </div>
            <div className="destination-card">
              <div className="destination-header">
                <span className="destination-icon">🌊</span>
                <span className="destination-duration">05 DAYS</span>
              </div>
              <h3 className="destination-name">AZORES</h3>
              <p className="destination-desc">The Blue Wild — Open pelagic channels situated along global migration routes.</p>
            </div>
            <div className="destination-card">
              <div className="destination-header">
                <span className="destination-icon">🐋</span>
                <span className="destination-duration">07 DAYS</span>
              </div>
              <h3 className="destination-name">PACIFIC</h3>
              <p className="destination-desc">Midnight Bloom — Targeted descent paths tracking deep abyssal biology lines.</p>
            </div>
          </div>
          <p className="destinations-footer">Expedition paths arranged specifically around distinct marine biological centers and oceanic structural features.</p>
        </div>
      </section>

      <WaveDivider flip />

      {/* Vessel Section */}
      <section className="vessel-section" id="vessel">
        <div className="section-content">
          <div className="section-label">03 / THE VESSEL ASSEMBLY</div>
          <h2 className="section-title">Panoramic Sphere Core.</h2>
          
          <div className="vessel-grid">
            <div className="vessel-feature">
              <span className="sonar-wrap">
                <span className="sonar-ring" />
                <span className="vessel-icon">🔵</span>
              </span>
              <div className="vessel-feature-content">
                <h4>ACRYLIC PRESSURE HULL APERTURE</h4>
                <p>360° VIEW</p>
              </div>
            </div>
            <div className="vessel-feature">
              <span className="sonar-wrap">
                <span className="sonar-ring" />
                <span className="vessel-icon">🛏️</span>
              </span>
              <div className="vessel-feature-content">
                <h4>INTEGRATED HOSPITALITY POD</h4>
                <p>ONBOARD</p>
              </div>
            </div>
            <div className="vessel-feature">
              <span className="sonar-wrap">
                <span className="sonar-ring" />
                <span className="vessel-icon">🎮</span>
              </span>
              <div className="vessel-feature-content">
                <h4>DUAL PILOT FLIGHT DECK</h4>
                <p>EXPERT LED</p>
              </div>
            </div>
            <div className="vessel-feature">
              <span className="sonar-wrap">
                <span className="sonar-ring" />
                <span className="vessel-icon">🗺️</span>
              </span>
              <div className="vessel-feature-content">
                <h4>CUSTOM NAVIGATION MAPPING</h4>
                <p>TAILORED</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-content">
          <div className="cta-box">
            <h2 className="cta-title">SECURE TRANSMISSION NODE</h2>
            <p className="cta-text">Meet the part of you that belongs below.</p>
            <div className="cta-buttons">
              <a href="/contact" className="cta-btn">📨 START INQUIRY</a>
              <button className="cta-btn-secondary" onClick={() => {
                const memberBtn = document.querySelector('.nav-member');
                if (memberBtn) memberBtn.click();
              }}>
                👤 BE A MEMBER
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;