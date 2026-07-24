import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
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
          <Link to="/simulation" className="hero-btn">
            CHOOSE DESCENT
          </Link>
          <Link to="/expeditions" className="hero-btn-secondary">
            Learn More ↓
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;