import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Expeditions from './pages/Expeditions';
import Vessel from './pages/Vessel';
import About from './pages/About';
import Contact from './pages/Contact';
import Simulation from './pages/Simulation';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/expeditions" element={<Expeditions />} />
      <Route path="/vessel" element={<Vessel />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/simulation" element={<Simulation />} />
    </Routes>
  );
}

export default App;
