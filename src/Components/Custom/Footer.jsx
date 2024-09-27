import { links } from "../../constant/data";
import { CiShoppingCart } from "react-icons/ci";
import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="bg-black  text-white py-4 mt-10">
      <div className="container mx-auto px-0">
        <div className="flex flex-col md:flex-row md:justify-between px-[20px] lg:px-[50px]">
          <div className="mb-6 md:mb-0">
            <NavLink className="flex items-center gap-1" to="/">
              <CiShoppingCart size={50} />
              <div className="flex flex-col items-start ">
                <h2 className="text-2xl font-medium">Shop</h2>
                <p className="text-xl -mt-1">Mart</p>
              </div>
            </NavLink>
            <p className="text-gray-400">
              1234 Street Address
              <br />
              City, State, 56789
            </p>
          </div>

          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Navigation</h3>
            <ul className="space-y-1">
              {links.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    onClick={window.scrollTo(0, 0)}
                    className="hover:text-gray-400 transition-all"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white transition-all hover:text-gray-300"
              >
                <FaFacebookSquare className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-white transition-all hover:text-gray-300"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-white transition-all hover:text-gray-300"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-white transition-all hover:text-gray-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm">
            © {year} Shop Mart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
