import axios from "axios";
import React from "react";
import "./DeleteStaffConfirmModal.css";

function DeleteStaffConfirmModal({
  setDeleteStaffConfirmModalOpen,
  staffId,
  staffUsername,
  restaurantId,
}) {
  const accessToken = localStorage.getItem("token");

  function refreshPage() {
    window.location.reload();
  }

  async function handleSubmit() {
    // delete staff
    await axios
      .delete(
        `http://localhost:3001/member/delete-member-by-owner/${restaurantId}/${staffId}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => {
        setDeleteStaffConfirmModalOpen(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="staff-del-modalBackground">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div className="staff-del-modalContainer">
        <div className="staff-del-titleCloseBtn">
          <button
            onClick={() => {
              setDeleteStaffConfirmModalOpen(false);
            }}
          >
            x
          </button>
        </div>

        <div id="confirm-txt-1">
          แน่ใจใช่ไหมว่าต้องการลบ<span>{staffUsername}</span>
        </div>

        <div className="staff-del-body">
          <div id="staff-del-span-zone" className="d-flex">
            <button
              id="staff-del-cancel"
              onClick={() => setDeleteStaffConfirmModalOpen(false)}
            >
              ยกเลิก
            </button>
            <button
              id="staff-del-submit"
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

export default DeleteStaffConfirmModal;
