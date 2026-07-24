import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import './AbyssLanding.css';

const AbyssLanding = ({ onEnterSimulation }) => {
  const { scrollYProgress } = useScroll();
  const [depth, setDepth] = useState(0);
  const [pressure, setPressure] = useState(1);
  const [zone, setZone] = useState('SURFACE LAYER');
  const [isScrolled, setIsScrolled] = useState(false);

  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    message: '',
    interest: 'general'
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const [showMember, setShowMember] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [memberSubmitted, setMemberSubmitted] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      const newDepth = Math.round(value * 11000);
      setDepth(newDepth);
      
      if (newDepth < 200) {
        setPressure(1 + Math.round(newDepth / 10));
        setZone('SURFACE LAYER');
      } else if (newDepth < 1000) {
        setPressure(Math.round(newDepth / 10));
        setZone('TWILIGHT ZONE');
      } else if (newDepth < 4000) {
        setPressure(Math.round(newDepth / 10));
        setZone('MIDNIGHT ZONE');
      } else if (newDepth < 6000) {
        setPressure(Math.round(newDepth / 10));
        setZone('ABYSSAL ZONE');
      } else {
        setPressure(Math.round(newDepth / 10));
        setZone('HADAL ZONE');
      }

      setIsScrolled(value > 0.1);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollDown = () => {
    const nextSection = document.querySelector('.mission-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInquiryChange = (e) => {
    setInquiryForm({ ...inquiryForm, [e.target.name]: e.target.value });
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    console.log('Inquiry Submitted:', inquiryForm);
    setInquirySubmitted(true);
    setTimeout(() => {
      setShowInquiry(false);
      setInquirySubmitted(false);
      setInquiryForm({ name: '', email: '', message: '', interest: 'general' });
    }, 2000);
  };

  const handleMemberChange = (e) => {
    setMemberForm({ ...memberForm, [e.target.name]: e.target.value });
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && memberForm.password !== memberForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log(isLogin ? 'Login:' : 'Signup:', memberForm);
    setMemberSubmitted(true);
    setTimeout(() => {
      setShowMember(false);
      setMemberSubmitted(false);
      setMemberForm({ name: '', email: '', password: '', confirmPassword: '' });
    }, 2000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will respond within 24 hours.');
    e.target.reset();
  };

  const depthDisplay = depth.toString().padStart(4, '0');

  return (
    <div className="abyss-landing">
      {/* Navigation */}
      <nav className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">ABYSS</div>
          <div className="nav-links">
            <button className="nav-link-btn" onClick={() => scrollToSection('expeditions')}>
              EXPEDITIONS
            </button>
            <button className="nav-link-btn" onClick={() => scrollToSection('vessel')}>
              THE VESSEL
            </button>
            <button className="nav-link-btn" onClick={() => setShowInquiry(true)}>
              INQUIRE
            </button>
            <button className="nav-link-btn" onClick={() => scrollToSection('contact')}>
              CONTACT
            </button>
            <button className="nav-reserve" onClick={onEnterSimulation}>
              RESERVE
            </button>
            <button className="nav-member" onClick={() => setShowMember(true)}>
              👤 BE A MEMBER
            </button>
          </div>
        </div>
      </nav>

      {/* Telemetry */}
      <div className="telemetry-bar">
        <div className="telemetry-content">
          <span className="telemetry-label">LIVE TELEMETRY / NORTH ATLANTIC</span>
          <span className="telemetry-divider">|</span>
          <span className="telemetry-item">
            CURRENT DEPTH <span className="telemetry-value">{depthDisplay}M</span>
          </span>
          <span className="telemetry-divider">|</span>
          <span className="telemetry-item">
            PRESSURE: <span className="telemetry-value">{pressure} ATM</span>
          </span>
          <span className="telemetry-divider">|</span>
          <span className="telemetry-item">
            ZONE: <span className="telemetry-value">{zone}</span>
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h1 className="hero-title">
              <span className="hero-subtitle">BEYOND THE SURFACE</span>
              <span className="hero-main">DISCOVER THE<br />UNKNOWN</span>
              <span className="hero-description">
                Private deep-ocean expeditions for those who seek<br />
                planetary discovery beyond ordinary travel.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="hero-cta"
          >
            <button className="hero-btn" onClick={onEnterSimulation}>
              CHOOSE DESCENT
            </button>
            <div className="hero-status">
              <span className="status-dot" />
              <span className="status-text">OCEAN CONDITIONS / OPTIMAL</span>
            </div>
          </motion.div>
        </div>

        <div className="scroll-indicator" onClick={scrollDown} style={{ cursor: 'pointer' }}>
          <span>SCROLL TO DESCEND ↓</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <div className="section-content">
          <div className="section-label">01 / MISSION PROFILE</div>
          <h2 className="section-title">
            A PRIVATE ENCOUNTER<br />
            WITH THE UNKNOWN
          </h2>
          <p className="section-text">
            The surface is only the first chapter.<br />
            We transform the world's ultimate wilderness into something deeply personal.<br />
            Every ABYSS deployment brings together deep-ocean hardware systems and<br />
            moments of extreme planetary stillness. No ambient congestion.<br />
            No structural concessions.
          </p>
        </div>
      </section>

      {/* Stats */}
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

      {/* Destinations */}
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
              <p className="destination-desc">
                Living Cathedrals — Sheer deep reef wall faces dropping immediately into clear ocean floors.
              </p>
            </div>

            <div className="destination-card">
              <div className="destination-header">
                <span className="destination-icon">🌊</span>
                <span className="destination-duration">05 DAYS</span>
              </div>
              <h3 className="destination-name">AZORES</h3>
              <p className="destination-desc">
                The Blue Wild — Open pelagic channels situated along global migration routes.
              </p>
            </div>

            <div className="destination-card">
              <div className="destination-header">
                <span className="destination-icon">🐋</span>
                <span className="destination-duration">07 DAYS</span>
              </div>
              <h3 className="destination-name">PACIFIC</h3>
              <p className="destination-desc">
                Midnight Bloom — Targeted descent paths tracking deep abyssal biology lines.
              </p>
            </div>
          </div>

          <p className="destinations-footer">
            Expedition paths arranged specifically around distinct marine biological centers and oceanic structural features.
          </p>
        </div>
      </section>

      {/* Vessel */}
      <section className="vessel-section" id="vessel">
        <div className="section-content">
          <div className="section-label">03 / THE VESSEL ASSEMBLY</div>
          <h2 className="section-title">Panoramic Sphere Core.</h2>
          
          <div className="vessel-grid">
            <div className="vessel-feature">
              <div className="vessel-icon">🔵</div>
              <div className="vessel-feature-content">
                <h4>ACRYLIC PRESSURE HULL APERTURE</h4>
                <p>360° VIEW</p>
              </div>
            </div>
            <div className="vessel-feature">
              <div className="vessel-icon">🛏️</div>
              <div className="vessel-feature-content">
                <h4>INTEGRATED HOSPITALITY POD</h4>
                <p>ONBOARD</p>
              </div>
            </div>
            <div className="vessel-feature">
              <div className="vessel-icon">🎮</div>
              <div className="vessel-feature-content">
                <h4>DUAL PILOT FLIGHT DECK</h4>
                <p>EXPERT LED</p>
              </div>
            </div>
            <div className="vessel-feature">
              <div className="vessel-icon">🗺️</div>
              <div className="vessel-feature-content">
                <h4>CUSTOM NAVIGATION MAPPING</h4>
                <p>TAILORED</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="inquiry">
        <div className="section-content">
          <div className="cta-box">
            <h2 className="cta-title">SECURE TRANSMISSION NODE</h2>
            <p className="cta-text">
              Meet the part of you that belongs below.
            </p>
            <div className="cta-buttons">
              <button className="cta-btn" onClick={() => setShowInquiry(true)}>
                📨 START INQUIRY
              </button>
              <button className="cta-btn-secondary" onClick={() => setShowMember(true)}>
                👤 BE A MEMBER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section" id="contact">
        <div className="section-content">
          <div className="section-label">04 / CONTACT US</div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Have questions about our expeditions? Reach out to our team.
          </p>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Headquarters</h4>
                  <p>Deep Sea Exploration Center<br />Monaco, Mediterranean</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:info@abyss-exploration.com">info@abyss-exploration.com</a></p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <h4>Phone</h4>
                  <p><a href="tel:+37799999999">+377 99 99 99 99</a></p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">🕐</span>
                <div>
                  <h4>Operating Hours</h4>
                  <p>24/7 - Always ready for descent</p>
                </div>
              </div>

              <div className="contact-social">
                <span className="social-label">Follow Us</span>
                <div className="social-links">
                  <a href="#" className="social-link" target="_blank">🐦</a>
                  <a href="#" className="social-link" target="_blank">📷</a>
                  <a href="#" className="social-link" target="_blank">📘</a>
                  <a href="#" className="social-link" target="_blank">▶️</a>
                  <a href="#" className="social-link" target="_blank">💼</a>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" placeholder="Enter your name" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" placeholder="Enter your email" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="What is this regarding?" />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea rows="4" placeholder="Tell us how we can help you..." required></textarea>
                </div>

                <button type="submit" className="contact-submit-btn">
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <span>© 2026 ABYSS EXPLORATION CO.</span>
          <span>SECTOR: PLANET EARTH (OCEANIC DOMINANT)</span>
          <span>COMMS REROUTE // OK</span>
        </div>
      </footer>

      {/* Inquiry Modal */}
      {showInquiry && (
        <div className="modal-overlay" onClick={() => setShowInquiry(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowInquiry(false)}>✕</button>
            
            {inquirySubmitted ? (
              <div className="modal-success">
                <div className="success-icon">✅</div>
                <h2>Inquiry Sent!</h2>
                <p>Our team will reach out within 24 hours.</p>
              </div>
            ) : (
              <>
                <h2 className="modal-title">📨 Send an Inquiry</h2>
                <p className="modal-subtitle">Tell us about your deep-sea exploration dreams.</p>
                
                <form onSubmit={handleInquirySubmit} className="modal-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={inquiryForm.name}
                      onChange={handleInquiryChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={inquiryForm.email}
                      onChange={handleInquiryChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Area of Interest</label>
                    <select
                      name="interest"
                      value={inquiryForm.interest}
                      onChange={handleInquiryChange}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="expedition">Expedition Booking</option>
                      <option value="vessel">Vessel Information</option>
                      <option value="research">Research Collaboration</option>
                      <option value="media">Media & Press</option>
                      <option value="membership">Membership</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      name="message"
                      value={inquiryForm.message}
                      onChange={handleInquiryChange}
                      placeholder="Tell us about your inquiry..."
                      rows="4"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="form-submit">
                    Send Inquiry →
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Member Modal */}
      {showMember && (
        <div className="modal-overlay" onClick={() => setShowMember(false)}>
          <div className="modal-content member-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowMember(false)}>✕</button>
            
            {memberSubmitted ? (
              <div className="modal-success">
                <div className="success-icon">🎉</div>
                <h2>{isLogin ? 'Welcome Back!' : 'Account Created!'}</h2>
                <p>
                  {isLogin 
                    ? 'Redirecting to your dashboard...' 
                    : 'Your ABYSS membership is now active!'}
                </p>
              </div>
            ) : (
              <>
                <div className="member-toggle">
                  <button 
                    className={`member-toggle-btn ${isLogin ? 'active' : ''}`}
                    onClick={() => setIsLogin(true)}
                  >
                    🔐 Login
                  </button>
                  <button 
                    className={`member-toggle-btn ${!isLogin ? 'active' : ''}`}
                    onClick={() => setIsLogin(false)}
                  >
                    ✨ Sign Up
                  </button>
                </div>

                <h2 className="modal-title">
                  {isLogin ? 'Welcome Back' : 'Join the ABYSS Community'}
                </h2>
                <p className="modal-subtitle">
                  {isLogin 
                    ? 'Sign in to access your expeditions and dashboard.'
                    : 'Create your account to start your deep-sea journey.'}
                </p>
                
                <form onSubmit={handleMemberSubmit} className="modal-form">
                  {!isLogin && (
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={memberForm.name}
                        onChange={handleMemberChange}
                        placeholder="Enter your full name"
                        required={!isLogin}
                      />
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={memberForm.email}
                      onChange={handleMemberChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={memberForm.password}
                      onChange={handleMemberChange}
                      placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                      required
                    />
                  </div>
                  
                  {!isLogin && (
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={memberForm.confirmPassword}
                        onChange={handleMemberChange}
                        placeholder="Confirm your password"
                        required={!isLogin}
                      />
                    </div>
                  )}
                  
                  <button type="submit" className="form-submit member-submit">
                    {isLogin ? '🔐 Login' : '✨ Create Account'}
                  </button>
                </form>

                <p className="member-footer">
                  {isLogin ? (
                    <>Don't have an account? <span onClick={() => setIsLogin(false)}>Sign Up</span></>
                  ) : (
                    <>Already a member? <span onClick={() => setIsLogin(true)}>Login</span></>
                  )}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AbyssLanding;