import React from 'react';
import { useNavigate } from 'react-router-dom';
import AbyssSimulation from '../components/Simulation/AbyssSimulation';
import SEO from '../components/SEO/SEO';

const Simulation = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="ABYSS 3D Simulation | Interactive Deep-Sea Experience"
        description="Immerse yourself in the ABYSS 3D simulation. Explore the deep ocean, encounter marine life, and experience submarine navigation."
        keywords="3D simulation, deep sea experience, submarine simulator, ABYSS interactive"
        url="/simulation"
      />
      <AbyssSimulation onExit={() => navigate('/')} />
    </>
  );
};

export default Simulation;