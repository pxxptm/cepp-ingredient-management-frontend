import React from "react";
import './StaffManagementPage.css'
import UserHeaderBar from "../component/UserHeaderBar";

function StaffManagementPage({ username , restaurantName }) {
    console.log(username)
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
        <UserHeaderBar username={ username } />
      </div>

      <div id="Staff-management-page-body"></div>
    </div>
  );
}

export default StaffManagementPage;
