import React, { useEffect, useState } from "react";
import "./OrderHandlerPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/UserSideNavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotEnoughComponentAlertModal from "../component/NotEnoughComponentAlertModal";

function OrderHandlerPage({ username, restaurantId }) {
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;
  const accessToken = localStorage.getItem("token");
  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();
  const [menuList, setMenuList] = useState([]);
  const [latestOrder, setLatestOrder] = useState([]);
  const LatestOrder = "LatestOrder" + restaurantId;
  const [alertNotEnoughModal, setAlertNotEnoughModal] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedMenuName, setSelectedMenuName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get(urlRestaurantDetail, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        const { name, image } = restaurantResponse.data;
        setRestaurantName(name);
        setRestaurantImage(image);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [urlRestaurantDetail, accessToken]);

  useEffect(() => {
    const latestOrderFromStorage = JSON.parse(
      localStorage.getItem(LatestOrder)
    );
    if (Array.isArray(latestOrderFromStorage)) {
      const filteredOrder = latestOrderFromStorage.filter((order) => {
        return !menuList.some(
          (menu) => menu._id === order.id && menu.canCook === -1
        );
      });
      setLatestOrder(filteredOrder);
      window.localStorage.setItem(
        LatestOrder,
        JSON.stringify(filteredOrder)
      );
    }
  }, [menuList]);

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
    }, 1500);

    return () => clearInterval(intervalId);
  }, [restaurantId, accessToken]);

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
  };

  const increaseQuantity = (id) => {
    const updatedLatestOrder = latestOrder.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    );
    setLatestOrder(updatedLatestOrder);
    window.localStorage.setItem(
      LatestOrder,
      JSON.stringify(updatedLatestOrder)
    );
  };
  

  const decreaseQuantity = (id) => {
    const updatedLatestOrder = latestOrder.map((item) =>
      item.id === id && item.amount > 0
        ? { ...item, amount: item.amount - 1 }
        : item
    );
    setLatestOrder(updatedLatestOrder);
    window.localStorage.setItem(
      LatestOrder,
      JSON.stringify(updatedLatestOrder)
    );
  };

  const updateQuantity = (id, newAmount) => {
    if (newAmount < 0) {
      // If the new amount is 0 or less, remove the item from latestOrder
      setLatestOrder((prevLatestOrder) =>
        prevLatestOrder.filter((item) => item.id !== id)
      );
      window.localStorage.setItem(LatestOrder, JSON.stringify(latestOrder));
    } else {
      // Otherwise, update the quantity of the item
      const updatedLatestOrder = latestOrder.map((item) =>
        item.id === id ? { ...item, amount: newAmount } : item
      );
      setLatestOrder(updatedLatestOrder);
      window.localStorage.setItem(
        LatestOrder,
        JSON.stringify(updatedLatestOrder)
      );
    }
  };

  const orderSummaryFiltered = Array.isArray(latestOrder)
    ? latestOrder.filter((order) =>
        menuList.some((menu) => menu._id === order.id)
      )
    : [];

  // Calculate the sum of quantities in the order summary list
  const sumOfQuantities = orderSummaryFiltered.reduce(
    (total, order) => total + order.amount,
    0
  );

  const navigate = useNavigate();

  async function commitOrderHandler() {
    console.log(latestOrder);
    window.localStorage.setItem(LatestOrder, JSON.stringify(latestOrder));
    const urlOrderSummaryPage = `/${username}/${restaurantId}/order-summary`;
    navigate(urlOrderSummaryPage, { replace: false });
  }

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
        <UserHeaderBar username={username} restaurantId={restaurantId} />
      </div>

      <div id="order-handler-page-body">
        {alertNotEnoughModal && (
          <NotEnoughComponentAlertModal
            menuName={selectedMenuName}
            menuId={selectedMenuId}
            restaurantId={restaurantId}
            setAlertNotEnoughModal={setAlertNotEnoughModal}
          />
        )}
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
                          <div
                            id="menu-card"
                            onClick={() => {
                              if (menu.canCook === 1) {
                                addToOrderSummary(menu._id, menu.name, 1);
                              } else if (menu.canCook === 0) {
                                setSelectedMenuId(menu._id);
                                setSelectedMenuName(menu.name);
                                setAlertNotEnoughModal(true);
                              }
                            }}
                            style={{
                              position: "relative",
                            }}
                          >
                            <div
                              id="menu-card-pic"
                              style={{
                                backgroundImage: `url(${menu.image})`,
                                backgroundSize: "Cover",
                              }}
                            >
                              {/* Display the quantity of this menu item in the order summary */}
                              {latestOrder.some(
                                (item) => item.id === menu._id
                              ) &&
                                latestOrder.find((item) => item.id === menu._id)
                                  .amount > 0 && (
                                  <div id="amount-shown-box">
                                    <div>
                                      {
                                        latestOrder.find(
                                          (item) => item.id === menu._id
                                        ).amount
                                      }{" "}
                                    </div>
                                  </div>
                                )}
                            </div>
                            <div id="menu-card-content">
                              <div id="menu-card-name">{menu.name}</div>
                            </div>
                            {menu.canCook === -1 && (
                              <div
                                className="menu-card-overlay"
                                style={{
                                  position: "absolute",
                                  display: "flex",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  backgroundColor: "rgba(0,0,0,0.4)",
                                }}
                              >
                                <div id="mainMenu-out">วัตถุดิบหลักหมด</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>

          <div id="order-summary-zone">
            <div id="order-summary-list-box">
              {latestOrder.map((order, index) => (
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
                          onClick={() => updateQuantity(order.id, -1)}
                        >
                          ลบเมนู
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
              id="commit-order-btn"
              style={{
                display: latestOrder.length === 0 ? "none" : "flex",
              }}
            >
              <button onClick={commitOrderHandler}>สรุปออเดอร์</button>
            </div>
          </div>
        </div>

        <div
        id="commit-order-btn-small-media"
        style={{
          display: latestOrder.length === 0 ? "none" : "flex",
        }}
      >
        <button onClick={commitOrderHandler}>
          <div id="total-quantity">
            <div id="sumOfQuantities">{sumOfQuantities}</div>
            <div id="sumOfQuantities-text">รายการในออเดอร์นี้</div>
          </div>
          <div id="gt">&gt;</div>
        </button>
      </div>
      
      </div>

      
    </div>
  );
}

export default OrderHandlerPage;
