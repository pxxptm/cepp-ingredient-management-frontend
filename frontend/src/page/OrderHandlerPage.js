import React, { useEffect, useState } from "react";
import "./OrderHandlerPage.css";
import UserHeaderBar from "../component/UserHeaderBar";
import UserSideNavBar from "../component/UserSideNavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotEnoughComponentAlertModal from "../component/NotEnoughComponentAlertModal";
import HaveOutOfStockIngredientMenuInOrderAlertModal from "../component/HaveOutOfStockIngredientMenuInOrderAlertModal";
import DeleteAllOrderMadal from "../component/DeleteAllOrderMadal";
import ReachLimitMaodal from "../component/ReachLimitMaodal";

function OrderHandlerPage({ username, restaurantId }) {
  const urlRestaurantDetail = `http://localhost:3001/restaurant/${restaurantId}`;
  const accessToken = localStorage.getItem("token");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantImage, setRestaurantImage] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [latestOrder, setLatestOrder] = useState([]);
  const [alertNotEnoughModal, setAlertNotEnoughModal] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedMenuName, setSelectedMenuName] = useState(null);
  const [userID, setUseID] = useState("");
  const [deleteAllOrderModalOpen, setDeleteAllOrderModalOpen] = useState(false);
  const LatestOrder = "LatestOrder" + restaurantId + userID;
  const [
    haveOutOfStockIngredientMenuInOrderAlertModalOpen,
    setHaveOutOfStockIngredientMenuInOrderAlertModalOpen,
  ] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const urlIngredientList = `http://localhost:3001/ingredient/restaurant/${restaurantId}`;
  const [ingredientList, setIngredientList] = useState([]);
  const [sortCriteriaTerm, setSortCriteriaTerm] = useState(0);
  const [menuClassName, setMenuClassName] = useState("inactive");
  const [menuBtnClassName, setMenuBtnClassName] = useState("sortInactive");
  const [filterBtn1ClassName, setFilterBtn1ClassName] = useState("isChoose");
  const [filterBtn2ClassName, setFilterBtn2ClassName] = useState("isNotChoose");
  const [filterTerm, setFilterTerm] = useState(-1);
  const [alertState, setAlertState] = useState(0);
  const [requireIngredients, setRequireIngredients] = useState([]);
  const [reachLimitMaodalOpen, setReachLimitMaodalOpen] = useState(false);
  const [reachLimitMenuName, setReachLimitMenuName] = useState("");
  const [reachLimitMenuAlertState, setReachLimitMenuAlertState] = useState(0);
  const [reachLimitMaxAmount, setReachLimitMaxAmount] = useState("");

  // get ID
  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/user-id-by-username/${username}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setUseID(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlIngredientList, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        setIngredientList(response.data);
        //console.log(ingredientList)
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 500); // Fetch data every 0.5 second

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }); // Empty dependency array to run effect only once

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get(urlRestaurantDetail, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        const { name, image } = restaurantResponse.data;
        setRestaurantName(name);
        setRestaurantImage(image);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [urlRestaurantDetail, accessToken]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const latestOrderFromStorage =
        JSON.parse(localStorage.getItem(LatestOrder)) || [];

      setLatestOrder(latestOrderFromStorage);

      // Initialize an empty array to store required ingredients
      let updatedIngredients = [];

      // Iterate over each menu in the latest order list
      for (const orderItem of latestOrderFromStorage) {
        const { id: menuId, amount } = orderItem;
        const urlMenuComponentList = `http://localhost:3001/component/get-menu/${menuId}`;

        try {
          // Fetch the menu components
          const response = await axios.get(urlMenuComponentList, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });
          const components = response.data;

          // Calculate the updated ingredients for the current menu
          components.forEach((ingredient) => {
            const existingIngredientIndex = updatedIngredients.findIndex(
              (item) => item.ingredientId === ingredient.ingredientId
            );
            const requiredAmount =
              parseFloat(ingredient.ingredientAmount) * parseFloat(amount);
            if (existingIngredientIndex !== -1) {
              updatedIngredients[existingIngredientIndex].amount +=
                requiredAmount;
            } else {
              updatedIngredients.push({
                ingredientId: ingredient.ingredientId,
                amount: requiredAmount,
              });
            }
          });
        } catch (error) {
          console.error("Error fetching menu components:", error);
        }
      }

      // Update the requireIngredients state
      setRequireIngredients(updatedIngredients);
      //console.log(requireIngredients);
    }, 500); // Update every 1 second

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const menuResponse = await axios.get(
          `http://localhost:3001/menu/get-valid-menu/${restaurantId}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        let menu = menuResponse.data;
        if (sortCriteriaTerm === 0) {
          setMenuList(menu);
        } else if (sortCriteriaTerm === 1) {
          const sortedMenuList = [...menu].sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          setMenuList(sortedMenuList);
        }
      } catch (error) {
        console.log("menulist", error);
      }
    };

    fetchMenuList();
  }, [restaurantId, sortCriteriaTerm]);

  const addToOrderSummary = async (id, name, amount) => {
    // Check if latestOrder is null or undefined
    if (!latestOrder) {
      setLatestOrder([{ id, name, amount }]);
      window.localStorage.setItem(
        LatestOrder,
        JSON.stringify([{ id, name, amount }])
      );
      return;
    }

    const existingItemIndex = latestOrder.findIndex(
      (item) => item.name === name && item.id === id
    );

    if (existingItemIndex !== -1) {
      const canCook = await checkAbleToCook(
        id,
        latestOrder[existingItemIndex].amount + 1
      );
      if (canCook) {
        const updatedLatestOrder = [...latestOrder];
        updatedLatestOrder[existingItemIndex].amount += amount;

        setLatestOrder(updatedLatestOrder);
        window.localStorage.setItem(
          LatestOrder,
          JSON.stringify(updatedLatestOrder)
        );

        // Calculate ingredients for this menu and update the requireIngredients state
        const urlMenuComponentList = `http://localhost:3001/component/get-menu/${id}`;

        try {
          // Fetch the menu components
          const response = await axios.get(urlMenuComponentList, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });
          const components = response.data;

          // Calculate the updated ingredients
          const updatedIngredients = requireIngredients.slice(); // Clone the array
          components.forEach((ingredient) => {
            const existingIngredientIndex = updatedIngredients.findIndex(
              (item) => item.ingredientId === ingredient.ingredientId
            );
            if (existingIngredientIndex !== -1) {
              updatedIngredients[existingIngredientIndex].amount +=
                parseFloat(ingredient.ingredientAmount) * parseFloat(amount);
            } else {
              updatedIngredients.push({
                ingredientId: ingredient.ingredientId,
                amount:
                  parseFloat(ingredient.ingredientAmount) * parseFloat(amount),
              });
            }
          });

          // Update the requireIngredients state
          setRequireIngredients(updatedIngredients);

          // Log requireIngredients after updating
          //console.log("Updated requireIngredients:", updatedIngredients);
        } catch (error) {
          //console.error("Error fetching menu components:", error);
        }
      } else {
        setReachLimitMaodalOpen(true);
        const menu = menuList.find((item) => item._id === id);
        setReachLimitMenuName(menu.name);
        setReachLimitMenuAlertState(1);
      }
    } else {
      const canCook = await checkAbleToCook(id, 1);
      if (canCook) {
        const updatedOrder = [...latestOrder, { id, name, amount }];
        setLatestOrder(updatedOrder);
        window.localStorage.setItem(LatestOrder, JSON.stringify(updatedOrder));

        // Calculate ingredients for this menu and update the requireIngredients state
        const urlMenuComponentList = `http://localhost:3001/component/get-menu/${id}`;

        try {
          // Fetch the menu components
          const response = await axios.get(urlMenuComponentList, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });
          const components = response.data;

          // Calculate the updated ingredients
          const updatedIngredients = requireIngredients.slice(); // Clone the array
          components.forEach((ingredient) => {
            const existingIngredientIndex = updatedIngredients.findIndex(
              (item) => item.ingredientId === ingredient.ingredientId
            );
            if (existingIngredientIndex !== -1) {
              updatedIngredients[existingIngredientIndex].amount +=
                parseFloat(ingredient.ingredientAmount) * parseFloat(amount);
            } else {
              updatedIngredients.push({
                ingredientId: ingredient.ingredientId,
                amount:
                  parseFloat(ingredient.ingredientAmount) * parseFloat(amount),
              });
            }
          });

          // Update the requireIngredients state
          setRequireIngredients(updatedIngredients);

          // Log requireIngredients after updating
          //console.log("Updated requireIngredients:", updatedIngredients);
        } catch (error) {
          //console.error("Error fetching menu components:", error);
        }
      } else {
        setReachLimitMaodalOpen(true);
        const menu = menuList.find((item) => item._id === id);
        setReachLimitMenuName(menu.name);
        setReachLimitMenuAlertState(2);
      }
    }
  };

  const increaseQuantity = async (id) => {
    const updatedItem = latestOrder.find((item) => item.id === id);

    if (updatedItem) {
      const newAmount = updatedItem.amount + 1;
      const canCook = await checkAbleToCook(id, newAmount);

      if (canCook) {
        const updatedLatestOrder = latestOrder.map((item) =>
          item.id === id ? { ...item, amount: newAmount } : item
        );

        setLatestOrder(updatedLatestOrder);
        window.localStorage.setItem(
          LatestOrder,
          JSON.stringify(updatedLatestOrder)
        );

        // Calculate ingredients for this menu and update the requireIngredients state
        const urlMenuComponentList = `http://localhost:3001/component/get-menu/${id}`;
        try {
          // Fetch the menu components
          const response = await axios.get(urlMenuComponentList, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });
          const components = response.data;

          // Calculate the updated ingredients
          const updatedIngredients = [...requireIngredients]; // Clone the array
          components.forEach((ingredient) => {
            const existingIngredientIndex = updatedIngredients.findIndex(
              (item) => item.ingredientId === ingredient.ingredientId
            );
            if (existingIngredientIndex !== -1) {
              // Update the ingredient amount based on the new quantity
              updatedIngredients[existingIngredientIndex].amount =
                parseFloat(ingredient.ingredientAmount) * newAmount;
            }
          });

          // Update the requireIngredients state
          setRequireIngredients(updatedIngredients);

          // Log requireIngredients after updating
          //console.log("Updated requireIngredients:", updatedIngredients);
        } catch (error) {
          //console.error("Error fetching menu components:", error);
        }
      } else {
        // NOTIFICATION
        setReachLimitMaodalOpen(true);
        const menu = menuList.find((item) => item._id === id);
        setReachLimitMenuName(menu.name);
        setReachLimitMenuAlertState(1);
      }
    }
  };

  const decreaseQuantity = async (id) => {
    const updatedLatestOrder = latestOrder.map((item) =>
      item.id === id && item.amount > 0
        ? { ...item, amount: item.amount - 1 }
        : item
    );

    if (
      updatedLatestOrder.some((item) => item.id === id && item.amount === 0) &&
      menuList.find((menu) => menu._id === id)?.canCook === -1
    ) {
      // If the order has 0 amount and canCook is -1, remove it from the order list
      const filteredLatestOrder = updatedLatestOrder.filter(
        (item) => !(item.id === id && item.amount === 0)
      );
      setLatestOrder(filteredLatestOrder);
      window.localStorage.setItem(
        LatestOrder,
        JSON.stringify(filteredLatestOrder)
      );

      // Calculate ingredients for this menu and update the requireIngredients state
      const urlMenuComponentList = `http://localhost:3001/component/get-menu/${id}`;

      try {
        // Fetch the menu components
        const response = await axios.get(urlMenuComponentList, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        const components = response.data;

        // Calculate the updated ingredients
        const updatedIngredients = [...requireIngredients]; // Clone the array
        components.forEach((ingredient) => {
          const existingIngredientIndex = updatedIngredients.findIndex(
            (item) => item.ingredientId === ingredient.ingredientId
          );
          if (existingIngredientIndex !== -1) {
            updatedIngredients[existingIngredientIndex].amount += parseFloat(
              ingredient.ingredientAmount
            );
          }
        });

        // Update the requireIngredients state
        setRequireIngredients(updatedIngredients);

        // Log requireIngredients after updating
        //console.log("Updated requireIngredients:", updatedIngredients);
      } catch (error) {
        //console.error("Error fetching menu components:", error);
      }
    } else {
      setLatestOrder(updatedLatestOrder.filter((item) => item.amount >= 0));
      window.localStorage.setItem(
        LatestOrder,
        JSON.stringify(updatedLatestOrder.filter((item) => item.amount >= 0))
      );
      // Calculate ingredients for this menu and update the requireIngredients state
      const urlMenuComponentList = `http://localhost:3001/component/get-menu/${id}`;

      try {
        // Fetch the menu components
        const response = await axios.get(urlMenuComponentList, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        const components = response.data;

        // Calculate the updated ingredients
        const updatedIngredients = [...requireIngredients]; // Clone the array
        components.forEach((ingredient) => {
          const existingIngredientIndex = updatedIngredients.findIndex(
            (item) => item.ingredientId === ingredient.ingredientId
          );
          if (existingIngredientIndex !== -1) {
            updatedIngredients[existingIngredientIndex].amount -= parseFloat(
              ingredient.ingredientAmount
            );
          }
        });

        // Update the requireIngredients state
        setRequireIngredients(updatedIngredients);

        // Log requireIngredients after updating
        console.log("Updated requireIngredients:", updatedIngredients);
      } catch (error) {
        //console.error("Error fetching menu components:", error);
      }
    }
  };

  const updateQuantity = async (id, newAmount) => {
    if (newAmount < 0) {
      // If the new amount is less than 0, remove the order
      const updatedLatestOrder = latestOrder.filter((item) => item.id !== id);
      setLatestOrder(updatedLatestOrder);
      window.localStorage.setItem(
        LatestOrder,
        JSON.stringify(updatedLatestOrder)
      );
    } else {
      const thisMenu = latestOrder.find((item) => item.id === id);
      const canCook = await checkAbleToCookByUpdate(
        id,
        parseFloat(thisMenu.amount),
        parseFloat(newAmount)
      );
      //console.log(canCook);
      if (canCook) {
        const updatedLatestOrder = latestOrder.map((item) =>
          item.id === id ? { ...item, amount: newAmount } : item
        );
        setLatestOrder(updatedLatestOrder);
        window.localStorage.setItem(
          LatestOrder,
          JSON.stringify(updatedLatestOrder)
        );

        // Calculate ingredients for this menu and update the requireIngredients state
        const urlMenuComponentList = `http://localhost:3001/component/get-menu/${id}`;

        try {
          // Fetch the menu components
          const response = await axios.get(urlMenuComponentList, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });
          const components = response.data;

          // Calculate the updated ingredients
          const updatedIngredients = [...requireIngredients]; // Clone the array
          components.forEach((ingredient) => {
            const existingIngredientIndex = updatedIngredients.findIndex(
              (item) => item.ingredientId === ingredient.ingredientId
            );
            if (existingIngredientIndex !== -1) {
              updatedIngredients[existingIngredientIndex].amount =
                parseFloat(ingredient.ingredientAmount) * parseFloat(newAmount);
            }
          });

          // Update the requireIngredients state
          setRequireIngredients(updatedIngredients);

          // Log requireIngredients after updating
          console.log("Updated requireIngredients:", updatedIngredients);
        } catch (error) {
          //console.error("Error fetching menu components:", error);
        }
      } else {
        // NOTIFICATION
        setReachLimitMaodalOpen(true);
        const menu = menuList.find((item) => item._id === id);
        setReachLimitMenuName(menu.name);
        setReachLimitMenuAlertState(3);
      }
    }
  };

  async function checkAbleToCook(menuId, menuAmount) {
    const urlMenuComponentList = `http://localhost:3001/component/get-menu/${menuId}`;
    try {
      const response = await axios.get(urlMenuComponentList, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const components = response.data;

      let canCook = true;

      // Calculate the updated ingredients
      for (const ingredient of components) {
        const requiredIngredient = requireIngredients.find(
          (item) => item.ingredientId === ingredient.ingredientId
        );

        const availableIngredient = ingredientList.find(
          (item) => item._id === ingredient.ingredientId
        );

        //console.log(requiredIngredient, availableIngredient);

        if (!availableIngredient) {
          canCook = false;
          break;
        } else if (!requiredIngredient) {
          if (
            parseFloat(availableIngredient.amount) <
            parseFloat(ingredient.ingredientAmount)
          ) {
            canCook = false;
            break;
          }
        } else if (requiredIngredient) {
          console.log(
            parseFloat(availableIngredient.amount),
            parseFloat(requiredIngredient.amount) +
              parseFloat(parseFloat(ingredient.ingredientAmount)),
            parseFloat(availableIngredient.amount) <
              parseFloat(requiredIngredient.amount) +
                parseFloat(parseFloat(ingredient.ingredientAmount))
          );
          if (
            parseFloat(availableIngredient.amount) <
              parseFloat(requiredIngredient.amount) +
                parseFloat(parseFloat(ingredient.ingredientAmount)) &&
            ingredient.priority === "high"
          ) {
            canCook = false;
            break;
          }
        }
      }

      return canCook; // Return the final result
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function checkAbleToCookByUpdate(menuId, oldAmount, menuAmount) {
    const urlMenuComponentList = `http://localhost:3001/component/get-menu/${menuId}`;
    try {
      const response = await axios.get(urlMenuComponentList, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const components = response.data;

      let canCook = true;

      // Calculate the updated ingredients
      for (const ingredient of components) {
        const requiredIngredient = requireIngredients.find(
          (item) => item.ingredientId === ingredient.ingredientId
        );

        const availableIngredient = ingredientList.find(
          (item) => item._id === ingredient.ingredientId
        );

        console.log(requiredIngredient, availableIngredient);

        if (!availableIngredient) {
          canCook = false;
          break;
        } else if (!requiredIngredient) {
          if (
            parseFloat(availableIngredient.amount) <
            parseFloat(ingredient.ingredientAmount)
          ) {
            canCook = false;
            break;
          }
        } else if (requiredIngredient) {
          console.log(
            parseFloat(availableIngredient.amount) -
              (parseFloat(requiredIngredient.amount) -
                parseFloat(ingredient.ingredientAmount) *
                  parseFloat(oldAmount)),
            parseFloat(requiredIngredient.amount) -
              parseFloat(ingredient.ingredientAmount) * parseFloat(oldAmount),
            parseFloat(ingredient.ingredientAmount) * parseFloat(menuAmount)
          );
          if (
            parseFloat(availableIngredient.amount) -
              (parseFloat(requiredIngredient.amount) -
                parseFloat(ingredient.ingredientAmount) *
                  parseFloat(oldAmount)) <
              parseFloat(ingredient.ingredientAmount) *
                parseFloat(menuAmount) &&
            ingredient.priority === "high"
          ) {
            canCook = false;
            const MAX = Math.floor(
              (parseFloat(availableIngredient.amount) -
                (parseFloat(requiredIngredient.amount) -
                  parseFloat(ingredient.ingredientAmount) *
                    parseFloat(oldAmount))) /
                parseFloat(ingredient.ingredientAmount)
            )
            if (MAX < oldAmount) 
            {
              setReachLimitMaxAmount(
              oldAmount
                );
            }
            else
            {
              setReachLimitMaxAmount(
                MAX
                  );
            }
            break;
          }
        }
      }

      return canCook; // Return the final result
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const orderSummaryFiltered = Array.isArray(latestOrder)
    ? latestOrder.filter((order) =>
        menuList.some((menu) => menu._id === order.id)
      )
    : [];

  // Calculate the sum of quantities in the order summary list
  const sumOfQuantities = orderSummaryFiltered.reduce(
    (total, order) => total + order.amount,
    0
  );

  const navigate = useNavigate();

  async function commitOrderHandler() {
    console.log(latestOrder);
    const hasOutOfStockMainIngredients = latestOrder.some((order) => {
      const menuItem = menuList.find((menuItem) => menuItem._id === order.id);
      return menuItem && menuItem.canCook === -1;
    });

    const hasCllosedMenu = latestOrder.some((order) => {
      const menuItem = menuList.find((menuItem) => menuItem._id === order.id);
      return !menuItem;
    });

    // If any item has canCook === -1, show alert
    if (hasOutOfStockMainIngredients || hasCllosedMenu) {
      setHaveOutOfStockIngredientMenuInOrderAlertModalOpen(true);
      if (hasOutOfStockMainIngredients && hasCllosedMenu) {
        setAlertState(1);
      } else if (hasOutOfStockMainIngredients) {
        setAlertState(2);
      } else {
        setAlertState(3);
      }
      return; // Stop further execution
    }

    const urlOrderSummaryPage = `/${username}/${restaurantId}/order-summary`;
    navigate(urlOrderSummaryPage, { replace: false });
  }

  const toggleMenu = () => {
    setMenuClassName((prevClassName) =>
      prevClassName === "active" ? "inactive" : "active"
    );
    setMenuBtnClassName((prevClassName) =>
      prevClassName === "sortActive" ? "sortInactive" : "sortActive"
    );
  };

  return (
    <div id="order-handler-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <link
        href="https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin"
        rel="stylesheet"
        type="text/css"
      ></link>

      <div id="order-handler-page-header-bar">
        <UserHeaderBar username={username} restaurantId={restaurantId} />
      </div>

      <div id="order-handler-page-body">
        {alertNotEnoughModal && (
          <NotEnoughComponentAlertModal
            userID={userID}
            menuName={selectedMenuName}
            menuId={selectedMenuId}
            restaurantId={restaurantId}
            setAlertNotEnoughModal={setAlertNotEnoughModal}
          />
        )}

        {haveOutOfStockIngredientMenuInOrderAlertModalOpen && (
          <HaveOutOfStockIngredientMenuInOrderAlertModal
            alertState={alertState}
            setHaveOutOfStockIngredientMenuInOrderAlertModalOpen={
              setHaveOutOfStockIngredientMenuInOrderAlertModalOpen
            }
          />
        )}

        {deleteAllOrderModalOpen && (
          <DeleteAllOrderMadal
            restaurantId={restaurantId}
            userID={userID}
            setDeleteAllOrderModalOpen={setDeleteAllOrderModalOpen}
            setLatestOrder={setLatestOrder}
            setRequireIngredients={setRequireIngredients}
          />
        )}

        {reachLimitMaodalOpen && (
          <ReachLimitMaodal
            setReachLimitMaodalOpen={setReachLimitMaodalOpen}
            menuName={reachLimitMenuName}
            reachLimitMaxAmount={reachLimitMaxAmount}
            alertState={reachLimitMenuAlertState}
          />
        )}
        <div id="order-handler-page-side-bar-menu">
          <UserSideNavBar
            username={username}
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            restaurantImage={restaurantImage}
          />
        </div>
        <div id="order-handler-page-content-header">
          <div id="menu-pic-card-zone">
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อเมนู"
              id="menu-search-space"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />

            <div id="filter-zone">
              <button
                className={filterBtn1ClassName}
                onClick={() => {
                  if (filterBtn1ClassName === "isNotChoose") {
                    setFilterBtn1ClassName("isChoose");
                    setFilterBtn2ClassName("isNotChoose");
                    setFilterTerm(-1);
                  } else {
                    setFilterBtn1ClassName("isChoose");
                    setFilterTerm(-1);
                  }
                }}
              >
                แสดงรายการเมนูทั้งหมด
              </button>
              <button
                className={filterBtn2ClassName}
                onClick={() => {
                  if (filterBtn2ClassName === "isNotChoose") {
                    setFilterBtn1ClassName("isNotChoose");
                    setFilterBtn2ClassName("isChoose");
                    setFilterTerm(0);
                  } else {
                    setFilterBtn1ClassName("isChoose");
                    setFilterBtn2ClassName("isNotChoose");
                    setFilterTerm(-1);
                  }
                }}
              >
                แสดงเฉพาะเมนูที่ขายได้
              </button>
            </div>

            <div id="role-filter-zone">
              <button
                className={menuBtnClassName}
                id="role-filter"
                onClick={toggleMenu}
              >
                <i className="material-icons" id="staff-name-icon">
                  settings
                </i>
                การเรียงลำดับ
              </button>
              <ul className={menuClassName}>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      setSortCriteriaTerm(0);
                      setMenuBtnClassName("sortInactive");
                      setMenuClassName("inactive");
                    }}
                  >
                    <div>{sortCriteriaTerm === 0 && "⬤"}</div> วันสร้างเมนู
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      if (sortCriteriaTerm === 1) {
                        setSortCriteriaTerm(0);
                      } else {
                        setSortCriteriaTerm(1);
                      }
                      setMenuBtnClassName("sortInactive");
                      setMenuClassName("inactive");
                    }}
                  >
                    <div>{sortCriteriaTerm === 1 && "⬤"}</div> ชื่อเมนู
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div id="order-in-zone">
            <div>รายการออเดอร์</div>
            {latestOrder != null && latestOrder.length > 0 && (
              <button
                onClick={() => {
                  setDeleteAllOrderModalOpen(true);
                }}
              >
                ล้างรายการทั้งหมด
              </button>
            )}
          </div>
        </div>

        <div id="order-handler-page-content">
          <div id="order-handler-page-content-inner">
            {menuList &&
              menuList.length > 0 &&
              menuList.filter(
                (menu) =>
                  menu.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  menu.canCook >= filterTerm
              ).length === 0 && (
                <div id="order-page-no-search-results">
                  <div id="no-search-results">
                    <div id="search-off">
                      <i className="material-icons">search_off</i>
                    </div>
                    <div id="text">
                      ไม่พบเมนูที่คุณต้องการค้นหาในรายชื่อเมนูของคุณ
                    </div>
                  </div>
                </div>
              )}
            <div id="menu-list-cards">
              <div id="menu-list-cards-table">
                {menuList &&
                  menuList.length > 0 &&
                  menuList.filter(
                    (menu) =>
                      menu.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) &&
                      menu.canCook >= filterTerm
                  ).length > 0 &&
                  menuList.map(
                    (menu, index) =>
                      menu &&
                      menu.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) &&
                      menu.canCook >= filterTerm && ( // Check if restaurant is not null
                        <div id="menu-card-container" key={menu._id}>
                          <div
                            id="menu-card"
                            onClick={() => {
                              if (menu.canCook === 1) {
                                addToOrderSummary(menu._id, menu.name, 1);
                              } else if (menu.canCook === 0) {
                                setSelectedMenuId(menu._id);
                                setSelectedMenuName(menu.name);
                                setAlertNotEnoughModal(true);
                              }
                            }}
                            style={{
                              position: "relative",
                            }}
                          >
                            <div
                              id="menu-card-pic"
                              style={{
                                backgroundImage: `url(${menu.image})`,
                                backgroundSize: "Cover",
                              }}
                            >
                              {/* Display the quantity of this menu item in the order summary */}
                              {latestOrder != null &&
                                latestOrder.map((item) => {
                                  if (
                                    item.id === menu._id &&
                                    menuList.find(
                                      (menuItem) => menuItem._id === item.id
                                    )?.canCook !== -1 &&
                                    item.amount > 0
                                  ) {
                                    return (
                                      <div id="amount-shown-box" key={item.id}>
                                        <div>{item.amount}</div>
                                      </div>
                                    );
                                  }
                                  return null;
                                })}
                            </div>
                            <div id="menu-card-content">
                              <div id="menu-card-name">{menu.name}</div>
                            </div>
                            {menu.canCook === -1 && (
                              <div
                                className="menu-card-overlay"
                                style={{
                                  position: "absolute",
                                  display: "flex",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  backgroundColor: "rgba(0,0,0,0.4)",
                                }}
                              >
                                <div id="mainMenu-out">วัตถุดิบหลักหมด</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>

          <div id="order-summary-zone">
            <div id="order-summary-list-box">
              {latestOrder != null &&
                latestOrder.map((order, index) => (
                  <div
                    id="a-order-block"
                    key={index}
                    style={{
                      backgroundColor:
                        menuList.find((item) => item._id === order.id)
                          ?.canCook === -1 ||
                        !menuList.find((item) => item._id === order.id)
                          ? "#ffe6e6"
                          : "inherit",
                    }}
                  >
                    <div id="a-order-block-menu-name">{order.name}</div>
                    <div id="a-order-block-menu-amount">
                      {order.amount > 0 &&
                      menuList.find(
                        (menu) => menu._id === order.id && menu.canCook !== -1
                      ) ? (
                        <div id="a-order-block-menu-amount-editor">
                          {/* Increase and Decrease buttons for adjusting quantity */}
                          <button
                            className="value-button"
                            onClick={() => decreaseQuantity(order.id)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={order.amount}
                            onChange={(e) =>
                              e.target.value === ""
                                ? updateQuantity(order.id, 0)
                                : updateQuantity(
                                    order.id,
                                    parseInt(e.target.value)
                                  )
                            }
                          />
                          <button
                            className="value-button"
                            onClick={() => increaseQuantity(order.id)}
                          >
                            +
                          </button>
                        </div>
                      ) : menuList.find((menu) => menu._id === order.id) ? (
                        <div id="choice-remove-menu-form-order">
                          {menuList.find((item) => item._id === order.id)
                            ?.canCook !== -1 ? (
                            <button
                              className="cancel-remove-button"
                              onClick={() => updateQuantity(order.id, 1)}
                            >
                              ยกเลิก
                            </button>
                          ) : (
                            <button
                              className="cancel-remove-button"
                              style={{
                                backgroundColor: "transparent",
                                color: "#990000",
                                textWrap: "nowrap",
                                width: "fit-content",
                                marginRight: "20%",
                                marginLeft: "-90%",
                                cursor: "default",
                              }}
                            >
                              วัตถุดิบหลักหมด , กรุณาลบเมนูนี้ออกจากออเดอร์
                            </button>
                          )}
                          <button
                            className="remove-button"
                            onClick={() => updateQuantity(order.id, -1)}
                          >
                            ลบเมนู
                          </button>
                        </div>
                      ) : (
                        <div id="choice-remove-menu-form-order">
                          {
                            <button
                              className="cancel-remove-button"
                              style={{
                                backgroundColor: "transparent",
                                color: "#990000",
                                textWrap: "nowrap",
                                width: "fit-content",
                                marginRight: "35%",
                                marginLeft: "-90%",
                                cursor: "default",
                              }}
                            >
                              ปิดการขาย , กรุณาลบเมนูนี้ออกจากออเดอร์
                            </button>
                          }
                          <button
                            className="remove-button"
                            onClick={() => updateQuantity(order.id, -1)}
                          >
                            ลบเมนู
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div
              id="commit-order-btn"
              style={{
                display:
                  latestOrder != null && latestOrder.length === 0
                    ? "none"
                    : "flex",
              }}
            >
              <button onClick={commitOrderHandler}>สรุปออเดอร์</button>
            </div>
          </div>
        </div>

        <div
          id="commit-order-btn-small-media"
          style={{
            display:
              latestOrder != null && latestOrder.length === 0 ? "none" : "flex",
          }}
        >
          <button onClick={commitOrderHandler}>
            <div id="total-quantity">
              <div id="sumOfQuantities">{sumOfQuantities}</div>
              <div id="sumOfQuantities-text">รายการในออเดอร์นี้</div>
            </div>
            <div id="gt">&gt;</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderHandlerPage;
