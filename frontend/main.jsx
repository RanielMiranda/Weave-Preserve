import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; 

import MainLayout from './Layouts/MainLayout';
import Home from './Pages/Home/Home.jsx';
import Marketplace from './Pages/MarketPlace/Marketplace.jsx';
import Campaigns from './Pages/Campaigns/Campaigns.jsx';
import Stories from './Pages/Stories/Stories.jsx';
import Checkout from './Pages/Checkout/Checkout.jsx';
import Auth from './Pages/Auth/Auth.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';

{/* FAKE Articles */}
import KalingaArticlePage from './Pages/Stories/Components/FakePages/KalingaArticlePage.jsx';
import ElenasStoryVideoPage from './Pages/Stories/Components/FakePages/ElenasStoryVideoPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Pages with Header/Footer */}
        <Route path="/" 
          element={
            <MainLayout isLoggedInInfo={true}>
              <Home />
            </MainLayout>
          }
        />
        <Route path="/marketplace"
          element={
            <MainLayout isLoggedInInfo={true}>
              <Marketplace />
            </MainLayout>
          }
        />
        <Route path="/stories"
          element={
            <MainLayout isLoggedInInfo={true}>
              <Stories />
            </MainLayout>
          }
        />
        <Route path="/campaigns"
          element={
            <MainLayout isLoggedInInfo={true}>
              <Campaigns />
            </MainLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout isLoggedInInfo={true}>
              <Checkout />
            </MainLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <MainLayout isLoggedInInfo={true}>
              <Dashboard />
            </MainLayout>
          }
        />        

        {/* FAKE Articles */}
        <Route 
          path="/stories/kalinga-patterns"
          element={
            <MainLayout isLoggedInInfo={true}>            
            <KalingaArticlePage />
            </MainLayout>
          }
        />

        <Route 
          path="/stories/elena-video" 
          element= {
            <MainLayout isLoggedInInfo={true}>            
            <ElenasStoryVideoPage />
            </MainLayout>
            }
          />

        {/* Pages WITHOUT Header/Footer */}
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
