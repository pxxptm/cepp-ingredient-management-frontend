import React from 'react'
import './HomeHeaderBar.css'

function HomeHeaderBar() {
    return (
        <div id="header-bar">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <link href='https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin' rel='stylesheet' type='text/css'></link>
            <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></link>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
            
            <div id="SW-name"><a href="http://localhost:3000/">Victual Ingredients Management</a></div>
            
            <div id="item-zone">
                <a href="http://localhost:3000/feature" class="home-nav-btn-txt" >คุณสมบัติ</a>
                <a href="http://localhost:3000/faq" class="home-nav-btn-txt">วิธีใช้งาน</a>
                <a href="http://localhost:3000/login" className="home-nav-btn"><button id="login-btn">เข้าสู่ระบบ</button></a>
                <a href="http://localhost:3000/contact-us" className="home-nav-btn"><button id="contact-us-btn">ติดต่อเรา</button></a>
                <div class="dropdown">
                    <button class="dropbtn"><i className="material-icons">menu</i></button>
                    <div class="dropdown-content">
                        <a href="http://localhost:3000/feature">คุณสมบัติ</a>
                        <a href="http://localhost:3000/faq">วิธีใช้งาน</a>
                        <a href="http://localhost:3000/login" id="dropdown-login">เข้าสู่ระบบ</a>
                    </div>
                </div>
            </div>
        </div>          
    )
}

export default HomeHeaderBar