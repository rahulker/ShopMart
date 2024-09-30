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
  handleSetLocalUser,
} from "../../Store/Store";
const Root = () => {
  const showModal = useSelector((state) => state.showModal);
  const dispatch = useDispatch();
  useEffect(() => {
    function handleGetCurrentUser() {
      const storeUserData = localStorage.getItem("currentUser");
      const storeCartData = localStorage.getItem("userCartData");
      if (storeUserData === null || storeCartData === null) {
        console.log("hello world");
        return;
      } else {
        dispatch(handleLogin());
        dispatch(handleSetLocalUser(storeUserData));
        const cartData = JSON.parse(storeCartData);
        dispatch(handleSetLocalCart(cartData));
      }
    }
    handleGetCurrentUser();
  }, [dispatch]);
  return (
    <>
      {showModal && createPortal(<Modal />, document.getElementById("modal"))}
      <NavBar />
      <div className="lg:mx-[50px] mx-[20px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Root;
