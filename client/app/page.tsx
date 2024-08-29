"use client";
import React, { useContext, useEffect, useState } from "react";
import RightSide from "@/app/Components/Login/RightSide";
import LoginNav from "@/app/Components/Login/LoginNav";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BACKEND_URI } from "@/app/utils/url";
import Cookies from "js-cookie";
import Context from "./Context/Context";
import Image from "next/image";

const App = () => {
  const history = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ password: "", email: "" });
  const { checkToken } = useContext(Context);

  return (
    <div className="bg-main w-full flex items-start justify-between h-[100vh]">
      <Toaster />
      <div className="w-7/12 p-[2vw] flex flex-col items-center justify-between h-full">
        <LoginNav />
        <div className="text-white flex flex-col items-center w-7/12 px-5">
          <h1 className="text-[36px] font-semibold">Welcome Back</h1>
          <p className="mainText18 my-1">Login into your account</p>
          <div className="w-11/12 mt-3">
            <input
              type="email"
              name="email"
              className="text-white bg-[#04095180]/50 border border-[#0110F1]/60 text-lg w-full px-5 py-3 outline-none rounded-[10px] my-5"
              placeholder="Email"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                className="text-white bg-[#04095180]/50 border border-[#0110F1]/60 text-lg w-full px-5 py-3 outline-none rounded-[10px]"
                placeholder="Password"
                value={user?.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 text-white right-5 text-2xl cursor-pointer"
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
            <button
              onClick={() => {
                // if (!user?.email || !user?.password) {
                //   toast.error("Please enter the details");
                // } else {
                //   axios
                //     .post(`${BACKEND_URI}/login/login`, { ...user })
                //     .then((res) => {
                //       Cookies.set("token", res.data);
                history.push("/overview");
                //       checkToken();
                //     })
                //     .catch((err) => {
                //       console.log(err);
                //     });
                // }
              }}
              className="w-full py-3 bg-gradient-to-b from-[#605EFD] to-[#393897] rounded-[10px] my-5 mainText18"
            >
              Log In
            </button>
            <div className="flex items-center justify-between w-full my-7">
              <div className="line w-full h-[1px] bg-white/70"></div>
              <span className="px-2 whitespace-nowrap">Or continue with</span>
              <div className="line w-full h-[1px] bg-white/70"></div>
            </div>
            <div className="items-stretch grid grid-cols-2 gap-x-4">
              <button className="w-full bg-[#121136] rounded-[10px] flex items-center justify-center h-[5vh]">
                <Image
                  src="/google.svg"
                  width={1000}
                  height={1000}
                  alt="Google icon"
                  className="w-[2vw] mr-2"
                />
                <p>Sign in with Google</p>
              </button>
              <button className="w-full bg-[#121136] rounded-[10px] flex items-center justify-center h-[5vh]">
                <Image
                  src="/facebook.svg"
                  width={1000}
                  height={1000}
                  alt="Google icon"
                  className="w-[1.5vw] mr-3"
                />
                <p>Sign in with Facebook</p>
              </button>
            </div>
            <p className="mainText18 text-center my-4">
              Don't have an account?{" "}
              <span className="text-btnBlue">Sign up!</span>
            </p>
          </div>
        </div>
        <div></div>
      </div>
      <RightSide />
    </div>
  );
};

export default App;
