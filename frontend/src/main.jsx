import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx'; 
import Marketplace from './Pages/Marketplace/Marketplace.jsx'
import Campaigns from './Pages/Campaigns/Campaigns.jsx'
import Stories from './Pages/Stories/Stories.jsx'
import Auth from './Pages/Auth/Auth.jsx'
import Checkout from './Pages/Checkout/Checkout.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path ="/marketplace" element = {<Marketplace />} />
        <Route path = "/campaigns" element = {<Campaigns />} />
        <Route path = "/stories" element = {< Stories/>}/>
        <Route path = "/auth" element = {<Auth /> }/>
        <Route path = "/checkout" element = {<Checkout /> }/>
        <Route path = "/Dashboard" element = {<Dashboard />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
