import React from 'react';
import './UserHeaderBar.css';
import Clock from './Clock';
import UserHeader from './UserHeaderName';

const HearderBar = (props) => {
  const restaurantListPageURL =
    'http://localhost:3000/' + props.username + '/restaurant';
  return (
    <div id="user-header-bar">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>
      <link
        href="https://fonts.googleapis.com/css?family=Inter"
        rel="stylesheet"
      ></link>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
      ></link>    

      <div id="user-header-bar-SW-name">
        <a href={restaurantListPageURL}>Victual Ingredients Management</a>
      </div>

      <div id="user-header-bar-item-zone">
        <div id="name-clock">
          <div>
            <UserHeader username={props.username} />
          </div>
          <div id="div-clock">
            <Clock />
          </div>
        </div>
        <div className="home-nav-btn">
          <button id="logout-btn">ออกจากระบบ</button>
        </div>
        
        <div className="user-header-bar-sidebar">
          <button className="user-header-bar-sidebar-btn" id="user-header-bar-sidebar-btn-menu">
            <i className="material-icons">menu</i>
          </button>

          <button className="user-header-bar-sidebar-btn" id="user-header-bar-sidebar-btn-logout">
            <i className="material-icons">logout</i>
          </button>

          <div className="user-header-bar-sidebar-content">
            <a href="#">opt1</a>
            <a href="#">วิธีใช้งาน</a>
            <a href="http://localhost:3000/login" id="user-header-bar-logout">
              ออกจากระบบ
            </a>
          </div>
        </div>   
      </div>
    </div>
  );
};

export default HearderBar;
