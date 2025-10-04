import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home/Home.jsx'; // Corrected import path
import './index.css'; // Assuming you have a global CSS file for Tailwind base
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  </React.StrictMode>
);
