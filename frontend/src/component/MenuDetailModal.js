import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MenuDetailModal.css";
import Select from "react-select";

function MenuDetailModal({ restaurantId, menuId, setEditMenuModalOpen }) {
  const defaultPreviewImageUrl =
    "http://100.111.182.51:9000/cepp/ff70481200101befa8a695726a8d7e91.png";
  const [previewImage, setPreviewImage] = useState(defaultPreviewImageUrl);
  const [expic, setExPic] = useState("");
  const accessToken = localStorage.getItem("token");
  const urlGetMenuDetail = `http://localhost:3001/menu/${menuId}`;
  const urlIngredientList = `http://localhost:3001/ingredient/restaurant/${restaurantId}`;
  const urlGetMenuComponent = `http://localhost:3001/component/get-menu/${menuId}`;
  const [menuData, setMenuData] = useState([]);
  const [menuComponent, setMenuComponent] = useState([]);
  const [editNameMode, setEditNameMode] = useState(false);
  const [addComponentMode, setAddComponentMode] = useState(false);
  const [menuNameEdit, setMenuNameEdit] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [componentAmount, setComponentAmount] = useState(0);
  const [componentUnit, setComponentUnit] = useState("");
  const [componentId, setComponentId] = useState("");
  const [priority, setPriority] = useState("high");
  const [editComponentMode, setEditComponentMode] = useState(false);
  const [componentAmountEdit, setComponentAmountEdit] = useState("");
  const [componentPriorityEdit, setComponentPriorityEdit] = useState("");
  const [editComponentID, setEditComponentID] = useState("");
  const [editComponentIndex, setEditComponentIndex] = useState(-1);
  const [deleteComponentIndex, setDeleteComponentIndex] = useState(-1);
  const [deleteComponentID, setDeleteComponentID] = useState(-1);
  const [deleteComponentName, setDeleteComponentName] = useState(-1);

  useEffect(() => {
    axios
      .get(urlGetMenuDetail, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        setMenuData(response.data);
        setMenuNameEdit(response.data.name);
        setExPic(response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {}, [expic]);

  useEffect(() => {
    axios
      .get(urlGetMenuComponent, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        setMenuComponent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  useEffect(() => {
    axios
      .get(urlIngredientList, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        setIngredientList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditName = () => {
    setEditNameMode(true);
    setMenuNameEdit(menuData.name);
  };

  useEffect(() => {
    if (editComponentIndex === -1) {
      setEditComponentMode(false);
    } else {
      setEditComponentMode(true);
    }
  });

  const handleSaveName = () => {
    axios
      .patch(
        `http://localhost:3001/menu/${menuId}`,
        { name: menuNameEdit },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
    setEditNameMode(false);
    setMenuData({ ...menuData, name: menuNameEdit });
  };

  const handleComponentChange = (selectedOption) => {
    if (selectedOption) {
      const selectedIngredient = ingredientList.find(
        (ingredient) => ingredient.name === selectedOption.value
      );
      if (selectedIngredient) {
        setComponentUnit(selectedIngredient.unit);
        setComponentId(selectedIngredient._id);
      }
    } else {
      // Handle the case when no option is selected
      setComponentUnit(""); // Clear the unit
      setComponentId(""); // Clear the component ID
    }
  };

  const handleAddComponent = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/component",
        {
          restaurantId: restaurantId,
          menuId: menuId,
          ingredientId: componentId,
          ingredientAmount: parseFloat(componentAmount).toFixed(2),
          priority: priority,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
    setAddComponentMode(false);
    setComponentUnit("");
  };

  const handleEditComponent = (e) => {
    e.preventDefault();
    axios
      .patch(
        `http://localhost:3001/component/${editComponentID}`,
        {
          ingredientAmount: parseFloat(componentAmountEdit.toFixed(2)),
          priority: componentPriorityEdit,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setAddComponentMode(false);
        setEditComponentIndex(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const fileUploadHandler = (e) => {
    const selectedFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(imageUrl);

    const formData = new FormData();
    formData.append("image", selectedFile);

    axios
      .post("http://localhost:3001/file-upload/single", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const minioImagePath = "http://" + res.data.image_url;
        setExPic(minioImagePath); // Update the state with the new image URL
        axios
          .patch(
            `http://localhost:3001/menu/${menuId}`,
            {
              image: minioImagePath,
            },
            {
              headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {})
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeImageHandler = () => {
    // Update the previewImage state with the default image URL
    setPreviewImage(defaultPreviewImageUrl);

    // Set the background image of the menu-pic element to the default image URL
    const menuPicElement = document.getElementById("menu-pic");
    if (menuPicElement) {
      menuPicElement.style.backgroundImage = `url(${defaultPreviewImageUrl})`;
    }

    // Update the image URL in the backend
    axios
      .patch(
        `http://localhost:3001/menu/${menuId}`,
        {
          image: defaultPreviewImageUrl,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        //console.log("Menu image updated successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const menuPicElement = document.getElementById("menu-pic");
    if (menuPicElement) {
      menuPicElement.style.backgroundImage = `url(${previewImage})`;
    }
  }, [previewImage]);

  async function handleDeleteComponent() {
    await axios
      .delete(`http://localhost:3001/component/${deleteComponentID}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setDeleteComponentIndex(-1);
        setDeleteComponentID("");
        setDeleteComponentName("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const options = [
    ...ingredientList
      .map((ingredient, index) => {
        const isInMenuComponent = menuComponent.some(
          (component) => component.ingredientId === ingredient._id
        );
        if (!isInMenuComponent && ingredient.name) {
          return { value: ingredient.name, label: ingredient.name };
        }
        return null;
      })
      .filter((option) => option !== null),
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: "white",
      display: "flex",
      flexWrap: "nowrap",
      border: "0.1vw solid rgba(0,0,0,0.4)",
      width: "100%",
      height: "100%",
      fontSize: "0.85vw",
      borderRadius: "0.5vw",
      padding: "0.5% 3%",
      backgroundColor: "transparent",
      appearance: "none",
      boxShadow: "none",
      outline: "none",
    }),
    menu: (provided) => ({
      ...provided,
      background: "white",
      width: "100%",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "30vh",
      overflow: "auto",
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "white" : "white",
      color: "rgba(0,0,0,0.75)",
      "&:hover": {
        background: "rgba(0,0,0,0.08)",
        cursor: "pointer",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "rgba(0,0,0,0.75)",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none", // Hide the dropdown indicator
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none", // Hide the indicator separator
    }),
  };

  return (
    <div className="edit-menu-modalBackground">
      <div className="edit-menu-modalContainer">
        <div
          id="menu-pic"
          style={{
            backgroundImage: `url(${menuData.image})`,
            backgroundSize: "cover",
            width: "50%",
            aspectRatio: "1 / 1",
          }}
        ></div>
        <div className="edit-menu-body">
          <div className="edit-menu-body-inner">
            <div className="edit-menu-titleCloseBtn">
              <button onClick={() => setEditMenuModalOpen(false)}>x</button>
            </div>
            <div id="edit-menu-name-and-status">
              {editNameMode ? (
                <div id="edit-menu-menuName-editMode">
                  <input
                    value={menuNameEdit}
                    onChange={(e) => setMenuNameEdit(e.target.value)}
                  />

                  <button
                    id="save"
                    onClick={() => {
                      handleSaveName();
                      setEditNameMode(false);
                    }}
                  >
                    ยืนยันแก้ไข
                  </button>

                  <button
                    id="cancel"
                    onClick={() => {
                      setEditNameMode(false);
                    }}
                  >
                    ยกเลิก
                  </button>
                </div>
              ) : (
                <div id="edit-menu-menuName">
                  <div id="menuNameText">
                    <div>{menuData.name}</div>
                    <span onClick={handleEditName}>
                      <i className="material-icons">border_color</i>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div id="menu-component-header">
              <h3>รายการวัตถุดิบในเมนู</h3>
              {editComponentMode ? (
                <button
                  id="cancel-editing"
                  onClick={() => {
                    setEditComponentMode(false);
                    setEditComponentIndex(-1);
                  }}
                >
                  ยกเลิกการแก้ไขวัตถุดิบ
                </button>
              ) : addComponentMode ? (
                <button
                  id="cancel-adding"
                  onClick={() => {
                    setAddComponentMode(false);
                    setComponentUnit("");
                  }}
                >
                  ยกเลิกการเพิ่มวัตถุดิบ
                </button>
              ) : (
                <button
                  id="adding"
                  onClick={() => {
                    if (!editComponentMode) {
                      setAddComponentMode(true);
                    }
                  }}
                >
                  <span>+</span>เพิ่มวัตถุดิบในเมนู
                </button>
              )}
            </div>

            <div id="menu-component-table">
              <div id="menu-component-table-zone">
                {!addComponentMode && menuComponent.length === 0 ? (
                  <div id="no-component">
                    <div>ยังไม่มีวัตถุดิบในเมนูนี้</div>
                  </div>
                ) : (
                  <div id="menu-component-table-content">
                    {addComponentMode && (
                      <div className="component-block" id="add-new">
                        <div id="add-new-div">
                          <Select
                            styles={customStyles}
                            name="contact back time"
                            id="new-component-select"
                            className="custom-select"
                            options={options}
                            placeholder="เลือกวัตถุดิบ"
                            filterOption={(option, inputValue) =>
                              option.label
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                            }
                            onChange={handleComponentChange}
                          />
                        </div>
                        <div id="component-amount-div">
                          <input
                            type="number"
                            step="0.01"
                            placeholder="ปริมาณ"
                            aria-invalid="false"
                            autoComplete="None"
                            min="0"
                            onChange={(e) => {
                              setComponentAmount(e.target.value);
                            }}
                          />
                        </div>
                        <div id="component-amount-unit">
                          <div>{componentUnit}</div>
                        </div>
                        <div id="component-amount-priority">
                          <select
                            value={priority}
                            onChange={handlePriorityChange}
                            style={{
                              color:
                                priority === "high" ? "#A00000" : "#006f59",
                            }}
                          >
                            <option value="high" selected id="select-option">
                              สำคัญมาก
                            </option>
                            <option value="low" id="select-option">
                              สำคัญน้อย
                            </option>
                          </select>
                        </div>
                        <div id="component-amount-confirm-add">
                          <button onClick={handleAddComponent}>
                            <i className="material-icons">done</i>
                          </button>
                        </div>
                      </div>
                    )}

                    {menuComponent.length > 0 &&
                      menuComponent.map((component, index) => {
                        const componentData = ingredientList.filter(
                          (ingredient) =>
                            ingredient._id === component.ingredientId
                        );

                        const isEditing = editComponentIndex === index;

                        // Check if componentData is not empty
                        if (componentData.length > 0) {
                          return component.ingredientAmount > 0 &&
                            !isEditing ? (
                            !(deleteComponentIndex === index) ? (
                              <div
                                className="component-block"
                                id="menu-in"
                                style={{
                                  borderBottom:
                                    index === ingredientList.length - 1 &&
                                    ingredientList.length > 5
                                      ? "0.1vw solid rgba(0, 0, 0, 0.2)"
                                      : "0.1vw solid rgba(0, 0, 0, 0.2)",
                                }}
                                key={index}
                              >
                                <div
                                  id="componentName"
                                  onClick={() => {
                                    if (!addComponentMode) {
                                      setEditComponentIndex(index);
                                      setComponentAmountEdit(
                                        component.ingredientAmount
                                      );
                                      setComponentPriorityEdit(
                                        component.priority
                                      );
                                      setEditComponentID(component._id);
                                    }
                                  }}
                                >
                                  {componentData[0].name}
                                </div>
                                <div
                                  id="componentAmount"
                                  onClick={() => {
                                    if (!addComponentMode) {
                                      setEditComponentIndex(index);
                                      setComponentAmountEdit(
                                        component.ingredientAmount
                                      );
                                      setComponentPriorityEdit(
                                        component.priority
                                      );
                                      setEditComponentID(component._id);
                                    }
                                  }}
                                >
                                  {component.ingredientAmount}
                                </div>
                                <div
                                  id="componentUnit"
                                  onClick={() => {
                                    if (!addComponentMode) {
                                      setEditComponentIndex(index);
                                      setComponentAmountEdit(
                                        component.ingredientAmount
                                      );
                                      setComponentPriorityEdit(
                                        component.priority
                                      );
                                      setEditComponentID(component._id);
                                    }
                                  }}
                                >
                                  {componentData[0].unit}
                                </div>
                                {component.priority === "high" ? (
                                  <div
                                    id="componentPriority"
                                    style={{ color: "#A00000" }}
                                    onClick={() => {
                                      if (!addComponentMode) {
                                        setEditComponentIndex(index);
                                        setComponentAmountEdit(
                                          component.ingredientAmount
                                        );
                                        setComponentPriorityEdit(
                                          component.priority
                                        );
                                        setEditComponentID(component._id);
                                      }
                                    }}
                                  >
                                    สำคัญมาก
                                  </div>
                                ) : (
                                  <div
                                    id="componentPriority"
                                    style={{ color: "#006f59" }}
                                    onClick={() => {
                                      setEditComponentIndex(index);
                                      setComponentAmountEdit(
                                        component.ingredientAmount
                                      );
                                      setComponentPriorityEdit(
                                        component.priority
                                      );
                                      setEditComponentID(component._id);
                                    }}
                                  >
                                    สำคัญน้อย
                                  </div>
                                )}

                                <button
                                  id="delete-component-btn"
                                  onClick={() => {
                                    setDeleteComponentIndex(index);
                                    setDeleteComponentName(
                                      componentData[0].name
                                    );
                                    setDeleteComponentID(component._id);
                                  }}
                                >
                                  <i
                                    className="material-icons"
                                    id="delete-menu-btn-icon"
                                  >
                                    delete
                                  </i>
                                </button>
                              </div>
                            ) : (
                              <div
                                className="deleted-component"
                                style={{
                                  borderBottom:
                                    index === ingredientList.length - 1 &&
                                    ingredientList.length > 5
                                      ? "0.1vw solid rgba(0, 0, 0, 0.2)"
                                      : "0.1vw solid rgba(0, 0, 0, 0.2)",
                                }}
                                key={index}
                              >
                                <div id="component-del-text">
                                  <div>แน่ใจใช่ไหมว่าต้องการลบ</div>
                                  <span>{deleteComponentName}</span>
                                </div>
                                <button
                                  id="cancel-delete-component-btn"
                                  onClick={() => {
                                    setDeleteComponentIndex(-1);
                                    setDeleteComponentID("");
                                    setDeleteComponentName("");
                                  }}
                                >
                                  ยกเลิกการลบ
                                </button>
                                <button
                                  id="delete-component-btn"
                                  onClick={() => {
                                    handleDeleteComponent();
                                  }}
                                >
                                  ลบจากเมนูนี้
                                </button>
                              </div>
                            )
                          ) : (
                            <div className="component-block" id="edit-comp">
                              <div
                                id="edit-comp-div"
                                style={{
                                  display: "flex",
                                }}
                              >
                                <div id="edit-comp-div-componentName">
                                  {componentData[0].name}
                                </div>
                              </div>
                              <div
                                id="component-amount-div"
                                className="edit-comp-component-amount-div"
                              >
                                <input
                                  type="number"
                                  step="0.01"
                                  placeholder="ปริมาณ"
                                  aria-invalid="false"
                                  autoComplete="None"
                                  min="0"
                                  value={componentAmountEdit}
                                  onChange={(e) => {
                                    setComponentAmountEdit(e.target.value);
                                  }}
                                  style={{
                                    backgroundColor: "white",
                                  }}
                                />
                              </div>
                              <div id="component-amount-unit">
                                <div> {componentData[0].unit}</div>
                              </div>
                              <div id="component-amount-priority">
                                <select
                                  value={componentPriorityEdit}
                                  onChange={(e) => {
                                    setComponentPriorityEdit(e.target.value);
                                  }}
                                  style={{
                                    backgroundColor: "white",
                                    color:
                                      componentPriorityEdit === "high"
                                        ? "#A00000"
                                        : "#006f59",
                                  }}
                                >
                                  <option
                                    value="high"
                                    selected
                                    id="select-option"
                                  >
                                    สำคัญมาก
                                  </option>
                                  <option value="low" id="select-option">
                                    สำคัญน้อย
                                  </option>
                                </select>
                              </div>
                              <div id="component-amount-confirm-add">
                                <button onClick={handleEditComponent}>
                                  <i className="material-icons">done</i>
                                </button>
                              </div>
                            </div>
                          );
                        } else {
                          return null; // Return null if componentData is empty
                        }
                      })}
                  </div>
                )}
              </div>
            </div>
            <div id="menu-component-table-footer">
              <div id="edit-pic">
                <div id="txt">
                  <div>แก้ไขรูปภาพ</div> <span>:</span>
                </div>

                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  id="menuPic-file"
                  name="filename"
                  style={{ display: "none" }}
                  onChange={fileUploadHandler}
                />
                <label htmlFor="menuPic-file" id="menuPic-file-edit-btn">
                  เปลี่ยนรูปภาพเมนู
                </label>

                <label
                  id="menuPic-remove-file-edit-btn"
                  onClick={removeImageHandler}
                >
                  ลบรูปภาพเมนู
                </label>
              </div>
              <button
                id="save-change"
                onClick={() => {
                  setEditMenuModalOpen(false);
                }}
              >
                เสร็จสิ้น
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuDetailModal;
