import React from 'react';
import { motion } from 'framer-motion';

const Mission = () => {
  return (
<WaveDivider flip />
    <section className="mission-section">
      <div className="section-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;