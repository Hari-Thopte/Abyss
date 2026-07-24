import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [showMember, setShowMember] = useState(false);

  return (
<WaveDivider flip />
    <section className="cta-section" id="inquiry">
      <div className="section-content">
        <motion.div
          className="cta-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="cta-title">SECURE TRANSMISSION NODE</h2>
          <p className="cta-text">
            Meet the part of you that belongs below.
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="cta-btn">
              📨 START INQUIRY
            </Link>
            <button className="cta-btn-secondary" onClick={() => alert('Member portal coming soon!')}>
              👤 BE A MEMBER
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;