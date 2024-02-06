import React from 'react'
import'./ContactUsPage.css'
import HomeHeaderBar from '../component/HomeHeaderBar'

function ContactUsPage() {
  return (
    <div id="Contact-us-page">
        <link href='https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin' rel='stylesheet' type='text/css'></link>
        <div id="Contact-us-page-header"><HomeHeaderBar></HomeHeaderBar></div>
        <div id="Contact-us-page-body">
            <div id="Contatc-us-content">
                <div id="Contatc-us-header-txt">
                    <div className="txt" id="txt-1">ลงทะเบียนกับเราวันนี้</div>
                    <div className="txt" id="txt-2">เพื่อคลังวัตถุดิบที่ดีขึ้นสำหรับธุรกิจคุณ</div>
                </div>
                <div id="form-area">
                    <div className="half-container">เรทราคา</div>
                    <div className="half-container">ฟอร์มติดต่อฝ่ายขาย</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactUsPage