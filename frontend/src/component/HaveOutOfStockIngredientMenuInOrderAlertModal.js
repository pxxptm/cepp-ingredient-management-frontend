import React from "react";
import "./HaveOutOfStockIngredientMenuInOrderAlertModal.css"

function HaveOutOfStockIngredientMenuInOrderAlertModal({
  setHaveOutOfStockIngredientMenuInOrderAlertModalOpen,
}) {
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
              stroke="#D06079"
              strokeWidth="6"
              strokeMiterlimit="10"
              cx="65.1"
              cy="65.1"
              r="62.1"
            />
            <line
              className="path line"
              fill="none"
              stroke="#D06079"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              x1="34.4"
              y1="37.9"
              x2="95.8"
              y2="92.3"
            />
            <line
              className="path line"
              fill="none"
              stroke="#D06079"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              x1="95.8"
              y1="38"
              x2="34.4"
              y2="92.2"
            />
          </svg>
          <div
            id="complete-order-txt"
            style={{ lineHeight: "200%", color: "rgb(146, 0, 0)" }}
          >
            มีเมนูที่วัตถุดิบหลักหมด <br />{" "}
            กรุณาลบรายการเหล่านั้นจากออเดอร์ของคุณ
          </div>
        </div>
        <div id="have-out-of-stock-order-btn">
          <button 
            onClick={() => {
              setHaveOutOfStockIngredientMenuInOrderAlertModalOpen(false);
            }}
            id="close-modal-btn"
          >
            กลับสู่หน้ารับออเดอร์
          </button>
        </div>
      </div>
    </div>
  );
}
export default HaveOutOfStockIngredientMenuInOrderAlertModal;
