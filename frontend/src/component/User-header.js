import React from "react";
import './User-header.css'

const UserHeader = () => {
    const nameTest = ["วรชนนท์ ชัยประเสริฐสุด" , "พัชร์ธมน พงศกรพิสิฐ"]
    return (
        <div id="user-name">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <link href='https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin' rel='stylesheet' type='text/css'></link>
            <p id="staff-name">{nameTest[0]}</p>
            <i className="material-icons">person</i>
        </div>
    )
}

export default UserHeader