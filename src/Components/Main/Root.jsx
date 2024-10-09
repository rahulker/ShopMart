import { Outlet } from "react-router";
import NavBar from "../Custom/NavBar";
import Footer from "../Custom/Footer";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import {
  handleLogin,
  handleSetLocalCart,
  handleSetLocalCount,
  handleSetLocalUser,
} from "../../Store/Store";
import Alert from "../Custom/Alert";
const Root = () => {
  const showModal = useSelector((state) => state.showModal);
  const dispatch = useDispatch();
  useEffect(() => {
    function handleGetCurrentUser() {
      const storeUserData = localStorage.getItem("CurrentUserData");
      const storeCartData = localStorage.getItem("userCartData");
      const storeTotalCount = localStorage.getItem("totalCount");
      if (
        storeUserData === null &&
        storeCartData === null &&
        (storeTotalCount === null || JSON.parse(storeTotalCount) == 0)
      ) {
        return;
      } else {
        if (storeUserData === null) {
          const cartData = JSON.parse(storeCartData);
          const totalCount = JSON.parse(storeTotalCount);
          dispatch(handleSetLocalCart(cartData));
          dispatch(handleSetLocalCount(totalCount));
          return;
        } else if (
          storeUserData.length > 0 &&
          storeCartData === null &&
          (storeTotalCount === null || JSON.parse(storeTotalCount) == 0)
        ) {
          dispatch(handleLogin());
          const localUser = JSON.parse(storeUserData);
          dispatch(handleSetLocalUser(localUser));

          return;
        } else {
          dispatch(handleLogin());
          const localUser = JSON.parse(storeUserData);
          const totalCount = JSON.parse(storeTotalCount);
          const cartData = JSON.parse(storeCartData);
          dispatch(handleSetLocalCount(totalCount));
          dispatch(handleSetLocalUser(localUser));
          dispatch(handleSetLocalCart(cartData));
          return;
        }
      }
    }
    handleGetCurrentUser();
  });

  return (
    <>
      {showModal && createPortal(<Modal />, document.getElementById("modal"))}
      <NavBar />
      <Alert />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Root;
