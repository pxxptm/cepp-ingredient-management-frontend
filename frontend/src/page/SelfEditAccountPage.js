import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SelfEditAccountPage.css";
import RestaurantListHeaderBar from "../component/RestaurantListHeaderBar";

function SelfEditAccountPage({ username }) {
  const urlRestaurantList = "http://localhost:3001/member/restaurant";
  const urlRestaurantListPage = "http://localhost:3000/"+username+"/restaurant"

  const accessToken = localStorage.getItem("token");
  const [restaurantList, setRestaurantList] = useState([]);
  const [FNameStatic, setFNameStatic] = useState("");
  const [LNameStatic, setLNameStatic] = useState("");
  const [usernameStatic, setUsernameStatic] = useState("");
  const [passwordStatic, setPasswordStatic] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [usernameEdit, setUsernameEdit] = useState("");
  const [password, setPassword] = useState("");

  // get restaurant of this user
  useEffect(() => {
    axios
      .get(urlRestaurantList, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        if (JSON.stringify(response.data) !== JSON.stringify(restaurantList)) {
          setRestaurantList(response.data);
          console.log("Updated data:", restaurantList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // get detail of this user

  useEffect(() => {
    axios
      .get("http://localhost:3001/user", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        const thisUser = response.data.filter(
          (user) => user.username === username
        );
        setFNameStatic(thisUser[0].firstname);
        setLNameStatic(thisUser[0].lastname);
        setPasswordStatic(thisUser[0].password);
        setUsernameStatic(thisUser[0].username);
        setFName(thisUser[0].firstname);
        setLName(thisUser[0].lastname);
        setPassword(thisUser[0].password);
        setUsernameEdit(thisUser[0].username);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const uslPathUserAccount = "http://localhost:3001/user/updated-by-user/";
    // patch change
    await axios
      .patch(
        uslPathUserAccount,
        {
          username: usernameEdit,
          firstname: FName,
          lastname: LName,
          password: password,
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div id="Self-edit-account-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="Self-edit-account-page-header-bar">
        <RestaurantListHeaderBar username={username} />
      </div>

      <div id="Self-edit-account-page-body">
        <div id="Self-edit-account-page-body-l1">
          <div id="Self-edit-account-page-header">
            <div id="Self-edit-account-page-head-zone">
              <h1>ข้อมูลบัญชีของคุณ</h1>
              <div id="Self-edit-account-page-head-zone-btn">
                {!editMode && (
                  <button
                    id="edit-acc-btn"
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    แก้ไขข้อมูล
                  </button>
                )}

                {editMode && (
                  <button
                    id="cancel-edit-acc-btn"
                    onClick={() => {
                      setEditMode(false);
                      setFName(FNameStatic);
                      setLName(LNameStatic);
                      setPassword(passwordStatic);
                      setUsernameEdit(usernameStatic);
                    }}
                  >
                    ยกเลิกการแก้ไข
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="Self-edit-account-Container">
            <div className="Self-edit-account-body">
              <form onSubmit={handleSubmit}>
                <div id="Self-edit-account-form">
                  <div id="Self-edit-account">
                    <div className="Self-edit-account-form-floating">
                      <div className="Self-edit-account-input-form">
                        <label>Name (ชื่อ) *</label>
                        <input
                          className="Self-edit-account-form-input-space"
                          type="text"
                          placeholder="Name (ชื่อ)"
                          name="Fname"
                          aria-invalid="false"
                          autoComplete="None"
                          onChange={(e) => {
                            setFName(e.target.value);
                          }}
                          value={FName}
                          readOnly={!editMode}
                        />
                      </div>
                    </div>

                    <div className="Self-edit-account-form-floating">
                      <div className="Self-edit-account-input-form">
                        <label>Lastname (นามสกุล) *</label>
                        <input
                          className="Self-edit-account-form-input-space"
                          type="text"
                          placeholder="Lastname (นามสกุล)"
                          name="Lname"
                          aria-invalid="false"
                          autoComplete="None"
                          onChange={(e) => {
                            setLName(e.target.value);
                          }}
                          value={LName}
                          readOnly={!editMode}
                        />
                      </div>
                    </div>

                    <div className="Self-edit-account-form-floating">
                      <div className="Self-edit-account-input-form">
                        <label>Username (ชื่อบัญชีผู้ใช้) *</label>
                        <input
                          className="Self-edit-account-form-input-space"
                          type="text"
                          placeholder="Username (ชื่อบัญชีผู้ใช้)"
                          name="username"
                          aria-invalid="false"
                          autoComplete="None"
                          onChange={(e) => {
                            setUsernameEdit(e.target.value);
                          }}
                          value={usernameEdit}
                          readOnly={!editMode}
                        />
                      </div>
                    </div>

                    <div className="Self-edit-account-form-floating">
                      <div className="Self-edit-account-input-form">
                        <label>Password (รหัสผ่าน) *</label>
                        <input
                          className="Self-edit-account-form-input-space"
                          type="password"
                          placeholder="Password (รหัสผ่าน)"
                          name="password"
                          aria-invalid="false"
                          autoComplete="None"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          value=""
                          readOnly={!editMode}
                        />
                      </div>
                    </div>

                    {editMode && (
                      <div id="Self-edit-account-span-zone" className="d-flex">
                        <button
                          id="Self-edit-account-submit"
                          type="submit"
                          className="btn-submit"
                        >
                          เสร็จสิ้น
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="Self-edit-account-page-body-r2">
        <div id="Self-edit-account-page-header">
            <div id="Self-edit-account-page-head-zone">
              <h5>ร้านที่คุณเป็นสมาชิก</h5>
              <h6>* หากต้องการจัดการการร้านที่คุณเป็นสมาชิก กรุณาไปที่ <a href={urlRestaurantListPage}>ร้านทั้งหมดของคุณ</a></h6>
            </div>

            <div id="rest-list-space-zone">
            <div id="rest-list-space">

</div>
            </div>
          </div>
        </div>
        <div id="rest-list-cards">
          <div id="rest-list-cards-table">{restaurantList.length > 0}</div>
        </div>
      </div>
    </div>
  );
}

export default SelfEditAccountPage;
