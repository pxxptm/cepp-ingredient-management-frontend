import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

import HomePage from "./page/HomePage";
import FeaturePage from "./page/FeaturePage";
import LoginPage from "./page/LoginPage";
import ContactUsPage from "./page/ContactUsPage";
import FAQPage from "./page/FAQPage";
import OwnerRegisterPage from "./page/OwnerRegister";
import RestaurantListPage from "./page/RestaurantListPage";
import MainPageOwner from "./page/MainPageOwner";
import StaffManagementPage from "./page/StaffManagementPage";

const router = (
  <Routes>
    <Route path="/" element={<HomePage />} />

    <Route path="feature" element={<FeaturePage />} />

    <Route path="login" element={<LoginPage />} />

    <Route path="contact-us" element={<ContactUsPage />} />

    <Route path="faq" element={<FAQPage />} />

    <Route path="owner-register" element={<OwnerRegisterPage />} />

    <Route
      path="/:username/restaurant"
      element={<RestaurantListPageWrapper />}
    />

    <Route
      path="/:username/:restaurantName"
      element={<OwnerMainPageWrapper />}
    />

    <Route
      path="/:username/:restaurantName/staff-management"
      element={<StaffManagementPageWrapper />}
    />
  </Routes>
);

function RestaurantListPageWrapper() {
  let { username } = useParams();
  return <RestaurantListPage username={username} />;
}

function OwnerMainPageWrapper() {
  let { username } = useParams();
  let { restaurantName } = useParams();
  return <MainPageOwner username={username} restaurantName={restaurantName} />;
}

function StaffManagementPageWrapper() {
  let { username } = useParams();
  let { restaurantName } = useParams();
  return (
    <StaffManagementPage username={username} restaurantName={restaurantName} />
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router>{router}</Router>);
