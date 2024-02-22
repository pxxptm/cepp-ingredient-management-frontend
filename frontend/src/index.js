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
import EditRestaurantPage from "./page/EditRestaurantPage";
import SelfEditAccountPage from "./page/SelfEditAccountPage";
import OwnerInventoryPage from "./page/OwnerInventoryPage";

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

    <Route path="/:username/:restaurantId" element={<OwnerMainPageWrapper />} />

    <Route
      path="/:username/:restaurantId/staff-management"
      element={<StaffManagementPageWrapper />}
    />

    <Route
      path="/:username/:restaurantId/info"
      element={<EditRestaurantPageWrapper />}
    />

    <Route
    path="/:username/:restaurantId/inventory-management"
    element= {<OwnerInventoryPageWrapper/>}/>

    <Route path="/:username/account" element={<SelfEditAccountPageWrapper />} />
  </Routes>
);

function RestaurantListPageWrapper() {
  let { username } = useParams();
  return <RestaurantListPage username={username} />;
}

function OwnerMainPageWrapper() {
  let { username } = useParams();
  let { restaurantId } = useParams();
  return <MainPageOwner username={username} restaurantId={restaurantId} />;
}

function StaffManagementPageWrapper() {
  let { username } = useParams();
  let { restaurantId } = useParams();
  return (
    <StaffManagementPage username={username} restaurantId={restaurantId} />
  );
}

function SelfEditAccountPageWrapper() {
  let { username } = useParams();
  return (
    <SelfEditAccountPage username={username} />
  );
}

function EditRestaurantPageWrapper() {
  let { username } = useParams();
  let { restaurantId } = useParams();
  return <EditRestaurantPage username={username} restaurantId={restaurantId} />;
}

function OwnerInventoryPageWrapper() {
  let { username } = useParams();
  let { restaurantId } = useParams();
  return <OwnerInventoryPage username={username} restaurantId={restaurantId} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router>{router}</Router>);
