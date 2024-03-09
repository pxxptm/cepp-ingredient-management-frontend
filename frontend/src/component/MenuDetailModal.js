import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MenuDetailModal.css";

function MenuDetailModal({ restaurantId, menuId, setEditMenuModalOpen }) {
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

  const [componentName, setComponentName] = useState("");
  const [componentAmount, setComponentAmount] = useState(0);
  const [componentUnit, setComponentUnit] = useState("");
  const [componentId, setComponentId] = useState("");
  const [priority, setPriority] = useState("high");

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [menuId, accessToken, urlGetMenuDetail]);

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
        console.log(response.data);
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
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
    setEditNameMode(false);
    setMenuData({ ...menuData, name: menuNameEdit });
  };

  const handleComponentChange = (e) => {
    const selectedComponentName = e.target.value;
    const selectedIngredient = ingredientList.find(
      (ingredient) => ingredient.name === selectedComponentName
    );
    if (selectedIngredient) {
      setComponentName(selectedComponentName);
      setComponentUnit(selectedIngredient.unit);
      setComponentId(selectedIngredient._id);
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
          ingredientAmount: parseFloat(componentAmount),
          priority: priority,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
    setAddComponentMode(false);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
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
                    แก้ไขชื่อเมนู
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
              {addComponentMode ? (
                <button
                  id="cancel-adding"
                  onClick={() => {
                    setAddComponentMode(false);
                  }}
                >
                  ยกเลิกการเพิ่มวัตถุดิบ
                </button>
              ) : (
                <button
                  id="adding"
                  onClick={() => {
                    setAddComponentMode(true);
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
                          <select
                            name="contact back time"
                            id="new-component-select"
                            onChange={(e) => {
                              handleComponentChange(e);
                            }}
                          >
                            <option
                              value=""
                              disabled
                              selected
                              id="new-component-select-option"
                            >
                              เลือกวัตถุดิบจากคลังวัตถุดิบ *
                            </option>
                            {ingredientList.length > 0 &&
                              ingredientList.map((ingredient, index) => {
                                const isInMenuComponent = menuComponent.some(
                                  (component) =>
                                    component.ingredientId === ingredient._id
                                );

                                if (!isInMenuComponent) {
                                  return (
                                    <option key={index} value={ingredient.name}>
                                      {ingredient.name}
                                    </option>
                                  );
                                }
                              })}
                          </select>
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

                        return (
                          component.ingredientAmount > 0 && (<div
                            className="component-block"
                            id="menu-in"
                            style={{
                              borderBottom:
                                index === ingredientList.length - 1 &&
                                ingredientList.length > 5
                                  ? "none"
                                  : "0.1vw solid rgba(0, 0, 0, 0.2)",
                            }}
                            key={index}
                          >
                            <div id="componentName">
                              {componentData[0].name}
                            </div>
                            <div id="componentAmount">
                              {component.ingredientAmount}
                            </div>
                            <div id="componentUnit">
                              {componentData[0].unit}
                            </div>
                            {component.priority === "high" ? (
                              <div id="componentPriority" style={{color : "#A00000"}}>สำคัญมาก</div>
                            ) : (
                              <div id="componentPriority" style={{color : "#006f59"}} >สำคัญน้อย</div>
                            )}

                            <button
                                id="delete-component-btn"
                                onClick={() => {
                                  
                                }}
                              >
                                <i
                                  className="material-icons"
                                  id="delete-menu-btn-icon"
                                >
                                  delete
                                </i>
                              </button>
                          </div>)
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
            <div id="menu-component-table-footer">
              <button id="cancel-change">ยกเลิกการแก้ไข</button>
              <button id="save-change">บันทึกการแก้ไข</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuDetailModal;
