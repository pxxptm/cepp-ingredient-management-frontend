import axios from 'axios';
import React from 'react'
import "./DeleteStaffConfirmModal"

function DeleteStaffConfirmModal({
    setDeleteStaffConfirmModalOpen,
    staffId,
    staffUsername,
  }) {
    const accessToken = localStorage.getItem("token");

    console.log(staffId)
  
    function refreshPage() {
      window.location.reload();
    }
  
    async function handleSubmit() {
      // delete staff
      await axios
        .delete(`http://localhost:3001/user/delete-by-owner/${staffId}`, {
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
                setDeleteStaffConfirmModalOpen(false);
              }}
            >
              x
            </button>
          </div>
  
          <div id="confirm-txt-1">
            แน่ใจใช่ไหมว่าต้องการลบ<span>{staffUsername}</span>
          </div>
  
          <div className="menu-del-body">
            <div id="menu-del-span-zone" className="d-flex">
              <button
                id="menu-del-cancel"
                onClick={() => setDeleteStaffConfirmModalOpen(false)}
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

export default DeleteStaffConfirmModal