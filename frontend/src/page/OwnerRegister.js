import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OwnerRegister.css";

function OwenerRegisterPage() {
  const navigate = useNavigate();
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ownerSecret, setOwnerSecret] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        "http://localhost:3001/auth/register-owner",
        {
          firstname: Fname,
          lastname: Lname,
          username: username,
          password: password,
          ownerSecret: ownerSecret,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          //alert("Register successful");
          window.localStorage.setItem("token", res.data.accessToken);
          window.localStorage.setItem("", true);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div id="reg-page-body">
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
      <div id="reg-page">
        <div id="reg-box">
          <div id="reg-element">
            <div id="reg-txt">
              <span className="reg-head" style={{ color: "#000" }}>
                Owner
              </span>
              <span
                className="reg-head"
                style={{ color: "#0A82A9", marginLeft: "3%" }}
              >
                Register
              </span>
            </div>

            <div id="reg-sw-txt">
              <span id="reg-sw-name">
                <span>ลงทะเบียนเจ้าของร้านเพื่อเริ่มต้นใช้ </span> Victual
                Ingredients Management
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="reg-form-floating">
                <div className="reg-input-form">
                  <i className="material-icons" id="name-icon">
                    badge
                  </i>
                  <input
                    className="reg-form-input-space"
                    id="reg-input-form-name"
                    type="text"
                    placeholder="name (ชื่อ)"
                    name="name"
                    aria-invalid="false"
                    autoComplete="None"
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                  />
                  <input
                    className="reg-form-input-space"
                    type="text"
                    placeholder="lastname (นามสกุล)"
                    name="username"
                    aria-invalid="false"
                    autoComplete="None"
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="reg-form-floating">
                <div className="reg-input-form">
                  <i className="material-icons">person</i>
                  <input
                    className="reg-form-input-space"
                    type="text"
                    placeholder="username (ชื่อผู้ใช้)"
                    name="username"
                    aria-invalid="false"
                    autoComplete="None"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="reg-form-floating">
                <div className="reg-input-form ">
                  <i className="material-icons">lock</i>
                  <input
                    className="reg-form-input-space"
                    type="password"
                    placeholder="password (รหัสผ่าน)"
                    name="password"
                    aria-invalid="false"
                    autoComplete="None"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="reg-form-floating">
                <div className="reg-input-form">
                  <i className="material-icons">key</i>
                  <input
                    className="reg-form-input-space"
                    type="text"
                    placeholder="secret key (รหัสเฉพาะ)"
                    name="owner secret"
                    aria-invalid="false"
                    autoComplete="None"
                    onChange={(e) => {
                      setOwnerSecret(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div id="reg-span-zone" className="d-flex">
                <div id="reg-notice-txt">
                  ยังไม่ได้เข้าร่วมกับเรา ?{" "}
                  <span id="reg-to-contact">
                    <a href="http://localhost:3000/contact-us">ติดต่อเรา</a>
                  </span>{" "}
                  <br />
                  <span>
                    หากพบปัญหากรุณาติดต่อเรา{" "}
                    <a href="tel:123-456-7890" id="tel-at-reg">
                      091 234 5678
                    </a>
                  </span>
                </div>
                <div id="reg-pressed-button">
                  <button id="reg-submit" type="submit" className="btn-submit">
                    register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwenerRegisterPage;
