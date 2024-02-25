import React, { useState } from "react";
import "./OwnerEditStaffAccountModal.css";
import axios from "axios";

function OwnerEditStaffAccountModal({
  setOpenModal,
  staffId,
  staffFName,
  staffLName,
  staffUsername,
  staffRole,
}) {
  const [Fname, setFname] = useState(staffFName);
  const [Lname, setLname] = useState(staffLName);
  const [username, setUsername] = useState(staffUsername);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(staffRole);
  const accessToken = localStorage.getItem("token");

  function refreshPage() {
    window.location.reload();
  }

  //update for axios post

  async function handleSubmit() {
    alert(username + password + Fname + Lname + role);
    await axios
      .patch(
        `http://localhost:3001/user/updated-by-owner/${staffId}`,
        {
          username: username,
          password: password,
          firstname: Fname,
          lastname: Lname,
          role: role,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        alert(res);
        if (res.status === 200) {
          setOpenModal(false);
          refreshPage();
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className="staff-reg-modalBackground">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div className="staff-reg-modalContainer">
        <div className="staff-reg-titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            x
          </button>
        </div>

        <div className="staff-reg-body">
          <form onSubmit={handleSubmit}>
            <div id="staff-reg-form">
              <div className="staff-reg-form-floating">
                <div className="staff-reg-input-form">
                  <i className="material-icons" id="staff-name-icon">
                    badge
                  </i>
                  <input
                    className="staff-reg-form-input-space"
                    id="staff-reg-input-form-name"
                    type="text"
                    placeholder="staff's name (ชื่อพนักงาน)"
                    name="name"
                    aria-invalid="false"
                    autoComplete="None"
                    value={Fname}
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                  />
                  <input
                    className="staff-reg-form-input-space"
                    type="text"
                    placeholder="staff's lastname (นามสกุลพนักงาน)"
                    name="username"
                    aria-invalid="false"
                    autoComplete="None"
                    value={Lname}
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="staff-reg-form-floating">
                <div className="staff-reg-input-form">
                  <i className="material-icons">person</i>
                  <input
                    className="staff-reg-form-input-space"
                    type="text"
                    placeholder="staff's username (ชื่อผู้ใช้ของพนักงาน)"
                    name="username"
                    aria-invalid="false"
                    autoComplete="None"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="staff-reg-form-floating">
                <div className="staff-reg-input-form ">
                  <i className="material-icons">lock</i>
                  <input
                    className="staff-reg-form-input-space"
                    type="password"
                    placeholder="staff's password (รหัสผ่านของพนักงาน)"
                    name="password"
                    aria-invalid="false"
                    autoComplete="None"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="staff-reg-form-floating">
                <div className="staff-reg-input-form ">
                  <i className="material-icons">attribution</i>
                  <select
                    className="Contact-us-form-input-space"
                    name="contact back time"
                    id="appointment-time"
                    value={staffRole}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      id="Contact-us-disable-option"
                    >
                      บทบาทของพนักงาน
                    </option>
                    <option value="manager">ผู้จัดการ</option>
                    <option value="stockcontroller">
                      พนักงานดูแลคลังวัตถุดิบ
                    </option>
                    <option value="employee">พนักงานทั่วไป</option>
                  </select>
                </div>
              </div>
            </div>
            <div id="staff-reg-span-zone" className="d-flex">
              <button
                id="staff-reg-submit"
                type="submit"
                className="btn-submit"
              >
                ยืนยันการแก้ไข
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OwnerEditStaffAccountModal;
