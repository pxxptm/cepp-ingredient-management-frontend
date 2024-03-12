import React from "react";
import "./CompleteOrderModal.css";
import { useNavigate } from "react-router-dom";

function CompleteOrderModal({
  userID,
  username,
  restaurantId,
  setCompleteOrderModalOpen,
}) {
  const navigate = useNavigate();
  const urlOrderInPage = `/${username}/${restaurantId}/order-in`;
  const LatestOrder = "LatestOrder" + restaurantId + userID;


  return (
    <div className="complete-order-modalBackground">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div className="complete-order-modalContainer">
        <div className="complete-order-body">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2"
          >
            <circle
              className="path circle"
              fill="none"
              stroke="#00aa88"
              strokeWidth="6"
              strokeMiterlimit="10"
              cx="65.1"
              cy="65.1"
              r="62.1"
            />
            <polyline
              className="path check"
              fill="none"
              stroke="#00aa88"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="100.2,40.2 51.5,88.8 29.8,67.5 "
            />
          </svg>
          <div id="complete-order-txt">ส่งออเดอร์ของคุณสำเร็จแล้ว</div>
          
        </div>
        <div id="complete-order-btn">
            <button
              onClick={() => {
                localStorage.setItem(LatestOrder,JSON.stringify([]));
                setCompleteOrderModalOpen(false)
                navigate(urlOrderInPage, {
                  replace: true,
                });
              }}
            >
              กลับสู่หน้ารับออเดอร์
            </button>
          </div>
      </div>
    </div>
  );
}

export default CompleteOrderModal;
