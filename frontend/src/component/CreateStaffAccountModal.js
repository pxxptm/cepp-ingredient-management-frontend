import React, { useState } from "react";
import "./CreateStaffAccountModal.css";
import axios from "axios";

function CreateStaffAccountModal({ setOpenModal, restaurantId }) {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const accessToken = localStorage.getItem("token");

  const urlCreateStaff = "http://localhost:3001/auth/register/" + restaurantId;

  function refreshPage() {
    window.location.reload();
  }

  //update for axios post

  async function handleSubmit() {
    console.log(username + password + Fname + Lname + role)

    await axios
      .post(
        urlCreateStaff,
        {
          username: username,
          password: password,
          firstname: Fname,
          lastname: Lname,
          role: role,
        },
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            "Content-Type": "application/json"
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setOpenModal(false);
          refreshPage();
        }
      })
      .catch((error) => {
        console.log(error);
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
                เพิ่มบัญชี
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateStaffAccountModal;
