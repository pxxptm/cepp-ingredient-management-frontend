import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SelfEditAccountPage.css";
import RestaurantListHeaderBar from "../component/RestaurantListHeaderBar";
import { useNavigate } from "react-router-dom";

function SelfEditAccountPage({ username }) {
  const urlRestaurantList = "http://localhost:3001/member/restaurant";
  const urlRestaurantListPage =
    "http://localhost:3000/" + username + "/restaurant";
  const urlGetUserID =
    "http://localhost:3001/user/user-id-by-username/" + username;

  const accessToken = localStorage.getItem("token");
  const [restaurantList, setRestaurantList] = useState([]);
  const [FNameStatic, setFNameStatic] = useState("");
  const [LNameStatic, setLNameStatic] = useState("");
  const [usernameStatic, setUsernameStatic] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [userID, setUserID] = useState("");

  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [usernameEdit, setUsernameEdit] = useState("");
  const [password, setPassword] = useState("");
  const [isOwner , setIsOwner] = useState(false)

  const navigate = useNavigate();

  // get detail of this user
  useEffect(() => {
    axios
      .get("http://localhost:3001/user/user-info", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        const user = response.data;
        setFNameStatic(user.firstname);
        setLNameStatic(user.lastname);
        setUsernameStatic(user.username);
        setFName(user.firstname);
        setLName(user.lastname);
        setUsernameEdit(user.username);
        setIsOwner(user.role==="owner")
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // get ID
  useEffect(() => {
    axios
      .get(urlGetUserID, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUserID(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  async function handleSubmit(event) {
    // patch change
    await axios
      .patch(
        `http://localhost:3001/user/updated-by-user/${userID}`,
        {
          username: usernameEdit,
          password: password,
          firstname: FName,
          lastname: LName,
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
          var currentUrl = window.location.href;
          var url = currentUrl.replace(username, usernameEdit);
          window.location.href = url;
          navigate(url, { replace: true });
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
                          readOnly={!editMode || !isOwner}
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
                          readOnly={!editMode || !isOwner}
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
                          value={password}
                          readOnly={!editMode}
                        />
                      </div>
                    </div>
                    <div id="Self-edit-account-span-zone" className="d-flex">
                      {editMode && (
                        <button
                          id="Self-edit-account-submit"
                          type="submit"
                          className="btn-submit"
                        >
                          เสร็จสิ้น
                        </button>
                      )}
                    </div>
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
              <h6>
                * หากต้องการจัดการร้านที่คุณเป็นสมาชิก กรุณาไปที่{" "}
                <a href={urlRestaurantListPage}>ร้านทั้งหมดของคุณ</a>
              </h6>
            </div>

            <div id="rest-list-space-zone">
              <div id="rest-list-space">
                {restaurantList.length > 0 &&
                  restaurantList.map(
                    (restaurant, index) =>
                      restaurant && (
                        <div id="a-rest-block">
                          <div id="rest-name-and-descript">
                            <div
                              id="rest-name"
                              onClick={() =>
                                navigate(
                                  `/${usernameStatic}/${restaurant._id}/info`
                                )
                              }
                            >
                              {restaurant.name}
                            </div>
                            <div id="rest-descript">
                              {restaurant.description}
                            </div>
                          </div>
                          <div id="to-full-rest-detail-page-btn">
                            <a
                              href={`http://localhost:3000/${usernameStatic}/${restaurant._id}/info`}
                            >
                              ดูข้อมูลร้าน
                            </a>
                          </div>
                        </div>
                      )
                  )}
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
