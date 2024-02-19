import React from "react";
import "./OwnerSideNavBar.css";

function OwnerSideNavBar(props) {
  const btnMenuOwnerWord = [
    "แดชบอร์ด",
    "รับออเดอร์",
    "สต็อกวัตถุดิบ",
    "พนักงาน",
    "รายการเมนู",
    "ข้อมูลร้าน",
  ];

  const btnMenuIcon = [
    "dashboard",
    "list_alt",
    "inventory",
    "groups",
    "restaurant_menu",
    "info",
  ];

  const btnHref = [
    "http://localhost:3000/" + props.username + "/" + props.restaurantId + "/dashboard",

    "http://localhost:3000/" + props.username + "/" + props.restaurantId + "/order-in",

    "http://localhost:3000/" + props.username + "/" + props.restaurantId + "/inventory-management",

    "http://localhost:3000/" + props.username + "/" + props.restaurantId + "/staff-management",

    "http://localhost:3000/" + props.username + "/" + props.restaurantId + "/menu-and-components",

    "http://localhost:3000/" + props.username + "/" + props.restaurantId + "/info",
  ];

  return (
    <div id="owner-side-nav-bar">
      <div id="restaurant-profile">
        <div id="restaurant-profile-rest-pic" style={{
          backgroundImage: `url(${props.restaurantImage})`,
        }}></div>
        <div id="restaurant-profile-user-and-rest-name">
          <div id="restaurant-profile-user-name">{props.username}</div>
          <div id="restaurant-profile-rest-name">{props.restaurantName}</div>
        </div>
      </div>
      <div id="curve"></div>
      <div id="owner-side-nav-bar-btn-list">{btnMenuOwnerWord.map((word, index) => (
        <a className="menu-opt" href={btnHref[index]}>
          <span>
            <i className="material-icons">{btnMenuIcon[index]}</i>
          </span>
          <p>
            {word}
          </p>
        </a>
      ))}</div>

    </div>
  );
}

export default OwnerSideNavBar;
