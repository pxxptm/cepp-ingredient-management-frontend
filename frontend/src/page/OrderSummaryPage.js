import React, { useEffect, useState } from "react";
import "./OrderSummaryPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/UserSideNavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CompleteOrderModal from "../component/CompleteOrderModal";

function OrderSummaryPage({ username, restaurantId }) {
  const navigate = useNavigate();
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;
  const urlOrderHandlerPage = `/${username}/${restaurantId}/order-in`;
  const accessToken = localStorage.getItem("token");
  const [latestOrder, setLatestOrder] = useState([]);
  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();
  const [postOrderResponse, setPostOrderResponse] = useState([]);
  const [completeOrderModalOpen, setCompleteOrderModalOpen] = useState(false);
  const [userID, setUseID] = useState("");
  const LatestOrder = "LatestOrder" + restaurantId + userID;

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
        //console.log(LatestOrder);
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
    const intervalId = setInterval(() => {
      const latestOrderFromStorage = JSON.parse(
        localStorage.getItem(LatestOrder)
      );
      setLatestOrder(latestOrderFromStorage || []);
    });
  
    return () => clearInterval(intervalId);
  }, [latestOrder]); // Include latestOrder in the dependency array

  const increaseQuantity = (id) => {
    const updatedOrderSummary = latestOrder.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    );
    setLatestOrder(updatedOrderSummary);
    updateLocalStorage(updatedOrderSummary);
  };

  const decreaseQuantity = (id) => {
    const updatedLatestOrder = latestOrder.map((item) =>
      item.id === id && item.amount > 0
        ? { ...item, amount: item.amount - 1 }
        : item
    );
     
    setLatestOrder(updatedLatestOrder);
    updateLocalStorage(updatedLatestOrder);
  };

  const updateQuantity = (id, newAmount) => {
    if (newAmount <0) {
      // If the new amount is 0 or less, remove the item from latestOrder
      setLatestOrder(prevLatestOrder =>
        prevLatestOrder.filter(item => item.id !== id)
      );
      // Remove the item from local storage as well
      const updatedLatestOrder = latestOrder.filter(item => item.id !== id);
      window.localStorage.setItem(LatestOrder, JSON.stringify(updatedLatestOrder));
    } else {
      // Otherwise, update the quantity of the item
      const updatedLatestOrder = latestOrder.map(item =>
        item.id === id ? { ...item, amount: newAmount } : item
      );
      setLatestOrder(updatedLatestOrder);
      window.localStorage.setItem(LatestOrder, JSON.stringify(updatedLatestOrder));
    }
  };

  const updateLocalStorage = (updatedOrder) => {
    window.localStorage.setItem(LatestOrder, JSON.stringify(updatedOrder));
  };

  //update for axios post
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/order/restaurant/${restaurantId}`,
        latestOrder,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      setCompleteOrderModalOpen(true);
      setPostOrderResponse(response.data);
      console.log(response.data)
           setLatestOrder([]);
      // Navigate to some success page or handle the response
    } catch (error) {
      console.log("Error:", error);
      // Handle error
    }
  };

  return (
    <div id="order-summary-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="order-summary-page-header-bar">
        <UserHeaderBar username={username} restaurantId={restaurantId} />
      </div>

      <div id="order-summary-page-body">
        {completeOrderModalOpen && (
          <CompleteOrderModal
            userID={userID}
            username={username}
            restaurantId={restaurantId}
            setCompleteOrderModalOpen={setCompleteOrderModalOpen}
            postOrderResponse={postOrderResponse}
          />
        )}
        <div id="order-summary-page-side-bar-menu">
          <UserSideNavBar
            username={username}
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            restaurantImage={restaurantImage}
          />
        </div>
        <div id="order-summary-page-content">
          <div id="order-summary-page-content-inner">
            <div id="order-summary-header">
              <div id="order-summary-header-1">รายการออเดอร์ล่าสุด</div>
              <div
                id="order-summary-header-2"
                onClick={() => {
                  navigate(urlOrderHandlerPage, { replace: true });
                }}
              >
                <div>เพิ่มเมนู</div> <span>&gt;</span>
              </div>
            </div>

            <div id="order-summary-table">
              <div id="order-summary-table-zone">
                {latestOrder &&  latestOrder.map((order, index) => (
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
                            onClick={() => {
                              updateQuantity(order.id, -1);
                            }}
                          >
                            ลบเมนู
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="order-summary-footer">
              <button onClick={handleSubmit}>ส่งออเดอร์</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryPage;
