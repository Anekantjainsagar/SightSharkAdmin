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
          <h1 className="text-5xl font-semibold">Welcome Back</h1>
          <p className="text-xl my-2">Login into your account</p>
          <div className="w-11/12 mt-3">
            <input
              type="email"
              name="email"
              className="text-black text-lg w-full px-5 py-3 outline-none rounded-md my-5"
              placeholder="Email"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                className="text-black text-lg w-full px-5 py-3 outline-none rounded-md"
                placeholder="Password"
                value={user?.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
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
            <button
              onClick={() => {
                if (!user?.email || !user?.password) {
                  toast.error("Please enter the details");
                } else {
                  axios
                    .post(`${BACKEND_URI}/login/login`, { ...user })
                    .then((res) => {
                      Cookies.set("token", res.data);
                      history.push("/overview");
                      checkToken();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }}
              className="w-full py-3 rounded-md my-5 border border-white hover:border-transparent hover:bg-white hover:text-black transition-all"
            >
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
