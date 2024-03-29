import React from "react";

function DeleteAllOrderMadal({
  restaurantId,
  userID,
  setDeleteAllOrderModalOpen,
  setLatestOrder,
  setRequireIngredients,
}) {
  const LatestOrder = "LatestOrder" + restaurantId + userID;
  async function handleSubmit() {
    setLatestOrder([]);
    setRequireIngredients([])
    window.localStorage.setItem(LatestOrder, JSON.stringify([]));
    setDeleteAllOrderModalOpen(false);

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
              setDeleteAllOrderModalOpen(false);
            }}
          >
            x
          </button>
        </div>

        <div id="confirm-txt-1">แน่ใจใช่ไหมว่าต้องการลบทุกรายการในออเดอร์</div>

        <div className="ingredient-del-body">
          <div id="ingredient-del-span-zone" className="d-flex">
            <button
              id="ingredient-del-cancel"
              onClick={() => setDeleteAllOrderModalOpen(false)}
            >
              ยกเลิก
            </button>
            <button
              id="ingredient-del-submit"
              type="submit"
              className="btn-submit"
              onClick={() => {
                handleSubmit();
              }}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteAllOrderMadal;
