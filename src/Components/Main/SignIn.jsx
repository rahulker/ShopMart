import React from "react";
import { RxAvatar } from "react-icons/rx";

const SignIn = () => {
  return (
    <div className="mt-10 flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-center">
        <RxAvatar size={60} />
        <div className="text-center">
          <h2 className="text-4xl mt-3 font-semibold">Welcome to Shop Mart</h2>
          <p className="text-xl mt-2">Sign In to create a account</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
