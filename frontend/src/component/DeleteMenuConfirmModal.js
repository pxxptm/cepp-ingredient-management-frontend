import axios from "axios";
import React from "react";
import "./DeleteMenuConfirmModal.css";

function DeleteMenuConfirmModal({
  setDeleteMenuConfirmModalOpen,
  menuId,
  menuName,
}) {
  const accessToken = localStorage.getItem("token");

  function refreshPage() {
    window.location.reload();
  }

  async function handleSubmit() {
    // delete ingredient
    await axios
      .delete(`http://localhost:3001/menu/${menuId}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          refreshPage();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="menu-del-modalBackground">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div className="menu-del-modalContainer">
        <div className="menu-del-titleCloseBtn">
          <button
            onClick={() => {
              setDeleteMenuConfirmModalOpen(false);
            }}
          >
            x
          </button>
        </div>

        <div id="confirm-txt-1">
          แน่ใจใช่ไหมว่าต้องการลบ<span>{menuName}</span>
        </div>

        <div className="menu-del-body">
          <div id="menu-del-span-zone" className="d-flex">
            <button
              id="menu-del-cancel"
              onClick={() => setDeleteMenuConfirmModalOpen(false)}
            >
              ยกเลิก
            </button>
            <button
              id="menu-del-submit"
              type="submit"
              className="btn-submit"
              onClick={() => {
                handleSubmit();
              }}
            >
              เสร็จสิ้น
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteMenuConfirmModal;
