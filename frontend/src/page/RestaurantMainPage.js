import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RestaurantMainPage.css";
import RestaurantListHeaderBar from "../component/RestaurantListHeaderBar";
import UserSideNavBar from "../component/UserSideNavBar";

function RestaurantMainPage({ username, restaurantId }) {
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;
  const accessToken = localStorage.getItem("token");

  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();

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

  const urlSortedIngredientList = `http://localhost:3001/ingredient/restaurant-sorted/${restaurantId}`;
  const urlOutOfStockIngredientList = `http://localhost:3001/ingredient/restaurant-checkIngredient/${restaurantId}`;
  const [sortedIngredientList, setsortedIngredientList] = useState([]);
  const [outOfStockIngredientList, setOutOfStockIngredientList] = useState([]);
  const [nearlyOutIngredientList, setNearlyOutIngredientList] = useState([]);

  // Function to fetch ingredient list

  useEffect(() => {
    axios
      .get(urlSortedIngredientList, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setsortedIngredientList(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    axios
      .get(urlOutOfStockIngredientList, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        const allOutAndNearly = res.data;

        const oos = allOutAndNearly.filter((option) => option.amount === 0);

        const nearly = allOutAndNearly.filter(
          (option) => option.amount <= option.atLeast && option.amount !== 0
        );

        setOutOfStockIngredientList(oos);
        setNearlyOutIngredientList(nearly);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div id="main-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="main-page-header-bar">
        <RestaurantListHeaderBar username={username} />
      </div>

      <div id="main-page-body">
        <div id="main-page-side-bar-menu">
          <UserSideNavBar
            username={username}
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            restaurantImage={restaurantImage}
          />
        </div>

        <div id="main-page-content">
          <div id="main-page-content-frame">
            <div id="main-page-content-inner">
              <div id="sorted-all-zone">
                <div id="sorted-all-zone-table">
                  <div id="sorted-all-zone-table-header">
                    <div id="sorted-all-zone-table-header-txt">
                      <div>ชื่อวัตถุดิบ</div>
                      <div id="header-col-2">คงเหลือ</div>
                      <div id="header-col-3">หน่วย</div>
                    </div>
                  </div>
                  <div id="sorted-all-zone-table-zone">
                    <div id="sorted-all-zone-table-content">
                      {sortedIngredientList.length > 0 &&
                        sortedIngredientList.map(
                          (ingredient, index) =>
                            ingredient && ( // Check if staff is not null
                              <div
                                id="ingredient-block"
                                key={ingredient._id}
                                style={{
                                  backgroundColor:
                                    ingredient.amount === 0
                                      ? "#ffe6e6"
                                      : ingredient.amount <= ingredient.atLeast
                                      ? "#ffffcc"
                                      : "white",

                                  borderBottom:
                                    index === sortedIngredientList.length - 1
                                      ? "none"
                                      : "0.1vw solid rgba(0, 0, 0, 0.2)",
                                }}
                              >
                                {
                                  <div
                                    id="a-ingredient-container"
                                    style={{
                                      color:
                                        ingredient.amount === 0
                                          ? "#990000"
                                          : ingredient.amount <=
                                            ingredient.atLeast
                                          ? "#997a00"
                                          : "black",
                                    }}
                                  >
                                    <div id="a-ingredient-container-col-1">
                                      <div id="ingredient-name">
                                        {ingredient.name}
                                      </div>
                                    </div>

                                    <div id="a-ingredient-container-col-2">
                                      {Number.isInteger(ingredient.amount)
                                        ? ingredient.amount
                                        : ingredient.amount.toFixed(2)}
                                    </div>

                                    <div id="a-ingredient-container-col-3">
                                      {ingredient.unit}
                                    </div>

                                    <div
                                      id="a-ingredient-container-col-4"
                                      style={{
                                        color:
                                          ingredient.amount === 0
                                            ? "#990000"
                                            : ingredient.amount <=
                                              ingredient.atLeast
                                            ? "#997a00"
                                            : "black",

                                        fontWeight:
                                          ingredient.amount === 0
                                            ? "bold"
                                            : ingredient.amount <=
                                              ingredient.atLeast
                                            ? "bold"
                                            : "normal",
                                      }}
                                    >
                                      {ingredient.amount === 0
                                        ? "หมด"
                                        : ingredient.amount <=
                                          ingredient.atLeast
                                        ? "ใกล้หมด"
                                        : ""}
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

              <div id="less-than-least-zone">
                <div id="less-than-least-table">
                  <div id="out-of-stock-zone">
                    <div id="out-of-stock-table">
                      <div id="out-of-stock-table-header">
                        <div id="out-of-stock-table-header-txt">
                          วัตถุหมดสต็อก
                        </div>
                        <div id="out-of-stock-table-header-count">
                          <div>{outOfStockIngredientList.length}</div>
                        </div>
                      </div>

                      <div id="out-of-stock-zone-table-zone">
                        <div id="out-of-stock-zone-table-content">
                          {outOfStockIngredientList.length > 0 &&
                            outOfStockIngredientList.map(
                              (ingredient, index) =>
                                ingredient && ( // Check if staff is not null
                                  <div
                                    id="ingredient-block"
                                    key={ingredient._id}
                                    style={{
                                      borderBottom:
                                        index ===
                                          outOfStockIngredientList.length - 1 &&
                                        outOfStockIngredientList.length > 4
                                          ? "none"
                                          : "0.1vw solid rgba(0, 0, 0, 0.2)",
                                    }}
                                  >
                                    {
                                      <div
                                        id="a-ingredient-container"
                                        style={{
                                          color:
                                            ingredient.amount === 0
                                              ? "#990000"
                                              : ingredient.amount <=
                                                ingredient.atLeast
                                              ? "#997a00"
                                              : "black",
                                        }}
                                      >
                                        <div id="a-ingredient-container-col-1">
                                          <div id="ingredient-name">
                                            {ingredient.name}
                                          </div>
                                        </div>

                                        <div id="a-ingredient-container-col-2">
                                          {Number.isInteger(ingredient.amount)
                                            ? ingredient.amount
                                            : ingredient.amount.toFixed(2)}
                                        </div>

                                        <div id="a-ingredient-container-col-3">
                                          {ingredient.unit}
                                        </div>

                                        <div
                                          id="a-ingredient-container-col-4"
                                          style={{
                                            color:
                                              ingredient.amount === 0
                                                ? "#990000"
                                                : ingredient.amount <=
                                                  ingredient.atLeast
                                                ? "#997a00"
                                                : "black",

                                            fontWeight:
                                              ingredient.amount === 0
                                                ? "bold"
                                                : ingredient.amount <=
                                                  ingredient.atLeast
                                                ? "bold"
                                                : "normal",
                                          }}
                                        >
                                          {ingredient.amount === 0
                                            ? "หมด"
                                            : ingredient.amount <=
                                              ingredient.atLeast
                                            ? "ใกล้หมด"
                                            : ""}
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
                  <div id="minQ-zone">
                    <div id="minQ-table">
                      <div id="minQ-table-header">
                        <div id="minQ-table-header-txt">วัตถุดิบเหลือน้อย</div>
                        <div id="minQ-table-header-count">
                          <div>{nearlyOutIngredientList.length}</div>
                        </div>
                      </div>
                      <div id="minQ-zone-table-zone">
                        <div id="minQ-zone-table-content">
                          {nearlyOutIngredientList.length > 0 &&
                            nearlyOutIngredientList.map(
                              (ingredient, index) =>
                                ingredient && ( // Check if staff is not null
                                  <div
                                    id="ingredient-block"
                                    key={ingredient._id}
                                    style={{
                                      color:
                                        ingredient.amount === 0
                                          ? "#990000"
                                          : ingredient.amount <=
                                            ingredient.atLeast
                                          ? "#997a00"
                                          : "black",

                                      borderBottom:
                                        index ===
                                          nearlyOutIngredientList.length - 1 &&
                                        nearlyOutIngredientList.length > 4
                                          ? "none"
                                          : "0.1vw solid rgba(0, 0, 0, 0.2)",
                                    }}
                                  >
                                    {
                                      <div
                                        id="a-ingredient-container"
                                        style={{
                                          color:
                                            ingredient.amount === 0
                                              ? "#990000"
                                              : ingredient.amount <=
                                                ingredient.atLeast
                                              ? "#997a00"
                                              : "black",
                                        }}
                                      >
                                        <div id="a-ingredient-container-col-1">
                                          <div id="ingredient-name">
                                            {ingredient.name}
                                          </div>
                                        </div>

                                        <div id="a-ingredient-container-col-2">
                                          {Number.isInteger(ingredient.amount)
                                            ? ingredient.amount
                                            : ingredient.amount.toFixed(2)}
                                        </div>

                                        <div id="a-ingredient-container-col-3">
                                          {ingredient.unit}
                                        </div>

                                        <div
                                          id="a-ingredient-container-col-4"
                                          style={{
                                            color:
                                              ingredient.amount === 0
                                                ? "#990000"
                                                : ingredient.amount <=
                                                  ingredient.atLeast
                                                ? "#997a00"
                                                : "black",

                                            fontWeight:
                                              ingredient.amount === 0
                                                ? "bold"
                                                : ingredient.amount <=
                                                  ingredient.atLeast
                                                ? "bold"
                                                : "normal",
                                          }}
                                        >
                                          {ingredient.amount === 0
                                            ? "หมด"
                                            : ingredient.amount <=
                                              ingredient.atLeast
                                            ? "ใกล้หมด"
                                            : ""}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantMainPage;
