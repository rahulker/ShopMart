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
    password: "",
    cPassword: "",
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
      newUserDetail.email.trim() === "" ||
      newUserDetail.name.trim() === "" ||
      newUserDetail.password.trim() === "" ||
      newUserDetail.cPassword.trim() === ""
    ) {
      setNewUserDetail((state) => ({
        ...state,
        isEmailCorrect: true,
        isPassCorrect: true,
        isCPassCorrect: true,
      }));
      return;
    }
    if (newUserDetail.cPassword !== newUserDetail.password) {
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
    if (newUserDetail.password.length < 8) {
      setNewUserDetail((state) => ({
        ...state,
        isPassCorrect: true,
      }));
      return;
    }
    newUserdata = {
      id: Math.ceil(Math.random() * 10000),
      email: newUserDetail.email,
      name: newUserDetail.name,
      pass: newUserDetail.password,
    };
    stateData = handleUserExites("signin", newUserdata, dispatch, navigate);
    if (stateData) {
      setNewUserDetail((state) => ({ ...state, isEmailCorrect: true }));
    }
  }
  return (
    <div className="mt-10 flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-center">
        <RxAvatar size={60} />
        <div className="text-center">
          <h2 className="text-4xl mt-3 font-semibold">Welcome to Shop Mart</h2>
          <p className="text-xl mt-2">Sign In to create a account</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 min-w-80">
        <InputAndData
          label="Name"
          name="name"
          type="text"
          className="p-2 border-black border mt-1 w-full rounded-md"
          placeholder="Enter your name"
          classData="-mt-0.5"
          onChange={(e) => handleInput("name", e)}
        />
        {newUserDetail.isEmailCorrect && (
          <p className="text-red-300 mt-1">
            {newUserDetail.name.length == 0 && "please enter name"}
          </p>
        )}
        <InputAndData
          label="Email"
          name="email"
          type="email"
          className="p-2 border-black border mt-1 w-full rounded-md"
          placeholder="Enter your email"
          classData="mt-2.5"
          onChange={(e) => handleInput("email", e)}
        />
        {newUserDetail.isEmailCorrect && (
          <p className="text-red-300 mt-1">
            {newUserDetail.email.length == 0
              ? "please enter email"
              : stateData
              ? "Email already in use, place try to log in"
              : "Please enter correct email"}
          </p>
        )}
        <InputAndData
          label="Password"
          name="password"
          type="password"
          isPassword
          className="p-2 border-black border mt-1 w-full rounded-md"
          placeholder="Enter your password"
          classData="mt-2.5 relative"
          onChange={(e) => handleInput("password", e)}
        />
        {newUserDetail.isPassCorrect && (
          <p className="text-red-300 mt-1">
            {newUserDetail.password.length === 0
              ? "please enter password"
              : "Please atleast 8 chanracter long"}
          </p>
        )}
        <InputAndData
          label="Conform password"
          name="Cpassword"
          type="password"
          isPassword
          className="p-2 border-black border mt-1 w-full rounded-md"
          placeholder="Enter password again"
          classData="mt-2.5 relative"
          onChange={(e) => handleInput("cPassword", e)}
        />
        {newUserDetail.isCPassCorrect && (
          <p className="text-red-300 mt-1">
            {newUserDetail.isCPassCorrect.length === 0
              ? "please Conform your password"
              : "Please enter same password as before"}
          </p>
        )}
        <Button className="w-full mt-5" text="Sign In" />
      </form>
      <p className="mt-5">
        Already Have an Account?,{" "}
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
