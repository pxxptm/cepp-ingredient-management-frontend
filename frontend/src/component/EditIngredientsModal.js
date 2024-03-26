import axios from "axios";
import "./EditIngredientsModal.css";
import React, { useState } from "react";

function EditIngredientsModal({
  restaurantId,
  setModalOpen,
  nameStatic,
  atLeastStatic,
  unitStatic,
  ingredientId,
  amountStatic,
}) {
  const accessToken = localStorage.getItem("token");
  function refreshPage() {
    window.location.reload();
  }

  const [ingredientName, setIngredientName] = useState(nameStatic);
  const [unit, setUnit] = useState(unitStatic);
  const [minQuantity, setMinQuantity] = useState(atLeastStatic);

  const currentQuantity = amountStatic + " (ปริมาณปัจจุบัน)";

  //update for axios post
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(typeof amountStatic); // Outputs: "number"
    await axios
      .patch(
        `http://localhost:3001/ingredient/${ingredientId}`,
        {
          name: ingredientName,
          amount: parseInt(amountStatic, 10),
          unit: unit,
          atLeast: parseInt(minQuantity, 10),
          restaurantId: restaurantId,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setModalOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="edit-ingredient-modalBackground">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div className="edit-ingredient-modalContainer">
        <div className="edit-ingredient-titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            x
          </button>
        </div>

        <div className="edit-ingredient-body">
          <form onSubmit={handleSubmit}>
            <div className="edit-ingredient-form-floating">
              <div className="edit-ingredient-input-form">
                <label>ชื่อวัตถุดิบ *</label>
                <input
                  className="edit-ingredient-form-input-space"
                  type="text"
                  placeholder="ingredient (ชื่อวัตถุดิบ)"
                  name="ingredient"
                  aria-invalid="false"
                  autoComplete="None"
                  value={ingredientName}
                  onChange={(e) => {
                    setIngredientName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="edit-ingredient-form-floating">
              <div className="edit-ingredient-input-form">
                <label>หน่วย *</label>
                <input
                  className="edit-ingredient-form-input-space"
                  type="text"
                  placeholder="unit (หน่วย)"
                  name="unit"
                  aria-invalid="false"
                  autoComplete="None"
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="edit-ingredient-form-floating-half">
              <div className="edit-ingredient-input-form">
                <label>ปริมาณคงคลัง *</label>
                <input
                  className="edit-ingredient-form-input-space"
                  id="current-quantity-readonly"
                  type="text"
                  placeholder="amount quantity (ปริมาณเริ่มต้น)"
                  name="amount-quantity"
                  aria-invalid="false"
                  autoComplete="None"
                  min="0"
                  value={currentQuantity}
                  readOnly={true}
                />
              </div>
              <div className="edit-ingredient-input-form">
                <label>ปริมาณขั้นต่ำ *</label>
                <input
                  className="edit-ingredient-form-input-space"
                  type="number"
                  placeholder="minimum quantity (ปริมาณขั้นต่ำ)"
                  name="minimum-quantity"
                  aria-invalid="false"
                  autoComplete="None"
                  min="0"
                  value={minQuantity}
                  onChange={(e) => {
                    setMinQuantity(e.target.value);
                  }}
                />
                <p>เมื่อวัตถุดิบเหลือตามขั้นต่ำจะมีการแจ้งเตือน</p>
              </div>
            </div>

            <div id="edit-ingredient-span-zone" className="d-flex">
              <button
                id="edit-ingredient-cancel"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                ยกเลิก
              </button>

              <button
                id="edit-ingredient-submit"
                type="submit"
                className="btn-submit"
              >
                แก้ไขเสร็จสิ้น
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditIngredientsModal;
