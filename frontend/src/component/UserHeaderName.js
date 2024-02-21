import React from "react";
import "./UserHeaderName.css";
import { useNavigate } from "react-router-dom";

const UserHeaderName = (props) => {
    const navigate = useNavigate();
    const urlEditAccount = "/" + props.username + "/account"
  return (
    <div id="user-name">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>
      
      <div id="name-and-icon" onClick={() => {
              navigate(urlEditAccount, { replace: true })
            }}>
      <p id="user-name-txt">{props.username}</p>
      <i className="material-icons">person</i>
      </div>

    </div>
  );
};

export default UserHeaderName;
