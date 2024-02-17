import React from "react";
import UserHeaderBar from "../component/UserHeaderBar";

function StaffManagementPage({ username , restaurantName }) {
    console.log(username)
  return (
    <div id="Restaurant-list-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="Restaurant-list-page-header-bar">
        <UserHeaderBar username={ username } />
      </div>

      <div id="Restaurant-list-page-body"></div>
    </div>
  );
}

export default StaffManagementPage;
