import React, { useEffect, useState } from "react";
import "./StaffManagementPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/UserSideNavBar";
import axios from "axios";
import CreateStaffAccountModal from "../component/CreateStaffAccountModal";
import OwnerEditStaffAccountModal from "../component/OwnerEditStaffAccountModal";
import DeleteStaffConfirmModal from "../component/DeleteStaffConfirmModal";

function OwnerStaffManagementPage({ username, restaurantId }) {
  const accessToken = localStorage.getItem("token");
  const [staffList, setStaffList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStaffModalOpen, setEditStaffModalOpen] = useState(false);
  const [deleteStaffModalOpen, setDeleteStaffModalOpen] = useState(false);

  let staffListURL = `http://localhost:3001/member/user/${restaurantId}`;
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;

  const [restaurantName, setRestaurantName] = useState();
  const [restaurantImage, setRestaurantImage] = useState();

  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [sortCriteriaTerm, setSortCriteriaTerm] = useState(0);

  const roleDict = {
    manager: "ผู้จัดการ",
    stockcontroller: "พนักงานดูแลคลังวัตถุดิบ",
    employee: "พนักงานทั่วไป",
  };

  const rolePriority = {
    manager: "1",
    stockcontroller: "2",
    employee: "3",
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
        let staffs = response.data;
        if (sortCriteriaTerm === 0) {
          setStaffList(staffs);
        } else if (sortCriteriaTerm === 1) {
          const sortedStaffList = [...staffs].sort((a, b) =>
            a.firstname.localeCompare(b.firstname)
          );

          setStaffList(sortedStaffList);
        } else if (sortCriteriaTerm === 2) {
          const sortedStaffList = [...staffs].sort((a, b) =>
            a.lastname.localeCompare(b.lastname)
          );

          setStaffList(sortedStaffList);
        } else if (sortCriteriaTerm === 3) {
          const sortedStaffList = [...staffs].sort((a, b) =>
            a.username.localeCompare(b.username)
          );

          setStaffList(sortedStaffList);
        } else if (sortCriteriaTerm === 4) {
          const sortedStaffList = [...staffs].sort((a, b) =>
            rolePriority[a.role].localeCompare(rolePriority[b.role])
          );

          setStaffList(sortedStaffList);
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

  // State to hold edit staff props
  const [editStaffProps, setEditStaffProps] = useState(null);
  // State to hold edit staff props
  const [deleteStaffProps, setDeleteStaffProps] = useState(null);

  // Function to handle edit ingredient click event and set props
  const handleDeleteStaff = (staffId, staffUsername) => {
    setDeleteStaffModalOpen(true);
    setDeleteStaffProps({
      staffId,
      staffUsername,
    });
  };

  const [menuClassName, setMenuClassName] = useState("inactive");
  const [menuBtnClassName, setMenuBtnClassName] = useState("sortInactive");

  const toggleMenu = () => {
    setMenuClassName((prevClassName) =>
      prevClassName === "active" ? "inactive" : "active"
    );
    setMenuBtnClassName((prevClassName) =>
      prevClassName === "sortActive" ? "sortInactive" : "sortActive"
    );
  };

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
        <UserHeaderBar username={username} restaurantId={restaurantId} />
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
            staffRole={editStaffProps.staffRole}
          />
        )}
        {deleteStaffProps && deleteStaffModalOpen && (
          <DeleteStaffConfirmModal
            setDeleteStaffConfirmModalOpen={setDeleteStaffModalOpen}
            staffId={deleteStaffProps.staffId}
            staffUsername={deleteStaffProps.staffUsername}
            restaurantId={restaurantId}
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

            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อ นามสกุล ชื่อบัญชีผู้ใช้ หรือ บทบาทของพนักงาน"
              id="staff-search-space"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />

            <button
              id="add-staff-acc-btn"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <span>+</span>เพิ่มบัญชีพนักงาน
            </button>

            <div id="role-filter-zone">
              <button
                className={menuBtnClassName}
                id="role-filter"
                onClick={toggleMenu}
              >
                <i className="material-icons" id="staff-name-icon">
                  settings
                </i>
                การเรียงลำดับ
              </button>
              <ul className={menuClassName}>
              <li>
                  <a
                    href="#"
                    onClick={() => {
                      setSortCriteriaTerm(0);
                      setMenuBtnClassName("sortInactive");
                      setMenuClassName("inactive");
                    }}
                  >
                    <div>{sortCriteriaTerm === 0 && "⬤"}</div> วันสร้างบัญชี
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      if (sortCriteriaTerm === 1) {
                        setSortCriteriaTerm(0);
                      } else {
                        setSortCriteriaTerm(1);
                      }
                      setMenuBtnClassName("sortInactive");
                      setMenuClassName("inactive");
                    }}
                  >
                    <div>{sortCriteriaTerm === 1 && "⬤"}</div> ชื่อ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      if (sortCriteriaTerm === 2) {
                        setSortCriteriaTerm(0);
                      } else {
                        setSortCriteriaTerm(2);
                      }
                      setMenuBtnClassName("sortInactive");
                      setMenuClassName("inactive");
                    }}
                  >
                    <div>{sortCriteriaTerm === 2 && "⬤"}</div> นามสกุล
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      if (sortCriteriaTerm === 3) {
                        setSortCriteriaTerm(0);
                      } else {
                        setSortCriteriaTerm(3);
                      }
                      setMenuBtnClassName("sortInactive");
                      setMenuClassName("inactive");
                    }}
                  >
                    <div>{sortCriteriaTerm === 3 && "⬤"}</div> ชื่อบัญชีผู้ใช้
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      if (sortCriteriaTerm === 4) {
                        setSortCriteriaTerm(0);
                      } else {
                        setSortCriteriaTerm(4);
                      }
                      setMenuBtnClassName("sortInactive");
                      setMenuClassName("inactive");
                    }}
                  >
                    <div>{sortCriteriaTerm === 4 && "⬤"}</div> บทบาท
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div id="Staff-management-page-content-table-zone">
            <div id="Staff-management-page-content-table">
              {staffList.filter(
                (staff) =>
                  staff &&
                  (staff.firstname
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                    staff.lastname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    staff.username
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    (roleDict[staff.role] &&
                      roleDict[staff.role]
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())))
              ).length !== 0 &&
                staffList.length > 0 &&
                staffList.map(
                  (staff, index) =>
                    staff &&
                    (staff.firstname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                      staff.lastname
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      staff.username
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      (roleDict[staff.role] &&
                        roleDict[staff.role]
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()))) &&
                    staff.role !== "owner" && ( // Check if staff is not null
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
                                <button
                                  id="delete-acc"
                                  onClick={() => {
                                    handleDeleteStaff(
                                      staff.userId,
                                      staff.username
                                    );
                                  }}
                                >
                                  ลบบัญชี
                                </button>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    )
                )}

              {staffList.length > 0 &&
                staffList.filter(
                  (staff) =>
                    staff.firstname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    staff.lastname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    staff.username
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    (roleDict[staff.role] &&
                      roleDict[staff.role]
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
                ).length === 0 && (
                  <div id="no-search-results">
                    <p>
                      ไม่พบรายชื่อพนักงานที่คุณต้องการค้นหาในรายชื่อพนักงานของคุณ
                      .
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerStaffManagementPage;
