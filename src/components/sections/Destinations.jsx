import React from 'react';
import { motion } from 'framer-motion';

const destinations = [
  {
    name: 'CARIBBEAN',
    duration: '03 DAYS',
    icon: '🌴',
    description: 'Living Cathedrals — Sheer deep reef wall faces dropping immediately into clear ocean floors.'
  },
  {
    name: 'AZORES',
    duration: '05 DAYS',
    icon: '🌊',
    description: 'The Blue Wild — Open pelagic channels situated along global migration routes.'
  },
  {
    name: 'PACIFIC',
    duration: '07 DAYS',
    icon: '🐋',
    description: 'Midnight Bloom — Targeted descent paths tracking deep abyssal biology lines.'
  }
];

const Destinations = () => {
  return (
<WaveDivider flip />
    <section className="destinations-section" id="expeditions">
      <div className="section-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="section-label">02 / DESTINATIONS</div>
          <h2 className="section-title">Formulated for the curious.</h2>
        </motion.div>

        <div className="destinations-grid">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              className="destination-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="destination-header">
                <span className="destination-icon">{dest.icon}</span>
                <span className="destination-duration">{dest.duration}</span>
              </div>
              <h3 className="destination-name">{dest.name}</h3>
              <p className="destination-desc">{dest.description}</p>
            </motion.div>
          ))}
        </div>

        <p className="destinations-footer">
          Expedition paths arranged specifically around distinct marine biological centers and oceanic structural features.
        </p>
      </div>
    </section>
  );
};

export default Destinations;