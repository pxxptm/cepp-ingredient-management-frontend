import axios from "axios";
import React from "react";
import "./DeleteIngredientConfirmModal.css";

function DeleteIngredientConfirmModal({
  setDeleteIngredientConfirmModalOpen,
  ingredientId,
  ingredientName,
}) {
  const accessToken = localStorage.getItem("token");

  function refreshPage() {
    window.location.reload();
  }

  async function handleSubmit() {
    // delete ingredient
    await axios
      .delete(`http://localhost:3001/ingredient/${ingredientId}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setDeleteIngredientConfirmModalOpen(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="ingredient-del-modalBackground">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div className="ingredient-del-modalContainer">
        <div className="ingredient-del-titleCloseBtn">
          <button
            onClick={() => {
                setDeleteIngredientConfirmModalOpen(false);
            }}
          >
            x
          </button>
        </div>

        <div id="confirm-txt-1">
          แน่ใจใช่ไหมว่าต้องการลบ<span>{ingredientName}</span>
        </div>

        <div className="ingredient-del-body">
          <div id="ingredient-del-span-zone" className="d-flex">
            <button
              id="ingredient-del-cancel"
              onClick={() => setDeleteIngredientConfirmModalOpen(false)}
            >
              ยกเลิก
            </button>
            <button
              id="ingredient-del-submit"
              type="submit"
              className="btn-submit"
              onClick={() => {
                handleSubmit()
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

export default DeleteIngredientConfirmModal;
