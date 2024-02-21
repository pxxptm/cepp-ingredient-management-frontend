import axios from "axios";
import React, { useState } from "react";
import "./DeleteRestaurantAuthModal.css";
import { useNavigate } from "react-router-dom";

function DeleteRestaurantAuthModal({
  OwnerUsername,
  restaurantName,
  restaurantId,
  setOpenDeleteModal,
}) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const accessToken = localStorage.getItem("token");
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;

  async function handleSubmit(e) {
    e.preventDefault()
    // delete restaurant
    console.log(restaurantId)
    await axios
      .delete(
        urlRestaurantDetail,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            "Content-Type": "application/json"
          },
          data: {
            password: password,
          }
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const urlRestaurantListPage = "/" + { OwnerUsername } + "/restaurant"
          navigate(urlRestaurantListPage, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="rest-del-modalBackground">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div className="rest-del-modalContainer">
        <div className="rest-del-titleCloseBtn">
          <button
            onClick={() => {
              setOpenDeleteModal(false);
            }}
          >
            x
          </button>
        </div>

        <div id="confirm-txt-1">
          แน่ใจใช่ไหมว่าต้องการลบร้าน<span>{restaurantName}</span>
        </div>
        <div id="confirm-txt-2">กรุณาป้อนรหัสผ่านของคุณเพื่อยืนยัน</div>

        <div className="rest-del-body">
          <form onSubmit={handleSubmit}>
            <div className="rest-del-form-floating">
              <div className="rest-del-input-form">
                <i className="material-icons">lock</i>
                <input
                  className="rest-del-form-input-space"
                  type="password"
                  placeholder="password (รหัสผ่าน)"
                  name="password"
                  aria-invalid="false"
                  autoComplete="None"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div id="rest-del-span-zone" className="d-flex">
              <button
                id="rest-del-cancel"
                onClick={() => setOpenDeleteModal(false)}
              >
                ยกเลิก
              </button>
              <button id="rest-del-submit" type="submit" className="btn-submit">
                เสร็จสิ้น
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteRestaurantAuthModal;
