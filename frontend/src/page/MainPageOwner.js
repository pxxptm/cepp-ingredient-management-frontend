import React, { useEffect, useRef } from "react";
import axios from "axios";
import "./MainPageOwner.css";
import RestaurantListHeaderBar from "../component/RestaurantListHeaderBar";
import UserSideNavBar from "../component/OwnerSideNavBar";

function MainPageOwner({ username , restaurantName }) {
  const userRole = useRef("staff");
  const urlUserDetail = "http://localhost:3001/user/role";
  const accessToken = localStorage.getItem("token");

  // get role of this user
  useEffect(() => {
    axios
      .get(urlUserDetail, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        const role = response.data.role;
        userRole.current = role;
        console.log(userRole.current);
      })
      .catch((error) => {
        console.log(error);
      });
  });


  return (
    <div id="Owner-main-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="Owner-main-page-header-bar">
        <RestaurantListHeaderBar username={username} />
      </div>

      <div id="Owner-main-page-body">
        <div id="Owner-main-page-side-bar-menu">
          <UserSideNavBar username={username} restaurantName={restaurantName}/>
        </div>
      </div>
    </div>
  );
}

export default MainPageOwner;
