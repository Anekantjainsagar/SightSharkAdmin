"use client";
import React, { useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import AgencyDetails from "@/app/Components/Agencies/AgencyDetails";
import AgencyDetailsTopbar from "@/app/Components/Agencies/AgencyDetailsTopbar";
import { BiPencil } from "react-icons/bi";

const Overview = () => {
  const [status, setStatus] = useState("Active");
  const [comment, setComment] = useState("");
  const [data, setData] = useState({
    name: "",
    profile: "",
    website: "",
    location: "",
    warrenty: "",
    deployment: "",
    license: "",
    keyContact: {
      name: "",
      profile: "",
      designation: "",
      email: "",
      phone: "",
    },
    dataSources: [],
  });
  const fileInputRef = React.useRef(null);
  const fileInputRefAgent = React.useRef(null);

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const handleFileChangeAgent = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="gradient-line-vertical"></div>
      <div className="w-[87%] px-10 mainPageBg h-full">
        <Navbar />
        <div className="flex items-start justify-between mt-3 text-white bg-main p-3">
          <AgencyDetails />
          <div className="w-[69%]">
            <AgencyDetailsTopbar />
            <div className="border border-gray-200/30 w-full rounded-lg px-6 py-4">
              <h4 className="text-xl">Agency Details</h4>
              <div className="flex items-start justify-between mt-8">
                <div className="flex items-center justify-center w-3/12">
                  <div className="relative w-6/12 flex items-center justify-center">
                    <div
                      onClick={() => {
                        fileInputRef.current.click();
                      }}
                      className="absolute bg-newPurple text-2xl py-2 px-2 -bottom-1 cursor-pointer -right-1 rounded-full"
                    >
                      <BiPencil />
                    </div>{" "}
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChangeProfile}
                    />
                    <Image
                      src={
                        data?.profile
                          ? data?.profile
                          : "/Agency/individual/logo.png"
                      }
                      alt="Agency Img"
                      width={1000}
                      height={1000}
                      className="rounded-full border border-gray-300/30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-[70%]">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="mb-1.5">
                      Agency Name
                    </label>
                    <input
                      id="name"
                      value={data?.name}
                      onChange={(e) => {
                        setData({ ...data, name: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Agency Name"
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="website" className="mb-1.5">
                      Website
                    </label>
                    <input
                      id="website"
                      value={data?.website}
                      onChange={(e) => {
                        setData({ ...data, website: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Website"
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="location" className="mb-1.5">
                      Location
                    </label>
                    <input
                      id="location"
                      value={data?.location}
                      onChange={(e) => {
                        setData({ ...data, location: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Location"
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="warrenty" className="mb-1.5">
                      Warrenty Period
                    </label>
                    <input
                      id="warrenty"
                      value={data?.warrenty}
                      onChange={(e) => {
                        setData({ ...data, warrenty: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Warrenty Period"
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="deployment" className="mb-1.5">
                      Deployment Date
                    </label>
                    <input
                      id="deployment"
                      value={data?.deployment}
                      onChange={(e) => {
                        setData({ ...data, deployment: e.target.value });
                      }}
                      type="date"
                      placeholder="Enter deployment Period"
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="license" className="mb-1.5">
                      License Limit
                    </label>
                    <input
                      id="license"
                      value={data?.license}
                      onChange={(e) => {
                        setData({ ...data, license: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter License Limit"
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                    />
                  </div>{" "}
                  <div className="flex flex-col">
                    <label htmlFor="status" className="mb-1.5">
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {["Active", "Offline", "On Hold"].map((e, i) => {
                        return (
                          <option value={e} key={i} className="bg-main">
                            {e}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="comment" className="mb-1.5">
                      Comment
                    </label>
                    <input
                      id="comment"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Comment"
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <h4 className="text-xl mt-10">Key Contact Information</h4>
              <div className="flex items-start justify-between mt-8">
                <div className="flex items-center justify-center w-3/12">
                  <div className="relative w-6/12 flex items-center justify-center">
                    <div
                      onClick={() => {
                        fileInputRefAgent.current.click();
                      }}
                      className="absolute bg-newPurple text-2xl py-2 px-2 -bottom-1 cursor-pointer -right-1 rounded-full"
                    >
                      <BiPencil />
                    </div>{" "}
                    <input
                      type="file"
                      ref={fileInputRefAgent}
                      style={{ display: "none" }}
                      onChange={handleFileChangeAgent}
                    />
                    <Image
                      src={
                        data?.keyContact?.profile
                          ? data?.keyContact?.profile
                          : "/agency/individual/agent.png"
                      }
                      alt="Agency Img"
                      width={1000}
                      height={1000}
                      className="rounded-full border border-gray-300/30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-[70%]">
                  <div className="flex flex-col">
                    <label htmlFor="namekey" className="mb-1.5">
                      Name
                    </label>
                    <input
                      id="namekey"
                      value={data?.keyContact?.name}
                      onChange={(e) => {
                        setData({
                          ...data,
                          keyContact: {
                            ...data?.keyContact,
                            name: e.target.value,
                          },
                        });
                      }}
                      type="text"
                      placeholder="Enter Name"
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="designation" className="mb-1.5">
                      Designation
                    </label>
                    <input
                      id="designation"
                      value={data?.keyContact?.designation}
                      onChange={(e) => {
                        setData({
                          ...data,
                          keyContact: {
                            ...data?.keyContact,
                            designation: e.target.value,
                          },
                        });
                      }}
                      type="text"
                      placeholder="Enter Designation"
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="email"
                      value={data?.keyContact?.email}
                      onChange={(e) => {
                        setData({
                          ...data,
                          keyContact: {
                            ...data?.keyContact,
                            email: e.target.value,
                          },
                        });
                      }}
                      type="email"
                      placeholder="Enter Email Address"
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-1.5">
                      Phone no.
                    </label>
                    <input
                      id="phone"
                      value={data?.keyContact?.phone}
                      onChange={(e) => {
                        setData({
                          ...data,
                          keyContact: {
                            ...data?.keyContact,
                            phone: e.target.value,
                          },
                        });
                      }}
                      type="number"
                      placeholder="Enter Phone no."
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
