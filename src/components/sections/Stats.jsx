import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { number: '11,000m', label: 'PRESSURE CEILING' },
    { number: '12', label: 'VOYAGE MANIFEST CAP' },
    { number: '24/7', label: 'MARINE SCIENCES DESK' },
  ];

  return (
<WaveDivider flip />
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <React.Fragment key={stat.label}>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
            {index < stats.length - 1 && <div className="stat-divider" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Stats;