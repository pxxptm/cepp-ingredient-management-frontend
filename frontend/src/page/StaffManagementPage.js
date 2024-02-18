import React from "react";
import "./StaffManagementPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/OwnerSideNavBar";

function StaffManagementPage({ username, restaurantName }) {
  console.log(username);
  return (
    <div id="Staff-management-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="Staff-management-page-header-bar">
        <UserHeaderBar username={username} />
      </div>

      <div id="Staff-management-page-body">
        <div id="Staff-management-page-side-bar-menu">
          <UserSideNavBar username={username} restaurantName={restaurantName} />
        </div>

        <div id="Staff-management-page-content">
          <div id="Staff-management-page-content-header">
            <h1>พนักงาน</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffManagementPage;
