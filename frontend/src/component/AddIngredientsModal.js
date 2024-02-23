import React, { useState } from "react";
import "./AddIngredientsModal.css";
import axios from "axios";

function AddIngredientsModal({ restaurantId, setModalOpen }) {
  const accessToken = localStorage.getItem("token");
  function refreshPage() {
    window.location.reload();
  }

  const [ingredientName, setIngredientName] = useState();
  const [unit, setUnit] = useState();
  const [minQuantity, setMinQuantity] = useState();
  const [amountQuantity, setAmountQuantity] = useState();

  //update for axios post
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(typeof amountQuantity); // Outputs: "number"
    await axios
      .post(
        "http://localhost:3001/ingredient",
        {
          name: ingredientName,
          amount: parseInt(amountQuantity, 10),
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
        if (res.status === 201) {
          setModalOpen(false);
          refreshPage();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="add-ingredient-modalBackground">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div className="add-ingredient-modalContainer">
        <div className="add-ingredient-titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            x
          </button>
        </div>

        <div className="add-ingredient-body">
          <form onSubmit={handleSubmit}>
            <div className="add-ingredient-form-floating">
              <div className="add-ingredient-input-form">
                <label>ชื่อวัตถุดิบ *</label>
                <input
                  className="add-ingredient-form-input-space"
                  type="text"
                  placeholder="ingredient (ชื่อวัตถุดิบ)"
                  name="ingredient"
                  aria-invalid="false"
                  autoComplete="None"
                  onChange={(e) => {
                    setIngredientName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="add-ingredient-form-floating">
              <div className="add-ingredient-input-form">
                <label>หน่วย *</label>
                <input
                  className="add-ingredient-form-input-space"
                  type="text"
                  placeholder="unit (หน่วย)"
                  name="unit"
                  aria-invalid="false"
                  autoComplete="None"
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="add-ingredient-form-floating-half">
              <div className="add-ingredient-input-form">
                <label>ปริมาณเริ่มต้น *</label>
                <input
                  className="add-ingredient-form-input-space"
                  type="number"
                  placeholder="amount quantity (ปริมาณเริ่มต้น)"
                  name="amount-quantity"
                  aria-invalid="false"
                  autoComplete="None"
                  min="0"
                  onChange={(e) => {
                    setAmountQuantity(e.target.value);
                  }}
                />
              </div>
              <div className="add-ingredient-input-form">
                <label>ปริมาณขั้นต่ำ *</label>
                <input
                  className="add-ingredient-form-input-space"
                  type="number"
                  placeholder="minimum quantity (ปริมาณขั้นต่ำ)"
                  name="minimum-quantity"
                  aria-invalid="false"
                  autoComplete="None"
                  min="0"
                  onChange={(e) => {
                    setMinQuantity(e.target.value);
                  }}
                />
                <p>เมื่อวัตถุดิบเหลือตามขั้นต่ำจะมีการแจ้งเตือน</p>
              </div>
            </div>

            <div id="add-ingredient-span-zone" className="d-flex">
              <button
                id="add-ingredient-cancel"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                ยกเลิก
              </button>

              <button
                id="add-ingredient-submit"
                type="submit"
                className="btn-submit"
              >
                เพิ่มวัตถุดิบ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddIngredientsModal;
