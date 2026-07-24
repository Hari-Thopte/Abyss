import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const Expeditions = () => {
  const expeditions = [
    {
      name: 'CARIBBEAN',
      duration: '03 DAYS',
      icon: '🌴',
      description: 'Living Cathedrals — Sheer deep reef wall faces dropping immediately into clear ocean floors.',
      details: 'Explore vibrant coral ecosystems, shipwrecks, and underwater caves in the crystal clear waters of the Caribbean.'
    },
    {
      name: 'AZORES',
      duration: '05 DAYS',
      icon: '🌊',
      description: 'The Blue Wild — Open pelagic channels situated along global migration routes.',
      details: 'Witness whale migrations, deep sea vents, and the unique volcanic underwater landscapes of the Azores.'
    },
    {
      name: 'PACIFIC',
      duration: '07 DAYS',
      icon: '🐋',
      description: 'Midnight Bloom — Targeted descent paths tracking deep abyssal biology lines.',
      details: 'Descend into the Mariana Trench region. Encounter bioluminescent creatures and underwater geological wonders.'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="page-container" style={{ paddingTop: '100px' }}>
        <div className="section-content">
          <div className="section-label">02 / DESTINATIONS</div>
          <h1 className="section-title">Formulated for the curious.</h1>
          
          <div className="destinations-grid">
            {expeditions.map((exp, index) => (
              <div key={exp.name} className="destination-card">
                <div className="destination-header">
                  <span className="destination-icon">{exp.icon}</span>
                  <span className="destination-duration">{exp.duration}</span>
                </div>
                <h3 className="destination-name">{exp.name}</h3>
                <p className="destination-desc">{exp.description}</p>
                <p className="destination-details" style={{ marginTop: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.3)', lineHeight: '1.6' }}>
                  {exp.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Expeditions;