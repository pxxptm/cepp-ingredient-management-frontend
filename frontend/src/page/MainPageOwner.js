import React from "react";

function MainPageOwner({ username }) {
  console.log(username);

  const staffManagementURL =
    "http://localhost:3000/:restaurantName/" + username + "/staff-management";
  return (
    <div>
      MainPageOwner <br /> <br />
      <a>คลังวัตถุดิบ</a>
      <br /> <br />
      <a href={staffManagementURL}>พนักงาน</a>
      <br /> <br />
      <a>เมนูและส่วนประกอบ</a>
      <br /> <br />
    </div>
  );
}

export default MainPageOwner;
