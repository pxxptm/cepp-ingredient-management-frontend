import React from "react";
import "./ReachLimitMaodal.css";

function ReachLimitMaodal({ setReachLimitMaodalOpen, menuName, alertState , reachLimitMaxAmount}) {
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
              stroke="rgba(222, 174, 0, 0.984)"
              strokeWidth="6"
              strokeMiterlimit="10"
              cx="65.1"
              cy="65.1"
              r="62.1"
            />
            <line
              className="path line"
              fill="none"
              stroke="rgba(222, 174, 0, 0.984)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              x1="65.1"
              y1="32"
              x2="65.1"
              y2="78"
            />
            <circle
              className="path dot"
              fill="rgba(222, 174, 0, 0.984)"
              cx="65.1"
              cy="95"
              r="6"
              strokeMiterlimit="10"
            />
          </svg>
          <div
            id="complete-order-txt"
            style={{ lineHeight: "200%", color: "#A58800" }}
          >
            {alertState === 1 ? (
              <span>
                คุณทำการเพิ่ม <strong>{menuName}</strong>
                <br /> ถึงจำนวนสูงสุดที่สามารถขายได้แล้ว
              </span>
            ) : alertState === 2 ? (
                <span>
                วัตถุดิบไม่เพียงพอสำหรับ <br />
                <strong>{menuName}</strong>
                <br /> 
              </span>
            ) : (
                <span>
                เมนู <strong>{menuName}</strong>
                <br /> สามารถขายได้สูงสุด {reachLimitMaxAmount} ที่เท่านั้น
              </span>
            )}{" "}
          </div>
        </div>
        <div id="have-out-of-stock-order-btn">
          <button
            onClick={() => {
              setReachLimitMaodalOpen(false);
            }}
            id="close-reach-limit-modal-btn"
            
          >
            กลับสู่หน้ารับออเดอร์
          </button>
        </div>
      </div>
    </div>
  );
}
export default ReachLimitMaodal;
