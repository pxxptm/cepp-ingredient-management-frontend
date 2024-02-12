import React from 'react';
import axios from 'axios';
import './RestaurantListPage.css';
import RestaurantListHeaderBar from '../component/RestaurantListHeaderBar'

function RestaurantListPage({ username }) {
  const url = 'http://localhost:3001/member/restaurant';
  const accessToken = localStorage.getItem('token');

  axios
    .get(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    .then((response) => {
      console.log(response);
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
      <div id="Restaurant-list-page-body">
        <div id="Restaurant-list-page-header">
          <RestaurantListHeaderBar username={username} />
        </div>
      </div>
    </div>
  );
}

export default RestaurantListPage;
