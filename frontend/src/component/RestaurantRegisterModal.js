import React, { useState } from 'react';
import './RestaurantRegisterModal.css';

function RestaurantRegisterModal({ setOpenModal }) {
  const [file, setFile] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  const fileUploadHandler = (event) => {
    setFile(event.target.files[0]);
    console.log(file);
  };

  return (
    <div className="rest-reg-modalBackground">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div className="rest-reg-modalContainer">
        <div className="rest-reg-titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            x
          </button>
        </div>

        <div className="rest-reg-body">
          <form>
            <div id="rest-reg-form">
              <div id="rest-reg-l1">
                <div id="restaurantPic-show"></div>

                <div id="upload-remove-pic">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    id="restaurantPic-file"
                    name="filename"
                    style={{ display: 'none' }}
                    onChange={fileUploadHandler}
                  />
                  <button htmlFor="restaurantPic-file" id="restaurantPic-file-btn">
                    เพิ่มรูปภาพร้าน
                  </button>

                  <button id="restaurantPic-remove-file-btn">
                    ลบรูปภาพ
                  </button>
                </div>
              </div>

              <div id="rest-reg-r2">
                <div className="rest-reg-form-floating">
                  <div className="rest-reg-input-form">
                    <label>restaurant name (ชื่อร้าน) *</label>
                    <input
                      className="rest-reg-form-input-space"
                      type="text"
                      placeholder="restaurant name (ชื่อร้าน)"
                      name="username"
                      aria-invalid="false"
                      autoComplete="None"
                      onChange={(e) => {
                        setRestaurantName(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="rest-reg-form-floating">
                  <div className="rest-reg-input-form">
                    <label>
                      restaurant description (คำอธิบายรายละเอียดร้าน)
                    </label>
                    <textarea
                      className="rest-reg-form-input-space"
                      type="text"
                      placeholder="restaurant description (คำอธิบายรายละเอียดร้าน)"
                      name="username"
                      aria-invalid="false"
                      autoComplete="None"
                      id="rest-reg-descript-input"
                      onChange={(e) => {
                        setRestaurantName(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="rest-reg-span-zone" className="d-flex">
              <button
                id="rest-reg-submit"
                type="submit"
                className="btn-submit"
              >เสร็จสิ้น</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RestaurantRegisterModal;
