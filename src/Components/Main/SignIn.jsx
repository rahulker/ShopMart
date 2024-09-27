import { RxAvatar } from "react-icons/rx";
import InputAndData from "../Custom/InputAndData";
import Button from "../Custom/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { handleUserExites } from "../../constant/userExites";
import { NavLink } from "react-router-dom";
let newUserdata;
let stateData;
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newUserDetail, setNewUserDetail] = useState({
    name: "",
    email: "",
    phoneNum: "",
    password: "",
    cPassword: "",
    address: "",
    isPhoneNumCorrect: false,
    isEmailCorrect: false,
    isPassCorrect: false,
    isCPassCorrect: false,
  });
  function handleInput(id, e) {
    setNewUserDetail((state) => ({ ...state, [id]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setNewUserDetail((state) => ({
      ...state,
      isEmailCorrect: false,
      isPassCorrect: false,
      isCPassCorrect: false,
    }));
    if (
      newUserDetail.email.trim() === "" &&
      newUserDetail.name.trim() === "" &&
      newUserDetail.password.trim() === "" &&
      newUserDetail.cPassword.trim() === "" &&
      newUserDetail.phoneNum.trim() === ""
    ) {
      setNewUserDetail((state) => ({
        ...state,
        isEmailCorrect: true,
        isPassCorrect: true,
        isCPassCorrect: true,
        isPhoneNumCorrect: true,
      }));
      return;
    }
    if (
      newUserDetail.cPassword !== newUserDetail.password ||
      newUserDetail.cPassword.trim() === ""
    ) {
      setNewUserDetail((state) => ({
        ...state,
        isCPassCorrect: true,
      }));
      return;
    }
    if (!newUserDetail.email.includes("@")) {
      setNewUserDetail((state) => ({
        ...state,
        isEmailCorrect: true,
      }));
      return;
    }
    if (
      newUserDetail.password.length < 8 ||
      newUserDetail.password.trim() === ""
    ) {
      setNewUserDetail((state) => ({
        ...state,
        isPassCorrect: true,
      }));
      return;
    }
    if (
      newUserDetail.phoneNum.length <= 9 ||
      !newUserDetail.phoneNum.trim() === ""
    ) {
      setNewUserDetail((state) => ({
        ...state,
        isPhoneNumCorrect: true,
      }));
      return;
    }
    newUserdata = {
      id: Math.ceil(Math.random() * 10000),
      email: newUserDetail.email,
      name: newUserDetail.name,
      pass: newUserDetail.password,
      phoneNum: newUserDetail.phoneNum,
      address: newUserDetail.address,
    };
    stateData = handleUserExites("signin", newUserdata, dispatch, navigate);
    if (stateData.then((res) => res === true)) {
      setNewUserDetail((state) => ({ ...state, isEmailCorrect: true }));
    }
  }
  return (
    <div className="xl:mt-10 lg:mt-8 mt-2 sm:mt-4 md:mt-6 flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-center">
        <RxAvatar size={60} />
        <div className="text-center">
          <h2 className="font-semibold xl:text-4xl text-lg sm:text-xl md:text-2xl text-center">
            Welcome to Shop Mart
          </h2>
          <p className="font-normal sm:text-lg text-base md:text-xl xl:text-2xl text-center mt-1 xl:mt-2">
            Sign In to create a account
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 sm:!w-[500px] w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          <div>
            <InputAndData
              label="Name"
              name="name"
              type="text"
              className="p-2 border-black border mt-1 w-full rounded-md"
              placeholder="Enter your name"
              onChange={(e) => handleInput("name", e)}
            />
            {newUserDetail.isEmailCorrect && (
              <p className="text-red-300 mt-1">
                {newUserDetail.name.length == 0 && "please enter name"}
              </p>
            )}
          </div>
          <div>
            <InputAndData
              label="Email"
              name="email"
              type="email"
              className="p-2 border-black border mt-1 w-full rounded-md"
              placeholder="Enter your email"
              onChange={(e) => handleInput("email", e)}
            />
            {newUserDetail.isEmailCorrect && (
              <p className="text-red-300 mt-1">
                {newUserDetail.email.length == 0
                  ? "please enter email"
                  : stateData
                  ? "Email already in use"
                  : "Please enter correct email"}
              </p>
            )}
          </div>
        </div>
        <InputAndData
          label="Phone number"
          name="Phone number"
          type="number"
          className="p-2 border-black border appearance-none mt-1  w-full rounded-md"
          placeholder="Enter your Phone number"
          classData="mt-2.5"
          onChange={(e) => handleInput("phoneNum", e)}
        />
        {newUserDetail.isPhoneNumCorrect && (
          <p className="text-red-300 mt-1">
            {newUserDetail.phoneNum.length == 0
              ? "please enter your number"
              : newUserDetail.isPhoneNumCorrect &&
                "please enter correct phone number"}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2.5">
          <div>
            <InputAndData
              label="Password"
              name="password"
              type="password"
              isPassword
              className="p-2 border-black border mt-1 w-full rounded-md"
              placeholder="Enter your password"
              classData=" relative"
              onChange={(e) => handleInput("password", e)}
            />
            {newUserDetail.isPassCorrect && (
              <p className="text-red-300 mt-1">
                {newUserDetail.password.length === 0
                  ? "please enter password"
                  : "Please atleast 8 chanracter long"}
              </p>
            )}
          </div>
          <div>
            <InputAndData
              label="Conform password"
              name="Cpassword"
              type="password"
              isPassword
              className="p-2 border-black border mt-1 w-full rounded-md"
              placeholder="Enter password again"
              classData=" relative"
              onChange={(e) => handleInput("cPassword", e)}
            />
            {newUserDetail.isCPassCorrect && (
              <p className="text-red-300 mt-1">
                {newUserDetail.isCPassCorrect.length === 0
                  ? "please Conform your password"
                  : "enter same password "}
              </p>
            )}
          </div>
        </div>
        <div className="mt-2.5">
          <label htmlFor="Address">Address(optional)</label>
          <br />
          <textarea
            name="Address"
            onChange={(e) => handleInput("address", e)}
            id="Address"
            className="p-2 border-black border appearance-none mt-1  w-full rounded-md"
          ></textarea>
        </div>
        <Button className="w-full mt-5" text="Sign In" />
      </form>
      <p className="mt-5">
        Already Have an Account?,
        {""}
        <NavLink
          to="/login"
          className="underline"
          onClick={window.scrollTo(0, 0)}
        >
          LogIn
        </NavLink>
      </p>
    </div>
  );
};

export default SignIn;
