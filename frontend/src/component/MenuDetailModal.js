import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MenuDetailModal.css";

function MenuDetailModal({ menuId, setEditMenuModalOpen }) {
  console.log(menuId);
  const accessToken = localStorage.getItem("token");
  const urlGetMenuDetail = `http://localhost:3001/menu/${menuId}`;
  const [menuImg, setMenuImg] = useState("");

  useEffect(() => {
    axios
      .get(urlGetMenuDetail, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMenuImg(response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="edit-menu-modalBackground">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div className="edit-menu-modalContainer">
        <div className="edit-menu-titleCloseBtn">
          <button
            onClick={() => {
              setEditMenuModalOpen(false);
            }}
          >
            x
          </button>
        </div>

        <div className="edit-menu-body">
          <div
            id="menu-pic"
            style={{
              backgroundImage: `url(${menuImg})`,
              backgroundSize: "Cover",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MenuDetailModal;
