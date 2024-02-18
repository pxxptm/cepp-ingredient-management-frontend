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
    "http://localhost:3000/"+ props.restaurantName + "/" + "/dashboard",

    "http://localhost:3000/"+ props.restaurantName + "/" + props.username + "/order-in",

    "http://localhost:3000/"+ props.restaurantName + "/" +  +
      props.username +
      "/inventory-management",

    "http://localhost:3000/"+ props.restaurantName + "/" +
      props.username +
      "/staff-management",

    "http://localhost:3000/"+ props.restaurantName + "/" + "/menu-and-components",

    "http://localhost:3000/"+ props.restaurantName + "/" + "/restaurant",
  ];

  return (
    <div id="owner-side-nav-bar">
      <div id="restaurant-profile">
        <div id="restaurant-profile-rest-pic"></div>
        <div id="restaurant-profile-user-and-rest-name">
        <div id="restaurant-profile-user-name">{props.username}</div>
        <div id="restaurant-profile-rest-name">{props.restaurantName}</div>
        </div>
      </div>
      <div id="curve"></div>
      <div  id="owner-side-nav-bar-btn-list">{btnMenuOwnerWord.map((word, index) => (
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
