import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import HomePage from './page/HomePage';
import FeaturePage from './page/FeaturePage';
import LoginPage from './page/LoginPage';
import ContactUsPage from './page/ContactUsPage';
import UserRegisterPage from './page/UserRegisterPage';
import FAQPage from './page/FAQPage';
import OwnerRegisterPage from './page/OwnerRegister';
import RestaurantListPage from './page/RestaurantListPage';
import MainPageOwner from './page/MainPageOwner';

const router = (
  <Routes>
    <Route 
      path="/"
      element={<HomePage />} 
    />

    <Route 
      path="feature" 
      element={<FeaturePage />} 
    />

    <Route
      path="login"
      element={<LoginPage />}
    />

    <Route
      path="contact-us"
      element={<ContactUsPage />}
    />

    <Route
      path="faq"
      element={<FAQPage />}
    />

    <Route 
      path="user-register"
      element={<UserRegisterPage />}
    />

    <Route
      path="owner-register"
      element={<OwnerRegisterPage />}
    />

    <Route
      path="/:username/restaurant"
      element={<RestaurantListPageWrapper />}
    />

    <Route
      path="/:restaurantName/owner"
      element={<MainPageOwner />}
    />
    
  </Routes>
);

function RestaurantListPageWrapper() {
  let { username } = useParams();
  return <RestaurantListPage username={username} />;
}

function OwnerMainPageWrapper() {
  let { restaurantName } = useParams();
  return <RestaurantListPage restaurantName={restaurantName} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router>{router}</Router>);
