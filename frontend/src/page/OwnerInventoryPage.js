import React, { useEffect, useState } from "react";
import "./OwnerInventoryPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/OwnerSideNavBar";
import AddingredientsModal from "../component/AddIngredientsModal";
import axios from "axios";

export default function OwnerInventoryPage({ username, restaurantId }) {
  const accessToken = localStorage.getItem("token");
  const [modalOpen, setModalOpen] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;
  const urlIngredientList = `http://localhost:3001/ingredient/restaurant/${restaurantId}`;

  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();
  const [fetchTrigger, setFetchTrigger] = useState(false); // State variable to trigger fetching of ingredient list

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to fetch ingredient list
  const fetchIngredientList = () => {
    axios
      .get(urlIngredientList, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setIngredientList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect to fetch ingredient list only when fetchTrigger changes
  useEffect(() => {
    fetchIngredientList();
  }, [fetchTrigger]);

  // Function to update ingredient quantity
  const updateQuantity = (iname, atLeast, unit, ingredientId, newQuantity) => {
    // Patch updated quantity to API
    console.log(
      "name : " +
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
        console.log("update");
        setFetchTrigger((prev) => !prev);
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

  return (
    <div id="Owner-inventory-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="Owner-inventory-page-header-bar">
        <UserHeaderBar username={username} />
      </div>

      <div id="Owner-inventory-page-body">
        {modalOpen && (
          <AddingredientsModal
            setModalOpen={setModalOpen}
            restaurantId={restaurantId}
          />
        )}
        <div id="Owner-inventory-page-side-bar-menu">
          <UserSideNavBar
            username={username}
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            restaurantImage={restaurantImage}
          />
        </div>

        <div id="Owner-inventory-page-content">
          <div id="Owner-inventory-page-content-header">
            <h1>สต็อกวัตถุดิบ</h1>
            <div id="add-staff-acc-btn-zone">
              <button
                id="add-ingredient-btn"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <span>+</span>เพิ่มวัตถุดิบ
              </button>
            </div>
          </div>

          <div id="Owner-inventory-page-content-table-zone">
            <div id="Owner-inventory-page-content-table">
              {ingredientList.length > 0 &&
                ingredientList.map(
                  (ingredient, index) =>
                    ingredient && ( // Check if staff is not null
                      <div id="ingredient-block" key={ingredient._id}>
                        {
                          <div id="a-ingredient-container">
                            <div id="a-ingredient-container-col-1">
                              <div id="ingredient-name">{ingredient.name}</div>
                            </div>

                            <div id="a-ingredient-container-col-2">
                              {/* increase - decrease */}
                              <div
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
                              </div>
                              <input
                                type="number"
                                value={ingredient.amount}
                                onChange={(e) => {
                                  const newValue = e.target.value.trim();
                                  let newQuantity;
                                  if (newValue === "" || newValue === "0") {
                                    newQuantity = 0;
                                  } else {
                                    newQuantity = parseInt(newValue);
                                    if (isNaN(newQuantity)) {
                                      return;
                                    }
                                  }
                                  updateQuantity(ingredient.name,
                                    ingredient.atLeast,
                                    ingredient.unit,
                                    ingredient._id,parseInt(newQuantity,10));
                                }}
                              />
                              <div
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
