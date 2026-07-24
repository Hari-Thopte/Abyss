import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ openMemberModal, setOpenMemberModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [memberName, setMemberName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('abyss_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setIsLoggedIn(true);
        setMemberName(userData.name || 'Member');
      } catch (e) {
        localStorage.removeItem('abyss_user');
      }
    }
  }, []);

  // Handle scroll effect
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

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name?.value || 'Member';
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      alert('Please fill in all required fields');
      return;
    }

    if (!isLogin && password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    // Save user data
    const userData = { name, email, isLoggedIn: true };
    localStorage.setItem('abyss_user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setMemberName(name);
    if (setOpenMemberModal) setOpenMemberModal(false);
    alert(isLogin ? '✅ Welcome back!' : '✅ Account created successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('abyss_user');
    setIsLoggedIn(false);
    setMemberName('');
    alert('👋 Logged out successfully');
  };

  return (
    <>
      <nav className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">✦ ABYSS</Link>
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
            {isLoggedIn ? (
              <div className="nav-user">
                <span className="nav-user-name">👤 {memberName}</span>
                <button className="nav-logout" onClick={handleLogout}>LOGOUT</button>
              </div>
            ) : (
              <button className="nav-member" onClick={() => setOpenMemberModal && setOpenMemberModal(true)}>
                👤 BE A MEMBER
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Member Modal */}
      {openMemberModal && (
        <div className="modal-overlay" onClick={() => setOpenMemberModal && setOpenMemberModal(false)}>
          <div className="modal-content member-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpenMemberModal && setOpenMemberModal(false)}>✕</button>

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

            <form className="modal-form" onSubmit={handleMemberSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
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
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                  required
                  minLength="6"
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
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
