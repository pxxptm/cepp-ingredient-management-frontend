import axios from "axios";
import "./CreateMenuModal.css";
import React, { useEffect, useState } from "react";

function CreateMenuModal({ setCreateMenuModalOpen, restaurantId }) {
  const defaultPreviewImageUrl =
    "http://100.111.182.51:9000/cepp/ff70481200101befa8a695726a8d7e91.png";
  const [previewImage, setPreviewImage] = useState(defaultPreviewImageUrl);
  const [imageFile, setImageFile] = useState("");
  let minioImagePath = defaultPreviewImageUrl;

  useEffect(() => {
    document.getElementById(
      "restaurantPic-pic"
    ).style.backgroundImage = `url(${previewImage})`;
  }, [previewImage]);

  function refreshPage() {
    window.location.reload();
  }

  const fileUploadHandler = (e) => {
    const selectedFile = URL.createObjectURL(e.target.files[0]);
    setImageFile(e.target.files[0]);
    setPreviewImage(selectedFile);
  };

  const removeImageHandler = () => {
    setPreviewImage(defaultPreviewImageUrl);
  };

  //update for axios post
  const [menuName, setMenuName] = useState("");
  const accessToken = localStorage.getItem("token");

  async function handleSubmit(event) {
    event.preventDefault();

    if (previewImage !== defaultPreviewImageUrl) {
      await axios
        .post(
          "http://localhost:3001/file-upload/single",
          {
            image: imageFile,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            minioImagePath = "http://" + res.data.image_url;
            console.log(minioImagePath);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    await axios
      .post(
        "http://localhost:3001/menu",
        {
          name: menuName,
          restaurantId: restaurantId,
          image: minioImagePath,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setCreateMenuModalOpen(false);
          refreshPage();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="menu-create-modalBackground">
      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div className="menu-create-modalContainer">
        <div className="menu-create-titleCloseBtn">
          <button
            onClick={() => {
              setCreateMenuModalOpen(false);
            }}
          >
            x
          </button>
        </div>

        <div className="menu-create-body">
          <form onSubmit={handleSubmit}>
            <div id="menu-create-form">
              <div id="menu-create-l1">
                <div id="restaurantPic-show">
                  {/* <div id="restaurantPic-default-pic"></div>
              <div id="restaurantPic-selected-pic"></div> */}
                  <div id="restaurantPic-pic"></div>
                </div>

                <div id="upload-remove-pic">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    id="restaurantPic-file"
                    name="filename"
                    style={{ display: "none" }}
                    onChange={fileUploadHandler}
                  />
                  <label
                    htmlFor="restaurantPic-file"
                    id="restaurantPic-file-btn"
                  >
                    เพิ่มรูปภาพเมนู
                  </label>

                  <label
                    id="restaurantPic-remove-file-btn"
                    onClick={removeImageHandler}
                  >
                    ลบรูปภาพเมนู
                  </label>
                </div>
              </div>

              <div id="menu-create-r2">
                <div className="menu-create-form-floating">
                  <div className="menu-create-input-form">
                    <input
                      className="menu-create-form-input-space"
                      type="text"
                      placeholder="menu name (ชื่อเมนู)"
                      name="menuName"
                      aria-invalid="false"
                      autoComplete="None"
                      onChange={(e) => {
                        setMenuName(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="menu-create-span-zone" className="d-flex">
              <button
                id="menu-create-cancel"
                onClick={() => {
                  setCreateMenuModalOpen(false);
                }}
              >
                ยกเลิก
              </button>
              <button
                id="menu-create-submit"
                type="submit"
                className="btn-submit"
              >
                เสร็จสิ้น
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateMenuModal;
