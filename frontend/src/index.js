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
import RestaurantMainPage from "./page/RestaurantMainPage";
import StaffManagementPage from "./page/StaffManagementPage";
import EditRestaurantPage from "./page/EditRestaurantPage";
import SelfEditAccountPage from "./page/SelfEditAccountPage";
import InventoryPage from "./page/InventoryPage";
import MenuManagementPage from "./page/MenuManagementPage";
import OrderHandlerPage from "./page/OrderHandlerPage";

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

    <Route path="/:username/:restaurantId" element={<MainPageWrapper />} />

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
      element={<InventoryPageWrapper />}
    />

    <Route path="/:username/account" element={<SelfEditAccountPageWrapper />} />

    <Route
      path="/:username/:restaurantId/menu-and-components"
      element={<MenuManagementPageWrapper />}
    />

    <Route
    path="/:username/:restaurantId/order-in"
    element = {<OrderHandlerPageWrapper />}/>
  </Routes>
);

function RestaurantListPageWrapper() {
  let { username } = useParams();
  return <RestaurantListPage username={username} />;
}

function MainPageWrapper() {
  let { username } = useParams();
  let { restaurantId } = useParams();
  return <RestaurantMainPage username={username} restaurantId={restaurantId} />;
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
  return <SelfEditAccountPage username={username} />;
}

function EditRestaurantPageWrapper() {
  let { username } = useParams();
  let { restaurantId } = useParams();
  return <EditRestaurantPage username={username} restaurantId={restaurantId} />;
}

function InventoryPageWrapper() {
  let { username } = useParams();
  let { restaurantId } = useParams();
  return <InventoryPage username={username} restaurantId={restaurantId} />;
}

function MenuManagementPageWrapper() {
  let { username } = useParams();
  let { restaurantId } = useParams();
  return (
    <MenuManagementPage username={username} restaurantId={restaurantId} />
  );
}

function OrderHandlerPageWrapper()
{
  let { username } = useParams();
  let { restaurantId } = useParams();
  return (
    <OrderHandlerPage username={username} restaurantId={restaurantId} />
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router>{router}</Router>);
