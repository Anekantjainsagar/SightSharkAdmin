"use client";
import React, { useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import SettingsLeftbar from "@/app/Components/Settings/Leftbar";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Settings = () => {
  const [showOriginalPassword, setShowOriginalPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [data, setData] = useState({
    oldPass: "",
    newPassword: "",
    reNewPassword: "",
  });

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="gradient-line-vertical"></div>
      <div className="w-[87%] px-10 mainPageBg h-full">
        <Navbar />
        <div className="bg-main border mt-3 border-gray-200/30 text-white py-5 w-full rounded-lg flex items-start h-[85vh]">
          <SettingsLeftbar />
          <div className="w-8/12 px-8 flex flex-col items-start justify-between h-full">
            <div className="w-full">
              <h4 className="mainLogoSize font-semibold">Security</h4>
              <div className="mt-5">
                <h6 className="text-[20px] font-medium">
                  Change your password
                </h6>{" "}
                <div className="grid grid-cols-1 gap-y-5 mt-4 w-full">
                  <div className="flex flex-col">
                    <label htmlFor="currentPass" className="mb-1.5 text-base">
                      Current Password
                    </label>
                    <div className="w-full relative mt-1">
                      <input
                        type={showOriginalPassword ? "text" : "password"}
                        name="Password"
                        id="currentPass"
                        className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md w-full"
                        placeholder="Your Current Password"
                        value={data?.oldPass}
                        onChange={(e) =>
                          setData({ ...data, oldPass: e.target.value })
                        }
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 text-white right-5 text-2xl cursor-pointer"
                        onClick={(e) => {
                          setShowOriginalPassword(!showOriginalPassword);
                        }}
                      >
                        {showOriginalPassword ? <LuEye /> : <LuEyeOff />}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="newPass" className="mb-1.5 text-base">
                      New Password
                    </label>
                    <div className="w-full relative mt-1">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="Password"
                        id="newPass"
                        className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md w-full"
                        placeholder="Your New Password"
                        value={data?.newPassword}
                        onChange={(e) =>
                          setData({ ...data, newPassword: e.target.value })
                        }
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 text-white right-5 text-2xl cursor-pointer"
                        onClick={(e) => {
                          setShowNewPassword(!showNewPassword);
                        }}
                      >
                        {showNewPassword ? <LuEye /> : <LuEyeOff />}
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex flex-col">
                    <label
                      htmlFor="retypeNewPassword"
                      className="mb-1.5 text-base"
                    >
                      Retype New Password
                    </label>
                    <div className="w-full relative mt-1">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="Password"
                        id="retypeNewPassword"
                        className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md w-full"
                        placeholder="Your New Password"
                        value={data?.reNewPassword}
                        onChange={(e) =>
                          setData({ ...data, reNewPassword: e.target.value })
                        }
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 text-white right-5 text-2xl cursor-pointer"
                        onClick={(e) => {
                          setShowNewPassword(!showNewPassword);
                        }}
                      >
                        {showNewPassword ? <LuEye /> : <LuEyeOff />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[1px] w-full my-10 bg-gray-600/50"></div>{" "}
              <h4 className="mainLogoSize font-semibold">
                Security preferences
              </h4>
              <p className="text-gray-500 my-1">
                Keep your account safe by setting these preferences
              </p>
              <div className="mt-5 flex items-center justify-between w-full">
                <h6 className="mainText18 text-gray-100">
                  Enable two-step authentication
                </h6>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end w-full">
              {" "}
              <button
                className={`bg-gray-800 font-semibold px-7 py-2 rounded-md ml-4`}
                onClick={() => {}}
              >
                Cancel
              </button>
              <button
                className={`bg-green-600 font-semibold px-7 py-2 rounded-md ml-4`}
                onClick={() => {}}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
