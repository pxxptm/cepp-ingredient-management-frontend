import React, { useEffect, useState } from "react";
import "./StaffManagementPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/OwnerSideNavBar";
import axios from "axios";
import CreateStaffAccountModal from "../component/CreateStaffAccountModal";

function StaffManagementPage({ username, restaurantId }) {

  const accessToken = localStorage.getItem("token");
  const [staffList, setStaffList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // get restaurant data : want - id , pic to pass to side-nav -bar
  // axios get restaurant data here.

  let staffListURL = "http://localhost:3001/member/user/" + restaurantId;
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`

  console.log(urlRestaurantDetail)

  const [restaurantName, setRestaurantName] = useState()

  useEffect(() => {
    axios.get(urlRestaurantDetail, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then((res) => {
      const name = res.data.name
      setRestaurantName(name)
    }).catch((err) => {
      console.log(err)
    })
  })

  // get staff of this restaurant
  useEffect(() => {
    axios
      .get(staffListURL, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        console.log(response)
        if (JSON.stringify(response.data) !== JSON.stringify(staffList)) {
          setStaffList(response.data);
          console.log("Updated data:", staffList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div id="Staff-management-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="Staff-management-page-header-bar">
        <UserHeaderBar username={username} />
      </div>

      <div id="Staff-management-page-body">
        {modalOpen && <CreateStaffAccountModal setOpenModal={setModalOpen} />}
        <div id="Staff-management-page-side-bar-menu">
          <UserSideNavBar username={username} restaurantId={restaurantId} restaurantName={restaurantName} />
        </div>

        <div id="Staff-management-page-content">
          <div id="Staff-management-page-content-header">
            <h1>พนักงาน</h1>
            <button id="add-staff-acc-btn"
              onClick={() => {
                setModalOpen(true);
              }}
            ><span>+</span>เพิ่มบัญชีพนักงาน</button>
          </div>


        </div>
      </div>
    </div>
  );
}

export default StaffManagementPage;
