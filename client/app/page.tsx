"use client";
import Image from "next/image";
import React, { useState } from "react";
import RightSide from "@/app/Components/Login/RightSide";
import LoginNav from "@/app/Components/Login/LoginNav";
import { LuEye, LuEyeOff } from "react-icons/lu";

const App = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-main w-full flex items-start justify-between h-[100vh]">
      <div className="w-7/12 p-[2vw] flex flex-col items-center justify-between h-full">
        <LoginNav />
        <div className="text-white flex flex-col items-center w-7/12 px-5">
          <h1 className="text-5xl font-semibold">Welcome Back</h1>
          <p className="text-xl my-2">Login into your account</p>
          <div className="gap-x-4 my-8 flex items-center">
            <button className="bg-white flex items-center text-black px-4 py-1 rounded-md">
              <Image
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
                }
                alt="google"
                width={1000}
                height={1000}
                className="w-[2vw]"
              />
              <p className="ml-2">Google</p>
            </button>
            <button className="bg-white flex items-center text-black px-4 py-1 rounded-md">
              <Image
                src={
                  "https://source.roboflow.com/52wBQvr2J7StQoLIQ4WNRmQlEMR2/CqBUuBrjRZmnAf0ZINFw/original.jpg"
                }
                alt="google"
                width={1000}
                height={1000}
                className="w-[2vw]"
              />
              <p className="ml-2">Facebook</p>
            </button>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="h-[1px] bg-white w-full"></div>
            <p className="whitespace-nowrap px-5">Or continue with</p>
            <div className="h-[1px] bg-white w-full"></div>
          </div>
          <div className="w-11/12 mt-3">
            <input
              type="email"
              name="email"
              className="text-black text-lg w-full px-5 py-3 outline-none rounded-md my-5"
              placeholder="Email"
            />
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                className="text-black text-lg w-full px-5 py-3 outline-none rounded-md"
                placeholder="Password"
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 text-black/60 right-5 text-2xl cursor-pointer"
                onClick={(e) => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <div className="text-sm flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-1 cursor-pointer text-lg"
                />
                <label htmlFor="remember" className="cursor-pointer">
                  Remember Me
                </label>
              </div>
              <button className="text-red-600 text-sm">Recover Password</button>
            </div>
            <button className="w-full py-3 rounded-md my-5 border border-white hover:border-transparent hover:bg-white hover:text-black transition-all">
              Log In
            </button>
          </div>
        </div>
        <div></div>
      </div>
      <RightSide />
    </div>
  );
};

export default App;
