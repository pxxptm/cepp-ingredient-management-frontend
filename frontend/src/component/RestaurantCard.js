import React, { useState } from "react";
import "./RestaurantCard.css";

function RestaurantCard(props) {
  const [urlDependOnRole, setUrlDependOnRole] = useState(
    props.userRole === "owner" || props.userRole === "manager"
      ? "http://localhost:3000/" + props.username + "/" + props.restaurantId
      : "http://localhost:3000/" + props.username + "/" + props.restaurantId + "/order-in"
  );

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
