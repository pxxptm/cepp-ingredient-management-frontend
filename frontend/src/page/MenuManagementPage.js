import React, { useEffect, useState } from "react";
import "./MenuManagementPage.css";
import axios from "axios";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/UserSideNavBar";
import CreateMenuModal from "../component/CreateMenuModal";
import DeleteMenuConfirmModal from "../component/DeleteMenuConfirmModal";
import MenuDetailModal from "../component/MenuDetailModal";

function OwnerMenuManagementPage({ username, restaurantId }) {
  const accessToken = localStorage.getItem("token");
  const [menuList, setMenuList] = useState([]);
  const [createMenuModalOpen, setCreateMenuModalOpen] = useState(false);
  const [editmenuModalOpen, setEditMenuModalOpen] = useState(false);
  const [deletemenuModalOpen, setDeleteMenuModalOpen] = useState(false);

  let menuListURL = `http://localhost:3001/menu/get-all-menu/${restaurantId}`;
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;

  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();
  const defaultPreviewImageUrl =
    "http://100.111.182.51:9000/cepp/ff70481200101befa8a695726a8d7e91.png";
  // State to hold delete mennu props
  const [deleteMenuProps, setDeleteMenuProps] = useState(null);

  // Function to handle delete menu click event and set props
  const handleDeleteMenu = (name, menuId) => {
    setDeleteMenuModalOpen(true);
    setDeleteMenuProps({ name, menuId });
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
        let menu = response.data;
        if (sortCriteriaTerm === 0) {
          setMenuList(menu);
        } else if (sortCriteriaTerm === 1) {
          const sortedMenuList = [...menu].sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          setMenuList(sortedMenuList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

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

  // Function to handle edit menu click event and set props
  const handleEditMenu = (menuId) => {
    setEditMenuModalOpen(true);
    setEditMenuProps({ menuId });
  };

  // State to hold edit mennu props
  const [editMenuProps, setEditMenuProps] = useState(null);

  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [sortCriteriaTerm, setSortCriteriaTerm] = useState(0);
  const [menuClassName, setMenuClassName] = useState("inactive");
  const [menuBtnClassName, setMenuBtnClassName] = useState("sortInactive");

  const toggleMenu = () => {
    setMenuClassName((prevClassName) =>
      prevClassName === "active" ? "inactive" : "active"
    );
    setMenuBtnClassName((prevClassName) =>
      prevClassName === "sortActive" ? "sortInactive" : "sortActive"
    );
  };

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
        <UserHeaderBar username={username} restaurantId={restaurantId} />
      </div>

      <div id="Menu-management-page-body">
        {createMenuModalOpen && (
          <CreateMenuModal
            setCreateMenuModalOpen={setCreateMenuModalOpen}
            restaurantId={restaurantId}
          />
        )}

        {deletemenuModalOpen && deleteMenuProps && (
          <DeleteMenuConfirmModal
            setDeleteMenuConfirmModalOpen={setDeleteMenuModalOpen}
            menuId={deleteMenuProps.menuId}
            menuName={deleteMenuProps.name}
          />
        )}

        {editmenuModalOpen && editMenuProps && (
          <MenuDetailModal
            restaurantId={restaurantId}
            menuId={editMenuProps.menuId}
            setEditMenuModalOpen={setEditMenuModalOpen}
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
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อเมนู"
              id="staff-search-space"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />

            <button
              id="add-menu-btn"
              onClick={() => {
                setCreateMenuModalOpen(true);
              }}
            >
              <span>+</span>เพิ่มเมนู
            </button>

            <div id="role-filter-zone">
              <button
                className={menuBtnClassName}
                id="role-filter"
                onClick={toggleMenu}
              >
                <i className="material-icons" id="staff-name-icon">
                  settings
                </i>
                การเรียงลำดับ
              </button>
              <ul className={menuClassName}>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      setSortCriteriaTerm(0);
                      setMenuBtnClassName("sortInactive");
                      setMenuClassName("inactive");
                    }}
                  >
                    <div>{sortCriteriaTerm === 0 && "⬤"}</div> วันสร้างเมนู
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      if (sortCriteriaTerm === 1) {
                        setSortCriteriaTerm(0);
                      } else {
                        setSortCriteriaTerm(1);
                      }
                      setMenuBtnClassName("sortInactive");
                      setMenuClassName("inactive");
                    }}
                  >
                    <div>{sortCriteriaTerm === 1 && "⬤"}</div> ชื่อเมนู
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div id="Menu-management-page-content-table-zone">
            <div id="Menu-management-page-content-table">
              {menuList.filter(
                (menu) =>
                  menu &&
                  menu.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length !== 0 &&
                menuList.map(
                  (menu, index) =>
                    menu &&
                    menu.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) && ( // Check if menu is not null
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
                                <div
                                  style={{
                                    color: "rgb(10, 129, 169)",
                                    fontWeight: "bold",
                                  }}
                                >
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
                              <button
                                onClick={() => {
                                  handleEditMenu(menu._id);
                                }}
                              >
                                สูตรและข้อมูลเมนู
                              </button>
                            </div>

                            <div id="a-menu-container-col-6">
                              <button
                                id="delete-menu-btn"
                                onClick={() => {
                                  handleDeleteMenu(menu.name, menu._id);
                                }}
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

              {menuList.length > 0 &&
                menuList.filter((menu) =>
                  menu.name.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                  <div id="no-search-results">
                    <p>ไม่พบเมนูที่คุณต้องการค้นหาในรายชื่อเมนูของคุณ .</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerMenuManagementPage;
