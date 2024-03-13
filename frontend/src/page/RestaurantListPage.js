import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RestaurantListPage.css";
import RestaurantListHeaderBar from "../component/RestaurantListHeaderBar";
import RestaurantRegisterModal from "../component/RestaurantRegisterModal";
import RestaurantCard from "../component/RestaurantCard";

function RestaurantListPage({ username }) {
  const urlRestaurantList = "http://localhost:3001/member/restaurant";
  const urlUserDetail = "http://localhost:3001/user/role";
  const accessToken = localStorage.getItem("token");
  const [modalOpen, setModalOpen] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);
  const [userRole, setUserRole] = useState("staff");
  // get restaurant of this user
  useEffect(() => {
    axios
      .get(urlRestaurantList, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        if (JSON.stringify(response.data) !== JSON.stringify(restaurantList)) {
          setRestaurantList(response.data);
          console.log("Updated data:", restaurantList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

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
        setUserRole(role);
      })
      .catch((error) => {
        console.log(error);
      });
  });

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
        <RestaurantListHeaderBar username={username} />
      </div>

      <div id="Restaurant-list-page-body">
        {modalOpen && <RestaurantRegisterModal setOpenModal={setModalOpen} />}
        <div id="Restaurant-list-page-header">
          <div id="restaurant-list-page-head-zone">
            <h1>ร้านอาหารของคุณ</h1>
            <div id="restaurant-list-page-head-zone-btn">
              {userRole === "owner" && (
                <button
                  className="openModalBtn"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  <span>+</span>เพิ่มร้านของคุณ
                </button>
              )}
            </div>
          </div>
        </div>

        <div id="rest-list-cards">
          <div id="rest-list-cards-table">
            {restaurantList.length > 0 &&
              restaurantList.map(
                (restaurant, index) =>
                  restaurant && ( // Check if restaurant is not null
                    <div id="rest-card">
                      {
                        <RestaurantCard
                          restaurantId={restaurant._id}
                          restaurantName={restaurant.name}
                          restaurantDescription={restaurant.description}
                          restaurantImage={restaurant.image}
                          username={username}
                          serRole={userRole}
                        />
                      }
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantListPage;
