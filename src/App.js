/**import './App.css';**/
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './components/Weather'
import SeeAll from './components/SeeAll'; // Detailed forecast page
import WellnessPage from './components/WellnessPage';
import MoodTrackerPage from './components/MoodTrackerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/seeall" element={<SeeAll />} />
        <Route path="/mood-tracker" element={<MoodTrackerPage />} />
        <Route path="/wellness" element={<WellnessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
