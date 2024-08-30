"use client";
import React, { useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import SettingsLeftbar from "@/app/Components/Settings/Leftbar";

const Settings = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    postal: "",
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
              <h4 className="mainLogoSize font-semibold">Account</h4>
              <h6 className="text-[20px] font-medium mt-5">Profile</h6>{" "}
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-4 w-full">
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="mb-1.5 text-base">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    value={data?.firstName}
                    onChange={(e) => {
                      setData({ ...data, firstName: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter First Name"
                    className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lastName" className="mb-1.5 text-base">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    value={data?.lastName}
                    onChange={(e) => {
                      setData({ ...data, lastName: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter Last Name"
                    className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-1.5 text-base">
                    Email
                  </label>
                  <input
                    id="email"
                    value={data?.email}
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                    type="email"
                    placeholder="Enter Email"
                    className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone" className="mb-1.5 text-base">
                    Phone
                  </label>
                  <input
                    id="phone"
                    value={data?.phone}
                    onChange={(e) => {
                      setData({ ...data, phone: e.target.value });
                    }}
                    type="number"
                    placeholder="Enter Phone"
                    className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                  />
                </div>{" "}
                <div className="flex flex-col">
                  <label htmlFor="country" className="mb-1.5 text-base">
                    Country
                  </label>
                  <input
                    id="country"
                    value={data?.country}
                    onChange={(e) => {
                      setData({ ...data, country: e.target.value });
                    }}
                    type="country"
                    placeholder="Enter Country"
                    className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="postal" className="mb-1.5 text-base">
                    Postal Code
                  </label>
                  <input
                    id="postal"
                    value={data?.postal}
                    onChange={(e) => {
                      setData({ ...data, postal: e.target.value });
                    }}
                    type="number"
                    placeholder="Enter Postal Code"
                    className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                  />
                </div>
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
