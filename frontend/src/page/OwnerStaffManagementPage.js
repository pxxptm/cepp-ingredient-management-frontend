import React, { useEffect, useState } from "react";
import "./OwnerStaffManagementPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/OwnerSideNavBar";
import axios from "axios";
import CreateStaffAccountModal from "../component/CreateStaffAccountModal";
import OwnerEditStaffAccountModal from "../component/OwnerEditStaffAccountModal";

function OwnerStaffManagementPage({ username, restaurantId }) {
  const accessToken = localStorage.getItem("token");
  const [staffList, setStaffList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStaffModalOpen, setEditStaffModalOpen] = useState(false);

  let staffListURL = `http://localhost:3001/member/user/${restaurantId}`;
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;

  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();

  const roleDict = {
    manager: "ผู้จัดการ",
    stockcontroller: "พนักงานดูแลคลังวัตถุดิบ",
    employee: "พนักงานทั่วไป",
  };

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

  // get staff of this restaurant
  useEffect(() => {
    axios
      .get(staffListURL, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (JSON.stringify(response.data) !== JSON.stringify(staffList)) {
          setStaffList(response.data);
          console.log(staffList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // Function to handle edit ingredient click event and set props
  const handleEditStaff = (
    staffId,
    staffFName,
    staffLName,
    staffUsername,
    staffRole
  ) => {
    setEditStaffModalOpen(true);
    setEditStaffProps({
      staffId,
      staffFName,
      staffLName,
      staffUsername,
      staffRole,
    });
  };

  // State to hold edit ingredient props
  const [editStaffProps, setEditStaffProps] = useState(null);

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
        {modalOpen && (
          <CreateStaffAccountModal
            setOpenModal={setModalOpen}
            restaurantId={restaurantId}
          />
        )}
        {editStaffModalOpen && editStaffProps && (
          <OwnerEditStaffAccountModal
            setOpenModal={setEditStaffModalOpen}
            staffId={editStaffProps.staffId}
            staffFName={editStaffProps.staffFName}
            staffLName={editStaffProps.staffLName}
            staffUsername={editStaffProps.staffUsername}
            staffRole = {editStaffProps.staffRole}
          />
        )}
        <div id="Staff-management-page-side-bar-menu">
          <UserSideNavBar
            username={username}
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            restaurantImage={restaurantImage}
          />
        </div>

        <div id="Staff-management-page-content">
          <div id="Staff-management-page-content-header">
            <h1>พนักงาน</h1>
            <button
              id="add-staff-acc-btn"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <span>+</span>เพิ่มบัญชีพนักงาน
            </button>
          </div>

          <div id="Staff-management-page-content-table-zone">
            <div id="Staff-management-page-content-table">
              {staffList.length > 0 &&
                staffList.map(
                  (staff, index) =>
                    staff &&
                    index > 0 && ( // Check if staff is not null
                      <div id="staff-block" key={staff.userId}>
                        {
                          <div id="a-staff-container">
                            <div id="a-staff-container-l">
                              <div id="Fname-and-Lname">
                                <div id="Fname">{staff.firstname}</div>
                                <div id="Lname">{staff.lastname}</div>
                              </div>

                              <div id="username-and-role">
                                <div id="username">
                                  <span>username : </span>
                                  {staff.username}
                                </div>
                                <div id="role">
                                  <span>role : </span>
                                  {roleDict[staff.role]}
                                </div>
                              </div>
                            </div>

                            <div id="a-staff-container-r">
                              <div className="a-staff-container-l-btn">
                                <button
                                  id="edit-acc"
                                  onClick={() => {
                                    handleEditStaff(
                                      staff.userId,
                                      staff.firstname,
                                      staff.lastname,
                                      staff.username,
                                      staff.role
                                    );
                                  }}
                                >
                                  แก้ไขข้อมูล
                                </button>
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

export default OwnerStaffManagementPage;
