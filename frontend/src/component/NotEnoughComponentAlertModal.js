import React, { useEffect, useState } from "react";
import "./NotEnoughComponentAlertModal.css";
import axios from "axios";

function NotEnoughComponentAlertModal({
  menuName,
  menuId,
  restaurantId,
  setAlertNotEnoughModal,
}) {
  const accessToken = localStorage.getItem("token");
  const urlSortedIngredientList = `http://localhost:3001/ingredient/restaurant-sorted/${restaurantId}`;
  const [sortedIngredientList, setsortedIngredientList] = useState([]);
  const urlMenuComponentList = `http://localhost:3001/component/get-menu/${menuId}`;
  const [menuComponentList, setMenuComponentList] = useState([]);
  const LatestOrder = "LatestOrder" + restaurantId;
  const [latestOrder, setLatestOrder] = useState([]);

  useEffect(() => {
    const latestOrderFromStorage = JSON.parse(
      localStorage.getItem(LatestOrder)
    );
    if (Array.isArray(latestOrderFromStorage)) {
      setLatestOrder(latestOrderFromStorage);
    }
  }, []);

  const addToOrderSummary = (id, name, amount) => {
    const existingItemIndex = latestOrder.findIndex(
      (item) => item.name === name && item.id === id
    );

    if (existingItemIndex !== -1) {
      const updatedLatestOrder = [...latestOrder];
      updatedLatestOrder[existingItemIndex].amount += amount;
      setLatestOrder(updatedLatestOrder);
      window.localStorage.setItem(
        LatestOrder,
        JSON.stringify(updatedLatestOrder)
      );
    } else {
      const updatedOrder = [...latestOrder, { id, name, amount }];
      setLatestOrder(updatedOrder);
      window.localStorage.setItem(LatestOrder, JSON.stringify(updatedOrder));
    }
    setAlertNotEnoughModal(false);
  };

  // Function to fetch component list

  useEffect(() => {
    axios
      .get(urlMenuComponentList, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setMenuComponentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

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

  return (
    <div className="not-enough-modalBackground">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div className="not-enough-modalContainer">
        <div className="not-enough-titleCloseBtn">
          <button
            onClick={() => {
              setAlertNotEnoughModal(false);
            }}
          >
            x
          </button>
        </div>

        <div className="not-enough-body">
          <div id="not-enough-txt-1">แน่ใจใช่ไหมว่าต้องการสั่งเมนู</div>
          <div id="not-enough-txt-2">
            <div>{menuName}</div>
          </div>
          <div id="not-enough-txt-3">
            วัตถุดิบบางส่วนไม่พอที่จะทำเมนูนี้ กรุณาตรวจสอบอีกครั้ง
          </div>

          <div id="not-enough-ingredient-box">
            <div id="not-enough-ingredient-list">
              {menuComponentList.length > 0 &&
                menuComponentList.map((component, index) => {
                  const ingredient = sortedIngredientList.find(
                    (ingredient) => ingredient._id === component.ingredientId
                  );

                  if (
                    ingredient &&
                    component.ingredientAmount > ingredient.amount
                  ) {
                    return (
                      <div key={index} id="componetn-block">
                        {<div>{ingredient.name}</div>}
                      </div>
                    );
                  } else {
                    return null; // Or you can return any other component you want to display when the condition is not met
                  }
                })}
            </div>
          </div>

          <div id="not-enough-footer">
            <button
              id="not-want"
              onClick={() => {
                setAlertNotEnoughModal(false);
              }}
            >
              ไม่ต้องการสั่งเมนูนี้
            </button>
            <button
              id="want"
              onClick={() => {
                addToOrderSummary(menuId, menuName, 1);
                setAlertNotEnoughModal(false);
              }}
            >
              ยืนยันการสั่งเมนูนี้
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotEnoughComponentAlertModal;
