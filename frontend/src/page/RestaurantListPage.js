import React, { useState } from 'react';
import axios from 'axios';
import './RestaurantListPage.css';
import RestaurantListHeaderBar from '../component/RestaurantListHeaderBar';
import RestaurantRegisterModal from '../component/RestaurantRegisterModal';
import RestaurantCard from './RestaurantCard';

function RestaurantListPage({ username }) {
  const url = 'http://localhost:3001/member/restaurant';
  const accessToken = localStorage.getItem('token');
  const [modalOpen, setModalOpen] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);

  axios
    .get(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    .then((response) => {
      setRestaurantList(response.data);
    })
    .catch((error) => {
      console.log(error);
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

      <RestaurantListHeaderBar username={username} />

      <div id="Restaurant-list-page-body">
        {modalOpen && <RestaurantRegisterModal setOpenModal={setModalOpen} />}
        <div id="Restaurant-list-page-header">
          <div id="restaurant-list-page-head-zone">
            <h1>ร้านอาหารของคุณ</h1>
            <div id="restaurant-list-page-head-zone-btn">
              <button
                className="openModalBtn"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <span>+</span>เพิ่มร้านของคุณ
              </button>
            </div>
          </div>
        </div>

        <div id="rest-list-cards">
          <div id="rest-list-cards-table">
          {restaurantList.length > 0 &&
            restaurantList.map(
              (restaurant, index) =>
                restaurant && ( 
                  <RestaurantCard
                    restaurantName={restaurant.name}
                    restaurantDescription={restaurant.description}
                  />
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantListPage;
