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
  const [filteredIngredientList, setFilteredIngredientList] = useState([]);

  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [openStockTimeChange, setOpenStockTimeChange] = useState("");
  const [closeStockTimeChange, setCloseStockTimeChange] = useState("");
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;
  const urlIngredientList = `http://localhost:3001/ingredient/restaurant/${restaurantId}`;

  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(urlIngredientList, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setIngredientList(res.data);
        setFilteredIngredientList(res.data);
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
        console.log("Success:", res);
      })
      .catch((error) => {
        console.error(error);
      });
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

        <div id="inventory-page-content">
          <div id="inventory-page-content-header">
            <h1>สต็อกวัตถุดิบ</h1>
            <div id="setting-stock-btn-zone">
              <input
                type="text"
                placeholder="ค้นหา"
                id="search-space"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              {userRole === "owner" && (
                <div>
                  <button
                    id="add-ingredient-btn"
                    onClick={() => {
                      setAddIngredientModalOpen(true);
                    }}
                  >
                    <span>+</span>เพิ่มวัตถุดิบ
                  </button>
                  <button id="set-time-btn">เวลาตรวจสต็อก</button>
                  <div>
                    <input
                      id="open-stock-time"
                      type="time"
                      value={openStockTimeChange}
                      onChange={(e) => {
                        setOpenStockTimeChange(e.target.value);
                        handleUpdateOpenStockTime(e.target.value);
                      }}
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
                </div>
              )}
            </div>
          </div>

          {ingredientList.length > 0 &&
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
                            value={
                              Number.isInteger(ingredient.amount)
                                ? ingredient.amount
                                : ingredient.amount
                            }
                            onChange={(e) => {
                              const newValue = e.target.value;
                              let newQuantity;
                              if (newValue === "" || newValue === "0") {
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
