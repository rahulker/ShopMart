import React from "react";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { links } from "../../constant/data";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";

const NavBar = () => {
  const data = useSelector((state) => state.isLogin);
  const totalItemsInCart = useSelector((state) => state.totalItemsInCart);
  const normalClass =
    "font-light text-base text-sm hover:font-semibold transition-all";
  const activeCss = "font-semibold text-sm";
  return (
    <nav className="md:p-4 md:py-2 p-2 flex items-center justify-evenly  bg-white drop-shadow-lg  ">
      <NavLink className="flex items-center gap-1" to="/">
        <CiShoppingCart size={50} />
        <div className="flex flex-col items-start ">
          <h2 className="text-2xl font-medium">Shop</h2>
          <p className="text-xl -mt-1">Mart</p>
        </div>
      </NavLink>
      <div className="bg-[#F0F5FF] grid grid-cols-[5%_95%] items-center gap-4 px-4  lg:min-w-[400px]">
        <CiSearch size={25} />
        <span className="border-l border-gray-300">
          <input
            type="text"
            className="bg-transparent w-full p-2 pr-0 focus:border-none placeholder:text-black"
            placeholder="Search"
          />
        </span>
      </div>
      <div className="flex items-center gap-6">
        {links.map((item) => (
          <NavLink
            className={({ isActive }) => (isActive ? activeCss : normalClass)}
            key={item.id}
            to={item.path}
          >
            {item.name}
            {item.name === "Cart" ? <>({totalItemsInCart})</> : <></>}
          </NavLink>
        ))}
      </div>
      {data ? (
        <div className="flex items-center gap-2">
          <RxAvatar size={25} />
          <div className="flex items-start flex-col">
            <p className="text-base font-medium">Welcome</p>
            <p className="text-sm font-normal -mt-1">User</p>
          </div>
        </div>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? `${activeCss} text-base` : `${normalClass} text-base`
          }
        >
          Log in
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
