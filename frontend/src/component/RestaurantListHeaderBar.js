import React from "react";
import "./RestaurantListHeaderBar.css";
import Clock from "./Clock";
import UserHeader from "./UserHeaderName";

const RestaurantListHeaderBar = (props) => {
  const restaurantListPageURL =
    "http://localhost:3000/" + props.username + "/restaurant";
  return (
    <div id="rest-list-header-bar">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>
      <link
        href="https://fonts.googleapis.com/css?family=Inter"
        rel="stylesheet"
      ></link>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
      ></link>

      <div id="rest-list-header-bar-SW-name">
        <a href={restaurantListPageURL}>Victual Ingredients Management</a>
      </div>

      <div id="rest-list-header-bar-item-zone">
        <div id="name-clock">
          <div>
            <UserHeader username={props.username} />
          </div>
          <div id="div-clock">
            <Clock />
          </div>
        </div>
        <div className="home-nav-btn">
          <button id="rest-list-logout-btn">ออกจากระบบ</button>
        </div>

        <a href="http://localhost:3000/login" id="rest-list-logout-btn-icon">
          <i className="material-icons">logout</i>
        </a>
      </div>
    </div>
  );
};

export default RestaurantListHeaderBar;
