import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:3001/auth/login", { username, password },
            {
                headers: { "Content-Type": "application/json" }
            }
        ).then((res) => {
            console.log(res)
            if (res.status === 201) {
                alert("Login successful")
                window.localStorage.setItem("token", res.data.accessToken);
                window.localStorage.setItem("loggedIn", true);
                navigate("/" + username + "/restaurant", { replace: true })
            }
        }).catch((error) => {
            console.log(error)
        })

    }

    return (
        <div id="Login-page-body">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <link href='https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin' rel='stylesheet' type='text/css'></link>
            <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></link>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
            <div id="Login-page">
                <div id="Login-box">
                    <div id="Login-element">
                        <div id="Login-txt">
                            <span className="login-head" style={{ color: "#000" }}>Log</span>
                            <span className="login-head" style={{ color: "#0A82A9" }}>in</span>
                        </div>

                        <div id="sw-txt">
                            <span id="sw-name" style={{ color: "#847F7F" }}>Victual Ingredients Management</span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-floating">
                                <div className="input-form ">
                                    <i className="material-icons">person</i>
                                    <input
                                        className="form-input-space"
                                        type="text"
                                        placeholder="username (ชื่อผู้ใช้)"
                                        name="username"
                                        aria-invalid="false"
                                        autoComplete="None"
                                        onChange={e => { setUsername(e.target.value) }}
                                    />
                                </div>
                                <div className="text-danger" htmlFor="">* username is required.</div>
                            </div>
                            <div className="form-floating">
                                <div className="input-form">
                                    <i className="material-icons">lock</i>
                                    <input
                                        className="form-input-space"
                                        type="password"
                                        placeholder="password (รหัสผ่าน)"
                                        name="password"
                                        aria-invalid="false"
                                        autoComplete="None"
                                        onChange={e => { setPassword(e.target.value) }}
                                    />
                                </div>
                                <div className="text-danger">* password is required.</div>
                            </div>
                            <div id="span-zone" className="d-flex">
                                <div id="notice-txt">หากพบปัญหา  เช่น  ลืมรหัสผ่าน  ไม่สามารถล็อกอินได้<br/>กรุณาติดต่อผู้จัดการร้านหรือผู้ดูแลระบบ</div>
                                <div id="pressed-button"><button id="login-submit" type="submit" className="btn-submit">login</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage