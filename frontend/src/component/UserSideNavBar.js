import React, { useEffect, useRef, useState } from "react";
import "./UserSideNavBar.css";
import axios from "axios";

function OwnerSideNavBar(props) {
  const rolePriority = {
    "owner": 1,
    "manager": 2,
    "stockcontroller": 3,
    "employee": 4
  };

  const btnMenuOwnerWord = [
    { label: "แดชบอร์ด", priority: 2 },
    { label: "รับออเดอร์", priority: 4 },
    { label: "สต็อกวัตถุดิบ", priority: 3 },
    { label: "พนักงาน", priority: 1 },
    { label: "รายการเมนู", priority: 1 },
    { label: "ข้อมูลร้าน", priority: 4 },
  ];

  const btnMenuIcon = ["dashboard",
  "list_alt",
  "inventory",
  "groups",
  "restaurant_menu",
  "info",]

  const btnHref = {
    "แดชบอร์ด" : `http://localhost:3000/${props.username}/${props.restaurantId}`,
    "รับออเดอร์" : `http://localhost:3000/${props.username}/${props.restaurantId}/order-in`,
    "สต็อกวัตถุดิบ" : `http://localhost:3000/${props.username}/${props.restaurantId}/inventory-management`,
    "พนักงาน" : `http://localhost:3000/${props.username}/${props.restaurantId}/staff-management`,
    "รายการเมนู" : `http://localhost:3000/${props.username}/${props.restaurantId}/menu-and-components`,
    "ข้อมูลร้าน" : `http://localhost:3000/${props.username}/${props.restaurantId}/info`,
  }

  const [allowedMenuOptions, setAllowedMenuOptions] = useState([]);

  const userRole = useRef("staff");
  const accessToken = localStorage.getItem("token");
  const urlUserDetail = "http://localhost:3001/user/role";

  // Get role of this user
  useEffect(() => {
    axios
      .get(urlUserDetail, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        const role = response.data.role;
        userRole.current = role;
        console.log(userRole.current);

        // Filter menu options based on role priority
        const allowedOptions = btnMenuOwnerWord.filter(option => rolePriority[role] <= option.priority);
        setAllowedMenuOptions(allowedOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken, urlUserDetail]);

  return (
    <div id="owner-side-nav-bar">
      <div id="restaurant-profile">
        <div id="restaurant-profile-rest-pic" style={{
          backgroundImage: `url(${props.restaurantImage})`,
          backgroundSize: "Cover",
        }}></div>
        <div id="restaurant-profile-user-and-rest-name">
          <div id="restaurant-profile-user-name">{props.username}</div>
          <div id="restaurant-profile-rest-name">{props.restaurantName}</div>
        </div>
      </div>
      <div id="curve"></div>
      <div id="owner-side-nav-bar-btn-list">
        {allowedMenuOptions.map((option, index) => (
          <a key={index} className="menu-opt" href={btnHref[option.label]}>
            <span>
              <i className="material-icons">{btnMenuIcon[index]}</i>
            </span>
            <p>{option.label}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default OwnerSideNavBar;
