import { Outlet } from "react-router";
import NavBar from "../Custom/NavBar";
import Footer from "../Custom/Footer";
const Root = () => {
  return (
    <>
      <NavBar />
      <div className="mx-[50px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Root;
