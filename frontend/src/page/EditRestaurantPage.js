import React, { useEffect, useRef, useState } from "react";
import "./EditRestaurantPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/OwnerSideNavBar";
import axios from "axios";
import DeleteRestaurantAuthModal from "../component/DeleteRestaurantAuthModal";

function EditRestaurantPage({ username, restaurantId }) {
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;
  const accessToken = localStorage.getItem("token");
  const defaultPreviewImageUrl =
    "http://100.111.182.51:9000/cepp/ff70481200101befa8a695726a8d7e91.png";

  const [restaurantImage, setRestaurantImage] = useState();
  const [editMode, setEditMode] = useState(false);
  const userRole = useRef("staff");
  const urlUserDetail = "http://localhost:3001/user/role";

  // get role of this user
  useEffect(() => {
    axios
      .get(urlUserDetail, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        const role = response.data.role;
        userRole.current = role;
        console.log(userRole.current);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // get restaurant detail
  useEffect(() => {
    axios
      .get(urlRestaurantDetail, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        const name = res.data.name;
        const image = res.data.image;
        const description = res.data.description;
        setRestaurantNameStatic(name);
        setRestaurantName(name);
        setRestaurantImage(image);
        setRestaurantescriptStatic(description);
        setRestaurantDescription(description);
        setRestaurantImgStatic(image || defaultPreviewImageUrl);
        setPreviewImage(image || defaultPreviewImageUrl);
        setExPic(image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const restaurantPicRef = useRef(restaurantImage);
  const [restaurantName, setRestaurantName] = useState();
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [previewImage, setPreviewImage] = useState(restaurantPicRef);
  const [imageFile, setImageFile] = useState("");
  const [expic, setExPic] = useState("");
  let minioImagePath = expic;
  const [restaurantNameStatic, setRestaurantNameStatic] = useState("");
  const [restaurantDescriptStatic, setRestaurantescriptStatic] = useState("");
  const [restaurantImgStatic, setRestaurantImgStatic] = useState("");

  useEffect(() => {
    console.log(previewImage);
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

  // save change
  async function handleSubmit(event) {
    event.preventDefault();

    if (previewImage !== expic && previewImage !== defaultPreviewImageUrl) {
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

    if (previewImage === defaultPreviewImageUrl) {
      minioImagePath = defaultPreviewImageUrl;
    }

    // patch change
    await axios
      .patch(
        urlRestaurantDetail,
        {
          name: restaurantName,
          description: restaurantDescription,
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
        if (res.status === 200) {
          refreshPage();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div id="Edit-restaurant-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="Edit-restaurant-page-header-bar">
        <UserHeaderBar username={username} />
      </div>

      <div id="Edit-restaurant-page-body">
        {openDeleteModal && (
          <DeleteRestaurantAuthModal
            OwnerUsername={username}
            restaurantName={restaurantNameStatic}
            restaurantId={restaurantId}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        )}
        <div id="Staff-management-page-side-bar-menu">
          <UserSideNavBar
            username={username}
            restaurantId={restaurantId}
            restaurantName={restaurantNameStatic}
            restaurantImage={restaurantImage}
          />
        </div>

        <div id="Edit-restaurant-page-content">
          <div id="Edit-restaurant-page-content-header">
            <h1>ข้อมูลร้าน</h1>
            <div className="btn-box-col">
              {!editMode && userRole.current === "owner" && (
                <button
                  id="edit-rest-btn"
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  แก้ไขข้อมูล
                </button>
              )}

              {editMode && userRole.current === "owner" && (
                <button
                  id="cancel-edit-rest-btn"
                  onClick={() => {
                    setEditMode(false);
                    setRestaurantName(restaurantNameStatic);
                    setRestaurantDescription(restaurantDescriptStatic);
                    setPreviewImage(restaurantImgStatic);
                  }}
                >
                  ยกเลิกการแก้ไข
                </button>
              )}
            </div>
            <div className="btn-box-col">
              {(userRole.current === "owner") && <button
                id="delete-rest-btn"
                onClick={() => setOpenDeleteModal(true)}
              >
                ลบร้านของคุณ
              </button>}
            </div>
          </div>

          <div className="Edit-restaurant-Container">
            <div className="Edit-restaurant-body">
              <form onSubmit={handleSubmit}>
                <div id="Edit-restaurant-form">
                  <div id="Edit-restaurant-l1">
                    <div id="restaurantPic-show">
                      <div id="restaurantPic-pic"></div>
                    </div>

                    {editMode && (
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
                          เพิ่มรูปภาพร้าน
                        </label>
                        <label
                          htmlFor="restaurantPic-file"
                          id="restaurantPic-file-btn-icon"
                        >
                          <i className="material-icons">upload</i>
                        </label>

                        <label
                          id="restaurantPic-remove-file-btn"
                          onClick={removeImageHandler}
                        >
                          ลบรูปภาพร้าน
                        </label>
                        <label
                          id="restaurantPic-remove-file-btn-icon"
                          onClick={removeImageHandler}
                        >
                          <i className="material-icons">delete</i>
                        </label>
                      </div>
                    )}
                  </div>

                  <div id="Edit-restaurant-r2">
                    <div className="Edit-restaurant-form-floating">
                      <div className="Edit-restaurant-input-form">
                        <label>restaurant name (ชื่อร้าน) *</label>
                        <input
                          className="Edit-restaurant-form-input-space"
                          type="text"
                          placeholder="restaurant name (ชื่อร้าน)"
                          name="username"
                          aria-invalid="false"
                          autoComplete="None"
                          onChange={(e) => {
                            setRestaurantName(e.target.value);
                          }}
                          value={restaurantName}
                          readOnly={!editMode}
                        />
                      </div>
                    </div>

                    <div className="Edit-restaurant-form-floating">
                      <div className="Edit-restaurant-input-form">
                        <label>
                          restaurant description (คำอธิบายรายละเอียดร้าน)
                        </label>
                        <textarea
                          className="Edit-restaurant-form-input-space"
                          type="text"
                          placeholder="restaurant description (คำอธิบายรายละเอียดร้าน)"
                          name="username"
                          aria-invalid="false"
                          autoComplete="None"
                          id="Edit-restaurant-descript-input"
                          onChange={(e) => {
                            setRestaurantDescription(e.target.value);
                          }}
                          value={restaurantDescription}
                          readOnly={!editMode}
                        />
                      </div>
                    </div>
                    {editMode && (
                      <div id="Edit-restaurant-span-zone" className="d-flex">
                        <button
                          id="Edit-restaurant-submit"
                          type="submit"
                          className="btn-submit"
                        >
                          เสร็จสิ้น
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditRestaurantPage;
