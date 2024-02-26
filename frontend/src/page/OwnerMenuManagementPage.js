import React, { useEffect, useState } from "react";
import "./OwnerMenuManagementPage.css";
import axios from "axios";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/OwnerSideNavBar";
import CreateMenuModal from "../component/CreateMenuModal";


function OwnerMenuManagementPage({ username, restaurantId }) {
  const accessToken = localStorage.getItem("token");
  const [menuList, setMenuList] = useState([]);
  const [createMenuModalOpen, setCreateMenuModalOpen] = useState(false);
  const [editmenuModalOpen, setEditmenuModalOpen] = useState(false);

  let menuListURL = `http://localhost:3001/menu/restaurant/${restaurantId}`;
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;

  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();

  const roleDict = {
    manager: "ผู้จัดการ",
    stockcontroller: "พนักงานดูแลคลังวัตถุดิบ",
    employee: "พนักงานทั่วไป",
  };

  useEffect(() => {
    axios
      .get(urlRestaurantDetail, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        const name = res.data.name;
        const image = res.data.image;
        setRestaurantName(name);
        setRestaurantImage(image);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // get menu of this restaurant
  useEffect(() => {
    axios
      .get(menuListURL, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (JSON.stringify(response.data) !== JSON.stringify(menuList)) {
          setMenuList(response.data);
          console.log(menuList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  /*
  // Function to handle edit ingredient click event and set props
  const handleEditmenu = (
    menuId,
    menuFName,
    menuLName,
    menuUsername,
    menuRole
  ) => {
    setEditmenuModalOpen(true);
    setEditmenuProps({
      menuId,
      menuFName,
      menuLName,
      menuUsername,
      menuRole,
    });
  };

  // State to hold edit ingredient props
  const [editmenuProps, setEditmenuProps] = useState(null); */

  return (
    <div id="Menu-management-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="Menu-management-page-header-bar">
        <UserHeaderBar username={username} />
      </div>

      <div id="Menu-management-page-body">
      {createMenuModalOpen && (
          <CreateMenuModal
            setCreateMenuModalOpen={setCreateMenuModalOpen}
            restaurantId={restaurantId}
          />
        )}
        <div id="Menu-management-page-side-bar-menu">
          <UserSideNavBar
            username={username}
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            restaurantImage={restaurantImage}
          />
        </div>

        <div id="Menu-management-page-content">
          <div id="Menu-management-page-content-header">
            <h1>รายการเมนู</h1>
            <button
              id="add-menu-btn"
              onClick={() => {
                setCreateMenuModalOpen(true);
              }}
            >
              <span>+</span>เพิ่มเมนู
            </button>
          </div>

          <div id="Menu-management-page-content-table-zone">
            <div id="Menu-management-page-content-table">
              {menuList.length > 0 &&
                menuList.map(
                  (menu, index) =>
                    menu &&
                     ( // Check if menu is not null
                      <div id="menu-block" key={menu.userId}>
                        {
                          <div id="a-menu-container">
                            <div id="a-menu-container-l">
                              <div id="Fname-and-Lname">
                                <div id="Fname">{menu.name}</div>
                                <div id="Lname">{menu.lastname}</div>
                              </div>

                              <div id="username-and-role">
                                <div id="username">
                                  <span>username : </span>
                                  {menu.username}
                                </div>
                                <div id="role">
                                  <span>role : </span>
                                  {roleDict[menu.role]}
                                </div>
                              </div>
                            </div>

                            <div id="a-menu-container-r">
                              <div className="a-menu-container-l-btn">
                                <button id="edit-acc" onClick={() => {}}>
                                  แก้ไขข้อมูล
                                </button>
                              </div>
                              <div className="a-menu-container-l-btn">
                                <button id="delete-acc">ลบบัญชี</button>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerMenuManagementPage;
