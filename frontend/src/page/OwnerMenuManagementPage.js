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

  let menuListURL = `http://localhost:3001/menu/get-all-menu/${restaurantId}`;
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;

  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();
  const defaultPreviewImageUrl =
    "http://100.111.182.51:9000/cepp/ff70481200101befa8a695726a8d7e91.png";

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
  }, [menuList]);

  const toggleMenuStatus = (menuId, status) => {
    const updatedMenuList = menuList.map((menu) =>
      menu.id === menuId ? { ...menu, status: !status } : menu
    );
    setMenuList(updatedMenuList);
    axios
      .patch(
        `http://localhost:3001/menu/${menuId}`,
        { status: !status },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                    menu && ( // Check if menu is not null
                      <div id="menu-block" key={menu.userId}>
                        {
                          <div id="a-menu-container">
                            <div id="a-menu-container-col-1">
                              {menu.image !== defaultPreviewImageUrl && (
                                <div
                                  id="menu-pic"
                                  style={{
                                    backgroundImage: `url(${menu.image})`,
                                    backgroundSize: "Cover",
                                    marginRight: "5%",
                                  }}
                                ></div>
                              )}
                              {menu.image === defaultPreviewImageUrl && (
                                <div id="menu-pic"></div>
                              )}
                            </div>

                            {menu.image !== defaultPreviewImageUrl && (
                              <div id="a-menu-container-col-2-have-pic">
                                <div id="menu-name-have-pic"> {menu.name} </div>
                              </div>
                            )}
                            {menu.image === defaultPreviewImageUrl && (
                              <div id="a-menu-container-col-2-have-no-pic">
                                <div id="menu-name-have-no-pic">
                                  {" "}
                                  {menu.name}{" "}
                                </div>
                              </div>
                            )}
                            <div id="a-menu-container-col-3">
                              {menu.status === true && (
                                <div style={{ color: "rgb(10, 129, 169)" , fontWeight:"bold" }}>
                                  เปิดการขาย
                                </div>
                              )}
                              {menu.status !== true && <div>ปิดการขาย</div>}
                            </div>

                            <div id="a-menu-container-col-4">
                              <div id="a-menu-container-col-4-toggleSwitch">
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    checked={menu.status}
                                    onChange={() =>
                                      toggleMenuStatus(menu._id, menu.status)
                                    }
                                  />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </div>

                            <div id="a-menu-container-col-5">
                              <button>สูตรและข้อมูลเมนู</button>
                            </div>

                            <div id="a-menu-container-col-6">
                              <button
                                id="delete-menu-btn"
                                /*onClick={() => {
                                  handleDeleteIngredient(
                                    ingredient.name,
                                    ingredient._id
                                  );
                                }}*/
                              >
                                <i
                                  className="material-icons"
                                  id="delete-menu-btn-icon"
                                >
                                  delete
                                </i>
                              </button>
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
