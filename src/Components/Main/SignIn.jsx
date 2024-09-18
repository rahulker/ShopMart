import { RxAvatar } from "react-icons/rx";
import InputAndData from "../Custom/InputAndData";
import Button from "../Custom/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { handleSendData } from "../../constant/http";
import { handleLogin } from "../../Store/Store";

const SignIn = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const stateData = useSelector((state) => state.userData.userAlreadyExists);
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
      newUserDetail.email.replace(/^[ ]+/g, "") === "" ||
      newUserDetail.name.replace(/^[ ]+/g, "") === "" ||
      newUserDetail.password.replace(/^[ ]+/g, "") === "" ||
      newUserDetail.cPassword.replace(/^[ ]+/g, "") === ""
    ) {
      setNewUserDetail((state) => ({
        ...state,
        isEmailCorrect: true,
        isPassCorrect: true,
        isCPassCorrect: true,
      }));
      return;
    }

    if (
      !newUserDetail.email.includes("@") &&
      newUserDetail.password.length < 8 &&
      !newUserDetail.cPassword === newUserDetail.password
    ) {
      setNewUserDetail((state) => ({
        ...state,
        isCPassCorrect: true,
        isEmailCorrect: true,
        isPassCorrect: true,
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
    const newUserdata = {
      id: Math.ceil(Math.random() * 10000),
      email: newUserDetail.email,
      name: newUserDetail.name,
      pass: newUserDetail.password,
    };
    if (!stateData) {
      handleSendData(newUserdata);
      dispacth(handleLogin());
      navigate("/");
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
              ? "place try to log in"
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
    </div>
  );
};

export default SignIn;
