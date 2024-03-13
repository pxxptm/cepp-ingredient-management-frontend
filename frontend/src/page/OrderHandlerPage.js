import React, { useEffect, useState } from "react";
import "./OrderHandlerPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/UserSideNavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotEnoughComponentAlertModal from "../component/NotEnoughComponentAlertModal";
import HaveOutOfStockIngredientMenuInOrderAlertModal from "../component/HaveOutOfStockIngredientMenuInOrderAlertModal";
import DeleteAllOrderMadal from "../component/DeleteAllOrderMadal";

function OrderHandlerPage({ username, restaurantId }) {
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;
  const accessToken = localStorage.getItem("token");
  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();
  const [menuList, setMenuList] = useState([]);
  const [latestOrder, setLatestOrder] = useState([]);
  const [alertNotEnoughModal, setAlertNotEnoughModal] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedMenuName, setSelectedMenuName] = useState(null);
  const [userID, setUseID] = useState("");
  const [deleteAllOrderModalOpen, setDeleteAllOrderModalOpen] = useState(false);
  const LatestOrder = "LatestOrder" + restaurantId + userID;
  const [
    haveOutOfStockIngredientMenuInOrderAlertModalOpen,
    setHaveOutOfStockIngredientMenuInOrderAlertModalOpen,
  ] = useState(false);

  // get ID
  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/user-id-by-username/${username}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setUseID(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      let filteredOrder = latestOrderFromStorage.filter((order) => {
        return menuList.some((menu) => menu._id === order.id);
      });

      setLatestOrder(filteredOrder);
      window.localStorage.setItem(LatestOrder, JSON.stringify(filteredOrder));
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

    if (
      updatedLatestOrder.some((item) => item.id === id && item.amount === 0) &&
      menuList.find((menu) => menu._id === id)?.canCook === -1
    ) {
      // If the order has 0 amount and canCook is -1, remove it from the order list
      const filteredLatestOrder = updatedLatestOrder.filter(
        (item) => !(item.id === id && item.amount === 0)
      );
      setLatestOrder(filteredLatestOrder);
      window.localStorage.setItem(
        LatestOrder,
        JSON.stringify(filteredLatestOrder)
      );
    } else {
      setLatestOrder(updatedLatestOrder.filter((item) => item.amount >= 0));
      window.localStorage.setItem(
        LatestOrder,
        JSON.stringify(updatedLatestOrder.filter((item) => item.amount >= 0))
      );
    }
  };

  const updateQuantity = (id, newAmount) => {
    if (newAmount < 0) {
      // If the new amount is less than 0, remove the order
      const updatedLatestOrder = latestOrder.filter((item) => item.id !== id);
      setLatestOrder(updatedLatestOrder);
      window.localStorage.setItem(
        LatestOrder,
        JSON.stringify(updatedLatestOrder)
      );
    } else {
      // Otherwise, update the quantity of the order
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
    const hasOutOfStockMainIngredients = latestOrder.some((order) => {
      const menuItem = menuList.find((menuItem) => menuItem._id === order.id);
      return menuItem && menuItem.canCook === -1;
    });

    // If any item has canCook === -1, show alert
    if (hasOutOfStockMainIngredients) {
      setHaveOutOfStockIngredientMenuInOrderAlertModalOpen(true);
      return; // Stop further execution
    }

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
            userID={userID}
            menuName={selectedMenuName}
            menuId={selectedMenuId}
            restaurantId={restaurantId}
            setAlertNotEnoughModal={setAlertNotEnoughModal}
          />
        )}

        {haveOutOfStockIngredientMenuInOrderAlertModalOpen && (
          <HaveOutOfStockIngredientMenuInOrderAlertModal
            setHaveOutOfStockIngredientMenuInOrderAlertModalOpen={
              setHaveOutOfStockIngredientMenuInOrderAlertModalOpen
            }
          />
        )}

        {deleteAllOrderModalOpen && (
          <DeleteAllOrderMadal
            restaurantId={restaurantId}
            userID={userID}
            setDeleteAllOrderModalOpen={setDeleteAllOrderModalOpen}
            setLatestOrder={setLatestOrder}
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
          <div>
            <div>รายการออเดอร์</div>
            { latestOrder.length > 0 &&
              (<button
                onClick={() => {
                  setDeleteAllOrderModalOpen(true);
                }}
              >
                ล้างรายการทั้งหมด
              </button>)
            }
          </div>
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
                              {latestOrder.map((item) => {
                                if (
                                  item.id === menu._id &&
                                  menuList.find(
                                    (menuItem) => menuItem._id === item.id
                                  )?.canCook !== -1 &&
                                  item.amount > 0
                                ) {
                                  return (
                                    <div id="amount-shown-box" key={item.id}>
                                      <div>{item.amount}</div>
                                    </div>
                                  );
                                }
                                return null;
                              })}
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
                <div
                  id="a-order-block"
                  key={index}
                  style={{
                    ...(menuList.find((item) => item._id === order.id)
                      ?.canCook === -1
                      ? { backgroundColor: "#ffe6e6" }
                      : {}),
                  }}
                >
                  <div id="a-order-block-menu-name">{order.name}</div>
                  <div id="a-order-block-menu-amount">
                    {order.amount > 0 &&
                    menuList.find(
                      (menu) => menu._id === order.id && menu.canCook !== -1
                    ) ? (
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
                        {menuList.find((item) => item._id === order.id)
                          ?.canCook !== -1 ? (
                          <button
                            className="cancel-remove-button"
                            onClick={() => updateQuantity(order.id, 1)}
                          >
                            ยกเลิก
                          </button>
                        ) : (
                          <button
                            className="cancel-remove-button"
                            style={{
                              backgroundColor: "transparent",
                              color: "#990000",
                              textWrap: "nowrap",
                              width: "fit-content",
                              marginRight: "15%",
                              marginLeft: "-90%",
                              cursor: "default",
                            }}
                          >
                            วัตถุดิบหลักหมด , กรุณาลบรายการนี้ออกจากออเดอร์
                          </button>
                        )}
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
