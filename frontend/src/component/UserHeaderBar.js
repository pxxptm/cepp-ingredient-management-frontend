import React, { useEffect, useState } from "react";
import "./UserHeaderBar.css";
import Clock from "./Clock";
import UserHeaderName from "./UserHeaderName";
import axios from "axios";

const HearderBar = (props) => {
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const rolePriority = {
    owner: 1,
    manager: 2,
    stockcontroller: 3,
    employee: 4,
  };

  const btnMenuOwnerWord = [
    { label: "แดชบอร์ด", priority: 2 },
    { label: "รับออเดอร์", priority: 4 },
    { label: "สต็อกวัตถุดิบ", priority: 3 },
    { label: "พนักงาน", priority: 1 },
    { label: "รายการเมนู", priority: 1 },
    { label: "ข้อมูลร้าน", priority: 4 },
  ];


  const [allowedMenuOptions, setAllowedMenuOptions] = useState([]);

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
        // Filter menu options based on role priority
        const allowedOptions = btnMenuOwnerWord.filter(
          (option) => rolePriority[role] <= option.priority
        );
        setAllowedMenuOptions(allowedOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken, urlUserDetail]);

  const btnHref = {
    แดชบอร์ด: `http://localhost:3000/${props.username}/${props.restaurantId}`,
    รับออเดอร์: `http://localhost:3000/${props.username}/${props.restaurantId}/order-in`,
    สต็อกวัตถุดิบ: `http://localhost:3000/${props.username}/${props.restaurantId}/inventory-management`,
    พนักงาน: `http://localhost:3000/${props.username}/${props.restaurantId}/staff-management`,
    รายการเมนู: `http://localhost:3000/${props.username}/${props.restaurantId}/menu-and-components`,
    ข้อมูลร้าน: `http://localhost:3000/${props.username}/${props.restaurantId}/info`,
  };

  const restaurantListPageURL =
    "http://localhost:3000/" + props.username + "/restaurant";
  return (
    <div id="user-header-bar">
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

      <div id="user-header-bar-SW-name">
        <a href={restaurantListPageURL}>Victual Ingredients Management</a>
      </div>

      <div id="user-header-bar-item-zone">
        <div id="name-clock">
          <div id="user-header-name">
            <UserHeaderName username={props.username} />
          </div>
          <div id="div-clock">
            <Clock />
          </div>
        </div>
        <div className="home-nav-btn">
          <button id="logout-btn" onClick={handleLogout}>
            ออกจากระบบ
          </button>
        </div>

        <div className="user-header-bar-sidebar">
          <button
            className="user-header-bar-sidebar-btn"
            id="user-header-bar-sidebar-btn-menu"
          >
            <i className="material-icons">menu</i>
          </button>

          <button
            className="user-header-bar-sidebar-btn"
            id="user-header-bar-sidebar-btn-logout"
            onClick={handleLogout}
          >
            <i className="material-icons">logout</i>
          </button>

          <div className="user-header-bar-sidebar-content">
            {allowedMenuOptions.map((option, index) => (
              <a key={index} className="menu-opt" href={btnHref[option.label]}>
                
                <p>{option.label}</p>
              </a>
            ))}
            <a href="#" id="user-header-bar-logout" onClick={handleLogout}>
              ออกจากระบบ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HearderBar;
