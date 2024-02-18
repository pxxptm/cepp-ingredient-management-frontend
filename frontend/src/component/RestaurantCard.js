import React from "react";
import "./RestaurantCard.css";

function RestaurantCard(props) {
  let urlDependOnRole;

  if ( props.thisUserRole === "owner")
  {
    urlDependOnRole = "http://localhost:3000/" + props.username + "/" + props.restaurantName ;
  }

  return (
    <a id="rest-card-link" href={urlDependOnRole}>
      <div id="rest-card-container">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
        <div
          id="rest-card-pic"
          style={{
            backgroundImage: `url(${props.restaurantImage})`,
          }}
        ></div>
        <div id="rest-card-content">
          <div id="rest-card-name">{props.restaurantName}</div>
          <div id="rest-card-description">{props.restaurantDescription}</div>
        </div>
      </div>
    </a>
  );
}

export default RestaurantCard;
