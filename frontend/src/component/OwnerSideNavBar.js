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
    "http://localhost:3000/:restaurantName/" +
      "/dashboard",

      "http://localhost:3000/:restaurantName/" +
      props.username +
      "/order-in",

    "http://localhost:3000/:restaurantName/" +
      props.username +
      "/inventory-management",

      "http://localhost:3000/:restaurantName/" +
      props.username +
      "/staff-management",

      "http://localhost:3000/:restaurantName/" +
      "/menu-and-components",

      "http://localhost:3000/:restaurantName/" +
      "/restaurant",
  ];

  return (
    <div id="owner-side-nav-bar">
      <div>
        
      </div>
      {btnMenuOwnerWord.map((word, index) => (
        <a className="menu-opt" href={btnHref[index]}>
            <span >
              <i className="material-icons">{btnMenuIcon[index]}</i>
            </span>
            <p>{word}</p>
        </a>
        
      ))}
    </div>
  );
}

export default OwnerSideNavBar;
