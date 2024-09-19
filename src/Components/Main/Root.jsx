import { Outlet } from "react-router";
import NavBar from "../Custom/NavBar";
import Footer from "../Custom/Footer";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { createPortal } from "react-dom";
const Root = () => {
  const showModal = useSelector((state) => state.showModal);
  return (
    <>
      {showModal && createPortal(<Modal />, document.getElementById("modal"))}
      <NavBar />
      <div className="mx-[50px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Root;
