import React from "react";
import "./UserSideNavBar.css";

function UserSideNavBar(props) {
  let btnMenuOwner = [
    "แดชบอร์ด",
    "วัตถุดิบคงคลัง",
    "พนักงาน",
    "เมนูและส่วนประกอบ",
    "ข้อมูลร้านค้า",
  ];
  const staffManagementURL =
    "http://localhost:3000/:restaurantName/" + props.username + "/staff-management";
    
  return (<div id="user-side-nav-bar">{props.role}</div>)
}

export default UserSideNavBar;
