import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import InputAndData from "../Custom/InputAndData";
import Button from "../Custom/Button";
import { Link } from "react-router-dom";
const LogIn = () => {
  const [userData, setUserData] = useState({
    emailData: "",
    passData: "",
    isPassCorrect: false,
    isEmailCorrect: false,
  });
  function handleSubmit(e) {
    e.preventDefault();
    setUserData((state) => ({
      ...state,
      isEmailCorrect: false,
      isPassCorrect: false,
    }));
    console.log(userData);
    if (
      userData.emailData.replace(/^[ ]+/g, "") === "" ||
      userData.passData.replace(/^[ ]+/g, "") === ""
    ) {
      setUserData((state) => ({
        ...state,
        isPassCorrect: !state.isPassCorrect,
        isEmailCorrect: !state.isEmailCorrect,
      }));
      return;
    }
    if (!userData.emailData.includes("@") && userData.passData.length < 8) {
      setUserData((state) => ({
        ...state,
        isPassCorrect: !state.isPassCorrect,
        isEmailCorrect: !state.isEmailCorrect,
      }));
      return;
    }
    if (userData.passData.length < 8) {
      console.log("hello");

      setUserData((state) => ({
        ...state,
        isPassCorrect: !state.isPassCorrect,
      }));
      return;
    }
    if (!userData.emailData.includes("@")) {
      setUserData((state) => ({
        ...state,
        isEmailCorrect: !state.isEmailCorrect,
      }));
      return;
    }
  }
  return (
    <section className="flex flex-col items-center  mt-10">
      <div className="flex flex-col items-center">
        <RxAvatar size={60} />
        <div className="mt-3">
          <h2 className="font-semibold text-4xl">Welcome back to Shop Mart</h2>
          <p className="font-normal tetx-2xl text-center mt-2">
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
            className="p-2 border-black border mt-1 w-full rounded-md"
            placeholder="Enter your email"
            onChange={(e) =>
              setUserData((state) => ({ ...state, emailData: e.target.value }))
            }
          />
          {userData.isEmailCorrect && (
            <p className="text-red-300 mt-1.5">
              {userData.emailData.length == 0
                ? "please enter email"
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
            className="p-2 border-black border mt-1 w-full rounded-md "
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
