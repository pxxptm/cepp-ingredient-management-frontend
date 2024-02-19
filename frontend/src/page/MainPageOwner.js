import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./MainPageOwner.css";
import RestaurantListHeaderBar from "../component/RestaurantListHeaderBar";
import UserSideNavBar from "../component/OwnerSideNavBar";

function MainPageOwner({ username, restaurantId }) {
  const userRole = useRef("staff");
  const urlUserDetail = "http://localhost:3001/user/role";
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`
  const accessToken = localStorage.getItem("token");

  const [restaurantName, setRestaurantName] = useState()

  useEffect(() => {
    axios.get(urlRestaurantDetail, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then((res) => {
      const name = res.data.name
      setRestaurantName(name)
    }).catch((err) => {
      console.log(err)
    })
  })

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
          <UserSideNavBar username={username} restaurantId={restaurantId} restaurantName={restaurantName} />
        </div>
      </div>
    </div>
  );
}

export default MainPageOwner;
