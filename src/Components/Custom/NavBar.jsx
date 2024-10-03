import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { links } from "../../constant/data";
import { useDispatch, useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import { handleLogOut, handleShowModal } from "../../Store/Store";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";
const NavBar = () => {
  const data = useSelector((state) => state.isLogin);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const totalItemsInCart = useSelector((state) => state.totalItemsInCart);
  const [menu, setMenu] = useState(false);
  const normalClass =
    "font-light text-base text-sm hover:font-semibold transition-all ";
  const activeCss = "font-semibold text-sm";
  const menuStyle =
    "absolute flex flex-col items-center min-w-72 drop-shadow-lg  gap-4 h-screen bg-white px-6 transition-all pt-4 z-[100] lg:hidden";
  function handleLogOutUser() {
    dispacth(handleLogOut());
    navigate("/");
  }
  return (
    <>
      <nav className="md:p-4 hidden md:py-2 p-2 lg:flex items-center justify-evenly  bg-white drop-shadow-lg ">
        <NavLink className="flex items-center gap-1" to="/">
          <CiShoppingCart size={50} />
          <div className="flex flex-col items-start ">
            <h2 className="text-2xl font-medium">Shop</h2>
            <p className="text-xl -mt-1">Mart</p>
          </div>
        </NavLink>
        <div className="bg-[#F0F5FF] grid grid-cols-[5%_95%] items-center gap-4 px-4  lg:min-w-[400px]">
          <CiSearch size={25} />
          <span
            className="border-l border-gray-300"
            onClick={() => dispacth(handleShowModal())}
          >
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
              onClick={window.scrollTo(0, 0)}
            >
              {item.name}
              {item.name === "Cart" ? <>({totalItemsInCart})</> : <></>}
            </NavLink>
          ))}
        </div>
        {data ? (
          <div className="flex items-center gap-5">
            <NavLink to="/user" className="flex items-center gap-2">
              <RxAvatar size={25} />
            </NavLink>
            <button className="hover:font-semibold" onClick={handleLogOutUser}>
              Log out
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            onClick={window.scrollTo(0, 0)}
            className={({ isActive }) =>
              isActive
                ? `${activeCss} text-base`
                : `${normalClass} text-base hover:font-semibold`
            }
          >
            Log in
          </NavLink>
        )}
      </nav>
      <nav className="md:p-4 md:py-2 p-2 lg:hidden flex relative items-center justify-between  bg-white drop-shadow-lg  ">
        <NavLink className="flex items-center gap-1" to="/">
          <CiShoppingCart size={50} />
          <div className="flex flex-col items-start ">
            <h2 className="md:text-2xl text-xl font-medium">Shop</h2>
            <p className="md:text-xl text-lg -mt-1">Mart</p>
          </div>
        </NavLink>
        <div className="flex items-center gap-4">
          <CiSearch
            size={25}
            onClick={() => dispacth(handleShowModal())}
            className="cursor-pointer"
          />
          {menu ? (
            <HiMiniXMark
              size={25}
              onClick={() => setMenu((pre) => !pre)}
              className="cursor-pointer"
            />
          ) : (
            <RxHamburgerMenu
              size={25}
              onClick={() => setMenu((pre) => !pre)}
              className="cursor-pointer"
            />
          )}
        </div>
      </nav>
      <div className={menu ? menuStyle : menuStyle + " translate-x-[-100%]"}>
        <div className="flex flex-col gap-4">
          {links.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? activeCss : normalClass)}
              key={item.id}
              to={item.path}
              onClick={() => {
                window.scrollTo(0, 0);
                setMenu(false);
              }}
            >
              {item.name}
              {item.name === "Cart" ? <>({totalItemsInCart})</> : <></>}
            </NavLink>
          ))}
        </div>
        {data ? (
          <div className="flex flex-col items-center gap-5">
            <button className="hover:font-semibold" onClick={handleLogOutUser}>
              Log out
            </button>
            <NavLink to="/user" className="flex items-center gap-2">
              <RxAvatar size={25} />
            </NavLink>
          </div>
        ) : (
          <NavLink
            to="/login"
            onClick={window.scrollTo(0, 0)}
            className={({ isActive }) =>
              isActive
                ? `${activeCss} text-base`
                : `${normalClass} hover:font-semibold text-base`
            }
          >
            Log in
          </NavLink>
        )}
      </div>
    </>
  );
};

export default NavBar;
