import React, { useEffect, useState } from "react";
import "./InventoryPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/UserSideNavBar";
import AddingredientsModal from "../component/AddIngredientsModal";
import axios from "axios";
import EditIngredientsModal from "../component/EditIngredientsModal";
import DeleteIngredientConfirmModal from "../component/DeleteIngredientConfirmModal";

export default function OwnerInventoryPage({ username, restaurantId }) {
  const accessToken = localStorage.getItem("token");
  const [addIngredientModalOpen, setAddIngredientModalOpen] = useState(false);
  const [editIngredientModalOpen, setEditIngredientModalOpen] = useState(false);
  const [deleteIngredientModalOpen, setDeleteIngredientModalOpen] =
    useState(false);
  const [ingredientList, setIngredientList] = useState([]);

  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [openStockTimeChange, setOpenStockTimeChange] = useState("");
  const [closeStockTimeChange, setCloseStockTimeChange] = useState("");
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;
  const urlIngredientList = `http://localhost:3001/ingredient/restaurant/${restaurantId}`;

  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();

  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [sortCriteriaTerm, setSortCriteriaTerm] = useState(0);
  const [menuClassName, setMenuClassName] = useState("inactive");
  const [menuBtnClassName, setMenuBtnClassName] = useState("sortInactive");

  // get restaurant detail
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
        setRestaurantDescription(res.data.description);
        setOpenStockTimeChange(res.data.openStockTime);
        setCloseStockTimeChange(res.data.closeStockTime);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    axios
      .get(urlIngredientList, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        let ingredients = res.data;
        //console.log(ingredients)
        if (sortCriteriaTerm === 0) {
          setIngredientList(ingredients);
        } else if (sortCriteriaTerm === 1) {
          const sortedIngredientsList = [...ingredients].sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          setIngredientList(sortedIngredientsList);
        } else if (sortCriteriaTerm === 2) {
          const sortedIngredientsList = [...ingredients].sort(
            (a, b) => a.amount - b.amount
          );
          setIngredientList(sortedIngredientsList);
        } else if (sortCriteriaTerm === 3) {
          const sortedIngredientsList = [...ingredients].sort(
            (a, b) => a.atLeast - b.atLeast
          );
          setIngredientList(sortedIngredientsList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // Function to update ingredient quantity
  const updateQuantity = (iname, atLeast, unit, ingredientId, newQuantity) => {
    // Patch updated quantity to API
    console.log(
      iname +
        " " +
        atLeast +
        " " +
        unit +
        " " +
        ingredientId +
        " " +
        newQuantity
    );
    axios
      .patch(
        `http://localhost:3001/ingredient/${ingredientId}`,
        {
          name: iname,
          amount: newQuantity,
          atLeast: atLeast,
          unit: unit,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // Update ingredient list with updated quantity
        setIngredientList((prevList) =>
          prevList.map((ingredient) =>
            ingredient._id === ingredientId
              ? { ...ingredient, quantity: newQuantity }
              : ingredient
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to increase quantity
  const increaseQuantity = (iname, atLeast, unit, ingredientId) => {
    const updatedIngredient = ingredientList.find(
      (ingredient) => ingredient._id === ingredientId
    );
    const newQuantity = updatedIngredient.amount + 1;
    updateQuantity(iname, atLeast, unit, ingredientId, newQuantity);
  };

  // Function to decrease quantity
  const decreaseQuantity = (iname, atLeast, unit, ingredientId) => {
    const updatedIngredient = ingredientList.find(
      (ingredient) => ingredient._id === ingredientId
    );
    const newQuantity = Math.max(updatedIngredient.amount - 1, 0);
    updateQuantity(iname, atLeast, unit, ingredientId, newQuantity);
  };

  // Function to handle edit ingredient click event and set props
  const handleEditIngredient = (
    name,
    atLeast,
    unit,
    ingredientId,
    newQuantity
  ) => {
    setEditIngredientModalOpen(true);
    setEditIngredientProps({ name, atLeast, unit, ingredientId, newQuantity });
  };

  // State to hold edit ingredient props
  const [editIngredientProps, setEditIngredientProps] = useState(null);

  // Function to handle delete ingredient click event and set props
  const handleDeleteIngredient = (name, ingredientId) => {
    setDeleteIngredientModalOpen(true);
    setDeleteIngredientProps({ name, ingredientId });
  };

  // State to hold delete ingredient props
  const [delteIngredientProps, setDeleteIngredientProps] = useState(null);

  const [userRole, setUserRole] = useState("staff");
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
        setUserRole(role); // Update state instead of ref
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken, urlUserDetail]);

  const handleUpdateOpenStockTime = (openStockTime) => {
    axios
      .patch(
        urlRestaurantDetail,
        {
          name: restaurantName,
          description: restaurantDescription,
          image: restaurantImage,
          openStockTime: openStockTime,
          closeStockTime: closeStockTimeChange,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Success:", res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateCloseStockTime = (closeStockTime) => {
    axios
      .patch(
        urlRestaurantDetail,
        {
          name: restaurantName,
          description: restaurantDescription,
          image: restaurantImage,
          openStockTime: openStockTimeChange,
          closeStockTime: closeStockTime,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        //console.log("Success:", res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [currentTime, setCurrentTime] = useState("");
  const [canOpen, setCanOpen] = useState(false);

  useEffect(() => {
    // Function to update current time
    const formatTime = (date) => {
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    const updateTime = () => {
      let currentTime = new Date();
      let formattedCurrentTime = formatTime(currentTime);
      setCurrentTime(formattedCurrentTime);

      if (userRole === "owner" || userRole === "manager") {
        setCanOpen(true);
      } else {
        // Format openStockTimeChange and closeStockTimeChange
        let openTime = new Date();
        openTime.setHours(...openStockTimeChange.split(":"));
        let closeTime = new Date();
        closeTime.setHours(...closeStockTimeChange.split(":"));
        //console.log(currentTime, openTime, closeTime);

        // Check if currentTime is between openStockTimeChange and closeStockTimeChange

        if (currentTime >= openTime && currentTime <= closeTime) {
          setCanOpen(true);
        } else {
          setCanOpen(false);
        }
      }
    };

    // Call updateTime initially
    updateTime();

    // Set interval to call updateTime every minute
    const intervalId = setInterval(updateTime, 30000);

    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  });

  const toggleMenu = () => {
    setMenuClassName((prevClassName) =>
      prevClassName === "active" ? "inactive" : "active"
    );
    setMenuBtnClassName((prevClassName) =>
      prevClassName === "sortActive" ? "sortInactive" : "sortActive"
    );
  };

  return (
    <div id="inventory-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="inventory-page-header-bar">
        <UserHeaderBar username={username} restaurantId={restaurantId} />
      </div>

      <div id="inventory-page-body">
        {userRole === "owner" && addIngredientModalOpen && (
          <AddingredientsModal
            setModalOpen={setAddIngredientModalOpen}
            restaurantId={restaurantId}
          />
        )}
        {editIngredientModalOpen && editIngredientProps && (
          <EditIngredientsModal
            setModalOpen={setEditIngredientModalOpen}
            restaurantId={restaurantId}
            nameStatic={editIngredientProps.name}
            atLeastStatic={editIngredientProps.atLeast}
            unitStatic={editIngredientProps.unit}
            ingredientId={editIngredientProps.ingredientId}
            amountStatic={editIngredientProps.newQuantity}
          />
        )}

        {deleteIngredientModalOpen && delteIngredientProps && (
          <DeleteIngredientConfirmModal
            setDeleteIngredientConfirmModalOpen={setDeleteIngredientModalOpen}
            ingredientId={delteIngredientProps.ingredientId}
            ingredientName={delteIngredientProps.name}
          />
        )}
        <div id="inventory-page-side-bar-menu">
          <UserSideNavBar
            username={username}
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            restaurantImage={restaurantImage}
          />
        </div>

        {canOpen && (
          <div id="inventory-page-content">
            <div id="inventory-page-content-header">
              <h1>สต็อกวัตถุดิบ</h1>
              <div id="setting-stock-btn-zone">
                <input
                  type="text"
                  placeholder="ค้นหาด้วยชื่อวัตถุดิบ"
                  id="ingredient-search-space"
                  value={searchTerm}
                  className="Clear input"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  style={{
                    borderRadius:
                      userRole === "owner" ? "0.7vw 0 0 0.7vw" : "0.7vw",
                    borderRight:
                      userRole === "owner"
                        ? "none"
                        : "0.1vw solid rgba(0, 0, 0, 0.4)",
                    marginRight: userRole === "owner" ? "0" : "1vw",
                    marginLeft: userRole === "owner" ? "0.5vw" : "2vw",
                    width: userRole === "owner" ? "37%" : "44%",
                  }}
                />

                {userRole === "owner" && (
                  <div id="only-owner">
                    {
                      <button
                        id="add-ingredient-btn"
                        onClick={() => {
                          setAddIngredientModalOpen(true);
                        }}
                      >
                        <span>+</span>เพิ่มวัตถุดิบ
                      </button>
                    }
                  </div>
                )}

                <div id="open-stock-time-zone">
                  <button id="set-time-btn">เวลาตรวจสต็อก</button>
                  <input
                    id="open-stock-time"
                    type="time"
                    value={openStockTimeChange}
                    onChange={(e) => {
                      setOpenStockTimeChange(e.target.value);
                      handleUpdateOpenStockTime(e.target.value);
                    }}
                    readOnly={userRole !== "owner"}
                  />
                  <div id="to-txt">ถึง</div>
                  <input
                    id="close-stock-time"
                    type="time"
                    value={closeStockTimeChange}
                    onChange={(e) => {
                      setCloseStockTimeChange(e.target.value);
                      handleUpdateCloseStockTime(e.target.value);
                    }}
                  />
                </div>

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
                        <div>{sortCriteriaTerm === 0 && "⬤"}</div>{" "}
                        วันเพิ่มวัตถุดิบ
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
                        <div>{sortCriteriaTerm === 1 && "⬤"}</div> ชื่อวัตถุดิบ
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          if (sortCriteriaTerm === 2) {
                            setSortCriteriaTerm(0);
                          } else {
                            setSortCriteriaTerm(2);
                          }
                          setMenuBtnClassName("sortInactive");
                          setMenuClassName("inactive");
                        }}
                      >
                        <div>{sortCriteriaTerm === 2 && "⬤"}</div> ปริมาณคงคลัง
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          if (sortCriteriaTerm === 3) {
                            setSortCriteriaTerm(0);
                          } else {
                            setSortCriteriaTerm(3);
                          }
                          setMenuBtnClassName("sortInactive");
                          setMenuClassName("inactive");
                        }}
                      >
                        <div>{sortCriteriaTerm === 3 && "⬤"}</div> ปริมาณขั้นต่ำ
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {ingredientList.length > 0 &&
              ingredientList.filter((ingredient) =>
                ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length !== 0 &&
              (userRole === "owner" ? (
                <div id="inventory-table-header">
                  <div id="inventory-table-header-txt-owner">
                    <div>ชื่อวัตถุดิบ</div>
                    <div id="header-col-2">ปริมาณคงคลัง</div>
                    <div id="header-col-3">หน่วย</div>
                    <div id="header-col-4">ขั้นต่ำ</div>
                  </div>
                </div>
              ) : (
                <div id="inventory-table-header">
                  <div id="inventory-table-header-txt">
                    <div>ชื่อวัตถุดิบ</div>
                    <div id="header-col-2">ปริมาณคงคลัง</div>
                    <div id="header-col-3">หน่วย</div>
                    <div id="header-col-4">ขั้นต่ำ</div>
                  </div>
                </div>
              ))}
            <div id="inventory-page-content-table-zone">
              <div id="inventory-page-content-table">
                {ingredientList.map(
                  (ingredient) =>
                    ingredient.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) && (
                      <div
                        key={ingredient._id}
                        id={
                          userRole === "owner"
                            ? "ingredient-block-owner"
                            : "ingredient-block"
                        }
                      >
                        <div id="a-ingredient-container">
                          <div id="a-ingredient-container-col-1">
                            <div id="ingredient-name">{ingredient.name}</div>
                          </div>

                          <div id="a-ingredient-container-col-2">
                            {/* increase - decrease */}
                            <button
                              className="value-button"
                              onClick={() =>
                                decreaseQuantity(
                                  ingredient.name,
                                  ingredient.atLeast,
                                  ingredient.unit,
                                  ingredient._id
                                )
                              }
                            >
                              -
                            </button>
                            <input
                              step="0.1"
                              type="number"
                              min="0"
                              value={
                                Number.isInteger(ingredient.amount)
                                  ? ingredient.amount
                                  : ingredient.amount.toFixed(2)
                              }
                              onChange={(e) => {
                                const newValue = e.target.value;
                                let newQuantity;
                                if (
                                  newValue === "" ||
                                  newValue === "0" ||
                                  newValue[0] === "-"
                                ) {
                                  newQuantity = 0;
                                } else if (
                                  Number.isInteger(parseFloat(newValue))
                                ) {
                                  newQuantity = parseInt(newValue, 10);
                                } else {
                                  newQuantity = parseFloat(newValue);
                                }
                                updateQuantity(
                                  ingredient.name,
                                  ingredient.atLeast,
                                  ingredient.unit,
                                  ingredient._id,
                                  newQuantity
                                );
                              }}
                              onFocus={(e) => {
                                e.target.step = "0.01"; // Change step attribute when focused
                              }}
                              onBlur={(e) => {
                                e.target.step = "1"; // Revert step attribute when focus is lost
                              }}
                            />
                            <button
                              className="value-button"
                              onClick={() =>
                                increaseQuantity(
                                  ingredient.name,
                                  ingredient.atLeast,
                                  ingredient.unit,
                                  ingredient._id
                                )
                              }
                            >
                              +
                            </button>
                          </div>

                          <div id="a-ingredient-container-col-3">
                            {ingredient.unit}
                          </div>

                          <div id="a-ingredient-container-col-4">
                            {ingredient.atLeast}
                          </div>

                          {userRole === "owner" && (
                            <div id="a-ingredient-container-col-5">
                              <button
                                id="edit-ingredient-btn"
                                onClick={() =>
                                  handleEditIngredient(
                                    ingredient.name,
                                    ingredient.atLeast,
                                    ingredient.unit,
                                    ingredient._id,
                                    ingredient.amount
                                  )
                                }
                              >
                                แก้ไข
                              </button>
                            </div>
                          )}

                          {userRole === "owner" && (
                            <div id="a-ingredient-container-col-6">
                              <button
                                id="delete-ingredient-btn"
                                onClick={() => {
                                  handleDeleteIngredient(
                                    ingredient.name,
                                    ingredient._id
                                  );
                                }}
                              >
                                <i
                                  className="material-icons"
                                  id="delete-ingredient-btn-icon"
                                >
                                  delete
                                </i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                )}
                {ingredientList.length > 0 &&
                  ingredientList.filter((ingredient) =>
                    ingredient.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ).length === 0 && (
                    <div id="no-search-results">
                      <p>
                        ไม่พบวัตถุดิบที่คุณต้องการค้นหาในคลังวัตถุดิบของคุณ .
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        {!canOpen && (
          <div id="inventory-page-content-cant-open">
            <div id="out-of-time">
              <div id="hourglass">
                <i className="material-icons">hourglass_bottom</i>
              </div>
              <div id="text">
                <div id="text1">
                  คุณไม่สามารถเข้าถึงสต็อกวัตถุดิบได้ในขณะนี้
                </div>
                <div id="text2">
                  เนื่องจากเป็นเวลานอกเหนือจากสิทธิ์ที่คุณได้รับอนุญาต
                </div>
                <div id="text3">
                  หากคิดว่าเกิดข้อผิดพลาด กรุณาติดต่อเจ้าของร้านเพื่อแก้ไข
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
