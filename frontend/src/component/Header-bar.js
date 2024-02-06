import React from "react";
import './Header-bar.css';
import Clock from "./Clock";
import UserHeader from "./User-header";

const HearderBar = () => {
    return (
        <div id="header-bar">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <div id="SW-name">Victual Ingredients Management</div>
            <div id="name-clock-logout">
                <div id="column-name-and-clock">
                    <UserHeader></UserHeader>
                    <div id="temp-space"></div>
                    <Clock></Clock>
                </div>
                <button style={{background:"None",border:"None"}}><i className="material-icons" id="logout-button">logout</i></button>        
            </div>
        </div>
    )
}

export default HearderBar