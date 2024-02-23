import React, { useEffect, useState } from "react";
import "./OwnerInventoryPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/OwnerSideNavBar";
import AddingredientsModal from "../component/AddIngredientsModal"
import axios from "axios";

export default function OwnerInventoryPage({ username, restaurantId }) {
  const accessToken = localStorage.getItem("token");
  const [modalOpen, setModalOpen] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;

  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();

  useEffect(() => {
    axios
      .get(urlRestaurantDetail, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        const name = res.data.name;
        const image = res.data.image;
        setRestaurantName(name);
        setRestaurantImage(image);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div id="Owner-inventory-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="Owner-inventory-page-header-bar">
        <UserHeaderBar username={username} />
      </div>

      <div id="Owner-inventory-page-body">
      {modalOpen && (
          <AddingredientsModal
           setModalOpen={setModalOpen}
            restaurantId={restaurantId}
          />
        )}
        <div id="Owner-inventory-page-side-bar-menu">
          <UserSideNavBar
            username={username}
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            restaurantImage={restaurantImage}
          />
        </div>

        <div id="Owner-inventory-page-content">
          <div id="Owner-inventory-page-content-header">
            <h1>สต็อกวัตถุดิบ</h1>
            <div id="add-staff-acc-btn-zone">
                <button
                  id="add-ingredient-btn"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  <span>+</span>เพิ่มวัตถุดิบ
                </button>
              </div>
          </div>

          <div id="Owner-inventory-page-content-table-zone">
            <div id="Owner-inventory-page-content-table">
              {ingredientList.length > 0 &&
                ingredientList.map(
                  (ingredient, index) =>
                    ingredient &&
                    index > 0 && ( // Check if staff is not null
                      <div id="staff-block">
                        {
                          <div id="a-staff-container">
                            <div id="a-staff-container-l">
                              <div id="Fname-and-Lname">
                                <div id="Fname">{ingredient.firstname}</div>
                                <div id="Lname">{ingredient.lastname}</div>
                              </div>

                              <div id="username-and-role">
                                <div id="username">
                                  <span>username : </span>
                                  {ingredient.username}
                                </div>
                                <div id="role">
                                  <span>role : </span>
                                </div>
                              </div>
                            </div>

                            <div id="a-staff-container-r">
                              <div className="a-staff-container-l-btn">
                                <button id="edit-acc">แก้ไขข้อมูล</button>
                              </div>
                              <div className="a-staff-container-l-btn">
                                <button id="delete-acc">ลบบัญชี</button>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
