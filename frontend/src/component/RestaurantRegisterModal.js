import React, { useState } from 'react';
import './RestaurantRegisterModal.css';
import axios from 'axios';
import { generatePath } from 'react-router-dom';

function RestaurantRegisterModal({ setOpenModal }) {
  const [file, setFile] = useState('');
  const defaultImageUrl = '../resource/defualt-pic-for-upload.png';

  const fileUploadHandler = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);
    console.log(selectedFile);

    document.getElementById('restaurantPic-show').style.backgroundImage =
      'none';

    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      const previewUrl = reader.result;
      document.getElementById('restaurantPic-default-pic').style.display =
        'None';
      document.getElementById('restaurantPic-selected-pic').style.display =
        'block';
      document.getElementById(
        'restaurantPic-selected-pic',
      ).style.backgroundImage = `url(${previewUrl})`;
      document.getElementById(
        'restaurantPic-selected-pic',
      ).style.backgroundSize = 'Cover';
    };
  };

  const removeImageHandler = () => {
    setFile('');
    document.getElementById('restaurantPic-selected-pic').style.display =
        'None';
      document.getElementById('restaurantPic-default-pic').style.display =
        'block';
  };

  //update for axios post
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const accessToken = localStorage.getItem('token');

  async function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        'http://localhost:3001/restaurant',
        {
          name: restaurantName,
          description: restaurantDescription,
          image: file
        },
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert('Create restaurant successful');
          generatePath('/:restaurantName', { restaurantName: restaurantName });
          setOpenModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
          <form onSubmit={handleSubmit}>
            <div id="rest-reg-form">
              <div id="rest-reg-l1">
                <div id="restaurantPic-show">
                  <div id="restaurantPic-default-pic"></div>
                  <div id="restaurantPic-selected-pic"></div>
                </div>

                <div id="upload-remove-pic">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    id="restaurantPic-file"
                    name="filename"
                    style={{ display: 'none' }}
                    onChange={fileUploadHandler}
                  />
                  <label
                    htmlFor="restaurantPic-file"
                    id="restaurantPic-file-btn"
                  >
                    เพิ่มรูปภาพร้าน
                  </label>

                  <label
                    id="restaurantPic-remove-file-btn"
                    onClick={removeImageHandler}
                  >
                    ลบรูปภาพร้าน
                  </label>
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
                        setRestaurantDescription(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="rest-reg-span-zone" className="d-flex">
              <button id="rest-reg-submit" type="submit" className="btn-submit">
                เสร็จสิ้น
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RestaurantRegisterModal;
