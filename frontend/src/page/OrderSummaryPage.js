import React, { useEffect, useState } from "react";
import "./OrderSummaryPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/UserSideNavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrderSummaryPage({ username, restaurantId }) {
  const navigate = useNavigate();
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;
  const accessToken = localStorage.getItem("token");
  const latestOrder = JSON.parse(window.localStorage.getItem("LatestOrder"));
  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();

  const urlOrderHandlerPage = `/${username}/${restaurantId}/order-in`;
    

  console.log("order", latestOrder);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get(urlRestaurantDetail, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        const name = restaurantResponse.data.name;
        const image = restaurantResponse.data.image;
        setRestaurantName(name);
        setRestaurantImage(image);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [urlRestaurantDetail, accessToken]);

  return (
    <div id="order-summary-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="order-summary-page-header-bar">
        <UserHeaderBar username={username} restaurantId={restaurantId} />
      </div>

      <div id="order-summary-page-body">
        <div id="order-summary-page-side-bar-menu">
          <UserSideNavBar
            username={username}
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            restaurantImage={restaurantImage}
          />
        </div>
        <div id="order-summary-page-content">
          <div id="order-summary-page-content-inner">
            <div id="order-summary-header">
              <div id="order-summary-header-1">รายการออเดอร์ล่าสุด</div>
              <div id="order-summary-header-2" onClick={()=>{
                navigate(urlOrderHandlerPage, { replace: true });
              }} >เพิ่มเมนู &gt;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryPage;
