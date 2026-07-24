import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'EXPEDITIONS', path: '/expeditions' },
    { name: 'THE VESSEL', path: '/vessel' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
  <img 
    src="/images/logo.png" 
    alt="ABYSS Logo" 
    style={{ height: '35px', width: 'auto' }} 
  />
  <span style={{ fontFamily: 'Playfair Display', fontSize: '22px', letterSpacing: '4px' }}>
    ABYSS
  </span>
</Link>
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/simulation" className="nav-reserve">RESERVE</Link>
            <button className="nav-member" onClick={() => setShowMemberModal(true)}>
              👤 BE A MEMBER
            </button>
          </div>
        </div>
      </nav>

      {/* Member Modal */}
      {showMemberModal && (
        <div className="modal-overlay" onClick={() => setShowMemberModal(false)}>
          <div className="modal-content member-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowMemberModal(false)}>✕</button>
            
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
            
            <form className="modal-form" onSubmit={(e) => {
              e.preventDefault();
              alert(isLogin ? 'Login successful! Welcome back.' : 'Account created! Welcome to ABYSS.');
              setShowMemberModal(false);
            }}>
              {!isLogin && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                  required
                />
              </div>
              
              {!isLogin && (
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
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
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;