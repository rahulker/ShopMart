import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import InputAndData from "../Custom/InputAndData";
import Button from "../Custom/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleUserExites } from "../../constant/userExites";
let fnData;
const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.isLogin);
  const [userData, setUserData] = useState({
    emailData: "",
    passData: "",
    isPassCorrect: false,
    isEmailCorrect: false,
  });
  useEffect(() => {
    if (isLogin === true) {
      navigate("/");
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    setUserData((state) => ({
      ...state,
      isEmailCorrect: false,
      isPassCorrect: false,
    }));
    if (userData.emailData.trim() === "" && userData.passData.trim() === "") {
      setUserData((state) => ({
        ...state,
        isPassCorrect: true,
        isEmailCorrect: true,
      }));
      return;
    }
    if (!userData.emailData.includes("@") && userData.passData.length < 8) {
      setUserData((state) => ({
        ...state,
        isPassCorrect: true,
        isEmailCorrect: true,
      }));
      return;
    }
    if (userData.passData.length < 8 || userData.passData.trim() === "") {
      setUserData((state) => ({
        ...state,
        isPassCorrect: true,
      }));
      return;
    }
    if (!userData.emailData.includes("@") || userData.emailData.trim() === "") {
      setUserData((state) => ({
        ...state,
        isEmailCorrect: true,
      }));
      return;
    }
    const newUserdata = {
      email: userData.emailData,
      pass: userData.passData,
    };
    fnData = handleUserExites("login", newUserdata, dispatch, navigate);
    fnData.then((res) => {
      if (res !== undefined && res === true) {
        setUserData((state) => ({ ...state, isEmailCorrect: true }));
      }
    });
  }
  return (
    <section className="flex flex-col items-center  mt-10 lg:mx-[50px] mx-[20px]">
      <div className="flex flex-col items-center">
        <RxAvatar size={60} />
        <div className="mt-1.5 sm:mt-2 md:mt-3">
          <h2 className="font-semibold xl:text-4xl text-lg sm:text-xl md:text-2xl text-center">
            Welcome back to Shop Mart
          </h2>
          <p className="font-normal sm:text-lg text-base md:text-xl xl:text-2xl text-center mt-1 xl:mt-2">
            To continue please log in
          </p>
        </div>
      </div>
      <div className="mt-5 lg:min-w-[300px]">
        <form onSubmit={handleSubmit}>
          <InputAndData
            label="Email"
            name="Email"
            type="text"
            className={`p-2 ${
              userData.isEmailCorrect ? "border-red-300" : "border-black"
            }  border mt-1 w-full rounded-md`}
            placeholder="Enter your email"
            onChange={(e) =>
              setUserData((state) => ({ ...state, emailData: e.target.value }))
            }
          />
          {userData.isEmailCorrect && (
            <p className="text-red-300 mt-1.5">
              {userData.emailData.length == 0
                ? "please enter email"
                : fnData
                ? "Email not found, place create account"
                : "Please enter correct email"}
            </p>
          )}
          <InputAndData
            classData="mt-4"
            label="Password"
            name="Password"
            type="password"
            isPassword={true}
            classDataName="relative"
            className={`p-2 ${
              userData.isPassCorrect ? "border-red-300" : "border-black"
            } border mt-1 w-full rounded-md`}
            placeholder="Enter your password"
            onChange={(e) =>
              setUserData((state) => ({ ...state, passData: e.target.value }))
            }
          />
          {userData.isPassCorrect && (
            <p className="text-red-300 mt-1.5">
              {userData.passData.length == 0
                ? "please enter password"
                : "password atleast 8 chanracter long"}
            </p>
          )}
          <Button
            className="mt-5 w-full border-black "
            text="Log In"
            type="submit"
          />
        </form>
        <div className="mt-4 text-center">
          <p>
            <span> Don{"'"}t have an account?</span>{" "}
            <Link className="underline" to="/signin">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
