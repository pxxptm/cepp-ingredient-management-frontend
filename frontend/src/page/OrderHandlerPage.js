import React, { useEffect, useState } from "react";
import "./OrderHandlerPage.css";
import RestaurantListHeaderBar from "../component/RestaurantListHeaderBar";
import UserSideNavBar from "../component/UserSideNavBar";
import axios from "axios";

function OrderHandlerPage({ username, restaurantId }) {
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;
  const accessToken = localStorage.getItem("token");

  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();

  useEffect(() => {
    axios
      .get(urlRestaurantDetail, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        const name = res.data.name;
        const image = res.data.image;
        setRestaurantName(name);
        setRestaurantImage(image);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div id="order-handler-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="order-handler-page-header-bar">
        <RestaurantListHeaderBar username={username} />
      </div>

      <div id="order-handler-page-body">
        <div id="order-handler-page-side-bar-menu">
          <UserSideNavBar
            username={username}
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            restaurantImage={restaurantImage}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderHandlerPage;
