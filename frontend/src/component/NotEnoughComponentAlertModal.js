import React from "react";
import "./NotEnoughComponentAlertModal.css";

function NotEnoughComponentAlertModal({
  menuName,
  menuId,
  restaurantId,
  setAlertNotEnoughModal,
}) {
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
            <div id="not-enough-ingredient-list"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotEnoughComponentAlertModal;
