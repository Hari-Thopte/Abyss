import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { icon: '🔵', name: 'ACRYLIC PRESSURE HULL APERTURE', detail: '360° VIEW' },
  { icon: '🛏️', name: 'INTEGRATED HOSPITALITY POD', detail: 'ONBOARD' },
  { icon: '🎮', name: 'DUAL PILOT FLIGHT DECK', detail: 'EXPERT LED' },
  { icon: '🗺️', name: 'CUSTOM NAVIGATION MAPPING', detail: 'TAILORED' },
];

const VesselFeatures = () => {
  return (
    <section className="vessel-section" id="vessel">
      <div className="section-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="section-label">03 / THE VESSEL ASSEMBLY</div>
          <h2 className="section-title">Panoramic Sphere Core.</h2>
        </motion.div>

        <div className="vessel-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className="vessel-feature"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="sonar-wrap">
                <span className="sonar-ring" />
                <span className="vessel-icon">{feature.icon}</span>
              </span>
              <div className="vessel-feature-content">
                <h4>{feature.name}</h4>
                <p>{feature.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VesselFeatures;