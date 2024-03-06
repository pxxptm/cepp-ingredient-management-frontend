import React, { useEffect, useState } from "react";
import "./OrderHandlerPage.css";
import RestaurantListHeaderBar from "../component/RestaurantListHeaderBar";
import UserSideNavBar from "../component/UserSideNavBar";
import axios from "axios";

function OrderHandlerPage({ username, restaurantId }) {
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;
  const accessToken = localStorage.getItem("token");

  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();
  const [menuList, setMenuList] = useState([]);
  const [orderSummary, setOrderSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get(urlRestaurantDetail, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        const name = restaurantResponse.data.name;
        const image = restaurantResponse.data.image;
        setRestaurantName(name);
        setRestaurantImage(image);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [urlRestaurantDetail, accessToken]);

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const menuResponse = await axios.get(
          `http://localhost:3001/menu/get-valid-menu/${restaurantId}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        setMenuList(menuResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenuList();

    const intervalId = setInterval(() => {
      fetchMenuList();
    }, 2500); // Poll every 2.5 seconds

    return () => clearInterval(intervalId);
  }, [restaurantId, accessToken]);

  const addToOrderSummary = (id, name, amount) => {
    // Check if the menu item already exists in orderSummary
    const existingItemIndex = orderSummary.findIndex(
      (item) => item.name === name && item.id === id
    );

    if (existingItemIndex !== -1) {
      // If the item already exists, update the amount
      const updatedOrderSummary = [...orderSummary];
      updatedOrderSummary[existingItemIndex].amount += amount;
      setOrderSummary(updatedOrderSummary);
    } else {
      // If the item doesn't exist, add it to orderSummary
      setOrderSummary((prevOrderSummary) => [
        ...prevOrderSummary,
        { id, name, amount },
      ]);
    }
  };

  const increaseQuantity = (id) => {
    const updatedOrderSummary = orderSummary.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    );
    setOrderSummary(updatedOrderSummary);
  };

  const decreaseQuantity = (id) => {
    const updatedOrderSummary = orderSummary.map((item) =>
      item.id === id && item.amount > 0
        ? { ...item, amount: item.amount - 1 }
        : item
    );
    setOrderSummary(updatedOrderSummary);
  };

  const updateQuantity = (id, newAmount, status) => {
    if (newAmount <= 0 || !status) {
      // If the quantity is 0 or less, remove the item from the order summary
      setOrderSummary((prevOrderSummary) =>
        prevOrderSummary.filter((item) => item.id !== id)
      );
    } else {
      // Otherwise, update the quantity of the item
      setOrderSummary((prevOrderSummary) =>
        prevOrderSummary.map((item) =>
          item.id === id ? { ...item, amount: newAmount } : item
        )
      );
    }
  };

  const orderSummaryFiltered = orderSummary.filter((order) =>
    menuList.some((menu) => menu._id === order.id)
  );

  useEffect(() => {
    const getOrderSummaryDistribution = () => {
      const distribution = {};

      orderSummary.forEach((order) => {
        const { id, amount } = order;

        if (distribution[id]) {
          distribution[id] += amount;
        } else {
          distribution[id] = amount;
        }
      });

      return distribution;
    };
    setOrderSummaryDistribution(getOrderSummaryDistribution());
  }, [orderSummary]);

  useEffect(() => {
    // Filter out items in orderSummary that are not in menuList
    const filteredOrderSummary = orderSummary.filter((order) =>
      menuList.some((menu) => menu._id === order.id)
    );
    // Update orderSummary with the filtered orderSummary
    setOrderSummary(filteredOrderSummary);
  }, [menuList]);

  // Calculate the sum of quantities in the order summary list
  const sumOfQuantities = orderSummaryFiltered.reduce(
    (total, order) => total + order.amount,
    0
  );

  const [orderSummaryDistribution, setOrderSummaryDistribution] = useState();
  return (
    <div id="order-handler-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="order-handler-page-header-bar">
        <RestaurantListHeaderBar username={username} />
      </div>

      <div id="order-handler-page-body">
        <div id="order-handler-page-side-bar-menu">
          <UserSideNavBar
            username={username}
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            restaurantImage={restaurantImage}
          />
        </div>

        <div id="order-handler-page-content-header">
          <div>รายการออเดอร์</div>
        </div>

        <div id="order-handler-page-content">
          <div id="order-handler-page-content-inner">
            <div id="menu-list-cards">
              <div id="menu-list-cards-table">
                {menuList.length > 0 &&
                  menuList.map(
                    (menu, index) =>
                      menu && ( // Check if restaurant is not null
                        <div id="menu-card-container" key={menu._id}>
                          {
                            <div
                              id="menu-card"
                              onClick={() =>
                                addToOrderSummary(menu._id, menu.name, 1)
                              }
                            >
                              <div
                                id="menu-card-pic"
                                style={{
                                  backgroundImage: `url(${menu.image})`,
                                  backgroundSize: "Cover",
                                }}
                              >
                                {orderSummaryDistribution[menu._id] > 0 && (
                                  <div id="amount-shown-box">
                                    <div>
                                      {orderSummaryDistribution[menu._id]}{" "}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div id="menu-card-content">
                                <div id="menu-card-name">{menu.name}</div>
                              </div>
                            </div>
                          }
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>

          <div id="order-summary-zone">
            <div id="order-summary-list-box">
              {orderSummaryFiltered.map((order, index) => (
                <div id="a-order-block" key={index}>
                  <div id="a-order-block-menu-name">{order.name}</div>
                  <div id="a-order-block-menu-amount">
                    {order.amount > 0 ? (
                      <div id="a-order-block-menu-amount-editor">
                        {/* Increase and Decrease buttons for adjusting quantity */}
                        <button
                          className="value-button"
                          onClick={() => decreaseQuantity(order.id)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={order.amount}
                          onChange={(e) =>
                            updateQuantity(order.id, parseInt(e.target.value))
                          }
                        />
                        <button
                          className="value-button"
                          onClick={() => increaseQuantity(order.id)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <div id="choice-remove-menu-form-order">
                        <button
                          className="cancel-remove-button"
                          onClick={() => updateQuantity(order.id, 1)}
                        >
                          ยกเลิก
                        </button>

                        <button
                          className="remove-button"
                          onClick={() => updateQuantity(order.id, 0)}
                        >
                          ลบเมนู
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div id="commit-order-btn">
              <button>สรุปออเดอร์</button>
            </div>
          </div>
        </div>
      </div>

      <div id="commit-order-btn-small-media">
        <button>
          <div id="total-quantity">
            <div id="sumOfQuantities">{sumOfQuantities}</div>
            <div id="sumOfQuantities-text">รายการในออเดอร์นี้</div>
          </div>
          <div id="gt">&gt;</div>
        </button>
      </div>
    </div>
  );
}

export default OrderHandlerPage;
