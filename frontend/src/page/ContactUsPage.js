import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactUsPage.css';
import axios from 'axios';
import HomeHeaderBar from '../component/HomeHeaderBar';

function ContactUsPage() {
  const navigate = useNavigate();
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ownerSecret, setOwnerSecret] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
  }

  const packageOPT = ['แพ็คเกจรายวัน', 'แพ็คเกจรายเดือน', 'แพ็คเกจรายปี'];
  const packagePrice = ['20 ฿', '500 ฿', '5,500 ฿'];
  const packagePricePerDay = [
    'ราคาเพียง 20 บาทต่อวัน',
    'น้อยกว่า 17 บาทต่อวัน',
    'น้อยกว่า 16 บาทต่อวัน',
  ];
  const timeOPT = [
    '9.00 น.',
    '9.30 น.',
    '10.00 น.',
    '10.30 น.',
    '11.00 น.',
    '13.00 น.',
    '13.30 น.',
    '14.00 น.',
    '14.30 น.',
    '15.00 น.',
    '15.30 น.',
    '16.00 น.',
    '16.30 น.',
    '17.00 น.',
  ];

  return (
    <div id="Contact-us-page">
      <div id="Contact-us-page-content">
        <link
          href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
          rel="stylesheet"
          type="text/css"
        ></link>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>

        <div id="Contact-us-page-header">
          <HomeHeaderBar></HomeHeaderBar>
        </div>

        <div id="Contact-us-page-body">

          <div id="Contact-us-content">

            <div id="Contact-us-header-txt">
              <div className="txt" id="txt-1">
                ลงทะเบียนกับเราวันนี้
              </div>

              <div className="txt" id="txt-2">
                เพื่อคลังวัตถุดิบที่ดีขึ้นสำหรับธุรกิจคุณ
              </div>
            </div>

            <div className="Contact-us-form-and-price-rate">
              <div id="price-rate-area">
                <div className="price-rate-block">
                  <div
                    className="price-rate-block-pic"
                    id="price-rate-block-pic-1"
                  ></div>
                  <div className="price-rate-block-content">
                    <div className="packageName">{packageOPT[0]}</div>
                    <div className="packagePrice">{packagePrice[0]}</div>
                    <div className="packagePricePerDay">
                      {packagePricePerDay[0]}
                    </div>
                  </div>
                </div>
                <div className="price-rate-block">
                  <div
                    className="price-rate-block-pic"
                    id="price-rate-block-pic-2"
                  ></div>
                  <div
                    className="price-rate-block-content"
                    id="price-rate-block-txt-2"
                  >
                    <div
                      className="price-rate-block-content"
                      id="price-rate-block-content-2"
                    >
                      <div className="packageName">{packageOPT[1]}</div>
                      <div className="packagePrice">{packagePrice[1]}</div>
                      <div className="packagePricePerDay">
                        {packagePricePerDay[1]}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="price-rate-block">
                  <div
                    className="price-rate-block-pic"
                    id="price-rate-block-pic-3"
                  ></div>
                  <div className="price-rate-block-content">
                    <div className="packageName">{packageOPT[2]}</div>
                    <div className="packagePrice">{packagePrice[2]}</div>
                    <div className="packagePricePerDay">
                      {packagePricePerDay[2]}
                    </div>
                  </div>
                </div>
              </div>
              <div id="Contact-us-form-area">
                <form onSubmit={handleSubmit}>
                  <div className="Contact-us-form-floating">
                    <div className="Contact-us-input-form">
                      <i
                        className="material-icons"
                        id="Contact-us-owner-name-icon"
                      >
                        badge
                      </i>
                      <input
                        className="Contact-us-form-input-space"
                        id="Contact-us-input-form-name"
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
                        className="Contact-us-form-input-space"
                        type="text"
                        placeholder="lastname (นามสกุล) *"
                        name="username"
                        aria-invalid="false"
                        autoComplete="None"
                        onChange={(e) => {
                          setLname(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="Contact-us-form-floating">
                    <div className="Contact-us-input-form-half">
                      <i className="material-icons">call</i>
                      <input
                        className="Contact-us-form-input-space"
                        type="tel"
                        placeholder="tel. number (เบอร์โทรศัพท์) *"
                        name="telNum"
                        aria-invalid="false"
                        autoComplete="None"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </div>
                    <div className="Contact-us-input-form-half">
                      <i className="material-icons">add_call</i>
                      <input
                        className="Contact-us-form-input-space"
                        type="tel"
                        placeholder="second tel. number (เบอร์โทรศัพท์สำรอง)"
                        name="secondTelNum"
                        aria-invalid="false"
                        autoComplete="None"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="Contact-us-form-floating">
                    <div className="Contact-us-input-form ">
                      <i className="material-icons">mail</i>
                      <input
                        className="Contact-us-form-input-space"
                        type="email"
                        placeholder="email (อีเมล) *"
                        name="email"
                        aria-invalid="false"
                        autoComplete="None"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="Contact-us-form-floating">
                    <div className="Contact-us-input-form-half">
                      <i className="material-icons">event</i>
                      <input
                        className="Contact-us-form-input-space"
                        type="text"
                        placeholder="contact back date (นัดหมายวันติดต่อกลับ) *"
                        name="contact back date"
                        aria-invalid="false"
                        autoComplete="None"
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => (e.target.type = 'text')}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </div>
                    <div className="Contact-us-input-form-half">
                      <i className="material-icons">schedule</i>
                      <select
                        className="Contact-us-form-input-space"
                        name="contact back time"
                        id="appointment-time"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      >
                        <option
                          value=""
                          disabled
                          selected
                          id="Contact-us-disable-option"
                        >
                          contact back time (นัดหมายเวลาติดต่อกลับ) *
                        </option>
                        <option value={timeOPT[0]}>{timeOPT[0]}</option>
                        <option value={timeOPT[1]}>{timeOPT[1]}</option>
                        <option value={timeOPT[2]}>{timeOPT[2]}</option>
                        <option value={timeOPT[3]}>{timeOPT[3]}</option>
                        <option value={timeOPT[4]}>{timeOPT[4]}</option>
                        <option value={timeOPT[5]}>{timeOPT[5]}</option>
                        <option value={timeOPT[6]}>{timeOPT[6]}</option>
                        <option value={timeOPT[7]}>{timeOPT[7]}</option>
                        <option value={timeOPT[8]}>{timeOPT[8]}</option>
                        <option value={timeOPT[9]}>{timeOPT[9]}</option>
                        <option value={timeOPT[10]}>{timeOPT[10]}</option>
                        <option value={timeOPT[11]}>{timeOPT[11]}</option>
                        <option value={timeOPT[12]}>{timeOPT[12]}</option>
                        <option value={timeOPT[13]}>{timeOPT[13]}</option>
                      </select>
                    </div>
                  </div>
                  <div className="Contact-us-form-floating">
                    <div className="Contact-us-input-form-half">
                      <i className="material-icons">bolt</i>
                      <select
                        className="Contact-us-form-input-space"
                        name="package version"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      >
                        <option
                          value=""
                          disabled
                          selected
                          id="Contact-us-disable-option"
                        >
                          choose package (แพ็คเกจที่สนใจ) *
                        </option>
                        <option value={packageOPT[0]}>{packageOPT[0]}</option>
                        <option value={packageOPT[1]}>{packageOPT[1]}</option>
                        <option value={packageOPT[2]}>{packageOPT[2]}</option>
                      </select>
                    </div>
                    <div className="Contact-us-input-form-half">
                      <i className="material-icons">pin_drop</i>
                      <input
                        className="Contact-us-form-input-space"
                        type="text"
                        placeholder="living province (จังหวัดที่คุณอาศัยอยู่) *"
                        name="located province"
                        aria-invalid="false"
                        autoComplete="None"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div id="Contact-us-span-zone" className="d-flex">
                    <div id="Contact-us-notice-txt">
                      * เราจะติดต่อกลับในระยะเวลานัดหมาย ในช่วง 30 นาที
                      <br />
                      ติดต่อเร่งด่วน หมายเลข{' '}
                      <a href="tel:123-456-7890" id="tel-at-contact-us">
                        091 234 5678
                      </a>
                    </div>
                    <div id="Contact-us-pressed-button">
                      <button
                        id="Contact-us-submit"
                        type="submit"
                        className="btn-submit"
                      >
                        ส่งแบบฟอร์ม
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div id="Contact-us-footer">
          <span>Powered By</span>
          <span>
            © 2024 Victual Ingredients Management Software | All Rights Reserved
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
