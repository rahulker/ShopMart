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
      <div className="lg:mx-[50px] mx-[20px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Root;
