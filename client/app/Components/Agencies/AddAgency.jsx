"use client";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import Info from "@/app/Components/Login/Info";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import Required from "../Utils/Required";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import Context from "@/app/Context/Context";

const customStyles = {
  overlay: { zIndex: 50 },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    width: "65vw",
    border: "none",
  },
};

const AddAgency = ({ showSubscribe, setShowSubscribe }) => {
  let maxPage = 4;
  const { setAgencies, agencies } = useContext(Context);
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [page, setPage] = useState(1);
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
    serviceAcc: { acc1: "", acc2: "" },
    credentials: { email: "", password: "", cpassword: "" },
    dataSources: [],
  });
  const fileInputRef = React.useRef(null);
  const fileInputRefAgent = React.useRef(null);

  const handleSave = () => {
    if (data?.name && data?.website && data?.warrenty && data?.license) {
      let queryParams = new URLSearchParams({
        agency_name: data?.name,
        website: data?.website,
        location: data?.location,
        warranty_period: parseInt(data?.warrenty),
        deployment_date: data?.deployment,
        license_limit: data?.license,
        name: data?.keyContact?.name,
        designation: data?.keyContact?.designation,
        email_address: data?.keyContact?.email,
        phone: data?.keyContact?.phone,
        service_account_cloud: data?.serviceAcc?.acc1,
        service_account_api: data?.serviceAcc?.acc2,
      }).toString();
      try {
        fetch(`${BACKEND_URI}/agency/create?${queryParams}`, {
          headers: {
            Accept:
              "application/json, application/xml, text/plain, text/html, *.*",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          method: "POST",
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.msg) {
              toast.success("Agency created successfully");
              setShowSubscribe(false);
              setAgencies([...agencies, res.data]);
            } else if (res.detail) {
              toast.error(res.detail);
            }
          })
          .catch((err) => {
            console.error("Error creating user:", err);
            toast.error("An error occurred while creating the user");
          });
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
    } else {
      toast.error("Please fill all the required details");
    }
  };

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

  function closeModal() {
    setShowSubscribe(false);
  }

  return (
    <div className="z-50">
      <Toaster />
      <Modal
        isOpen={showSubscribe}
        onRequestCl2ose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative rounded-lg bg-main pt-10 text-white">
          <AiOutlineClose
            size={40}
            onClick={closeModal}
            className="absolute top-2 right-2 px-2 cursor-pointer"
          />
          <div className="mb-10">
            <div className="flex items-center px-[8vw]">
              <div className="bg-newBlue w-[8vw] aspect-square rounded-full flex items-center justify-center text-[20px]">
                {page > 1 ? <IoMdCheckmark /> : "1"}
              </div>
              <div
                className={`line h-[1px] w-full ${
                  page >= 2 ? "bg-newBlue" : "bg-[#343745]"
                }`}
              ></div>
              <div
                className={`w-[8vw] aspect-square rounded-full ${
                  page >= 2
                    ? "bg-newBlue"
                    : "border border-gray-500/20 bg-[#343745]"
                } flex items-center justify-center text-[20px]`}
              >
                {page > 2 ? <IoMdCheckmark /> : "2"}
              </div>
              <div
                className={`line h-[1px] w-full ${
                  page >= 3 ? "bg-newBlue" : "bg-[#343745]"
                }`}
              ></div>
              <div
                className={`w-[8vw] aspect-square rounded-full ${
                  page >= 3
                    ? "bg-newBlue"
                    : "border border-gray-500/20 bg-[#343745]"
                } flex items-center justify-center text-[20px]`}
              >
                {page > 3 ? <IoMdCheckmark /> : "3"}
              </div>{" "}
              <div
                className={`line h-[1px] w-full ${
                  page >= 4 ? "bg-newBlue" : "bg-[#343745]"
                }`}
              ></div>
              <div
                className={`w-[8vw] aspect-square rounded-full ${
                  page == maxPage
                    ? "bg-newBlue"
                    : "border border-gray-500/20 bg-[#343745]"
                } flex items-center justify-center text-[20px]`}
              >
                {page > 5 ? <IoMdCheckmark /> : maxPage}
              </div>
            </div>
            <div className="flex items-center grid grid-cols-4 text-sm min-[1600px]:text-base px-10 mt-2">
              <p className="text-center">Agency Details</p>
              <p className="text-center">Key Contact Details</p>
              <p className="text-center">Portal Deployment</p>
              <p className="text-center">Credentials</p>
            </div>
          </div>
          <div className="h-[45vh] min-[1600px]:h-[40vh]">
            {page === 1 ? (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChangeProfile}
                    />
                    <div
                      onClick={() => {
                        fileInputRef.current.click();
                      }}
                      className="absolute bg-newBlue flex items-center justify-center text-2xl px-2 -bottom-2 cursor-pointer -right-2 rounded-full"
                    >
                      +
                    </div>
                    <Image
                      src={
                        data?.profile ? data?.profile : "/Agency/temp_logo.png"
                      }
                      alt="Agency Img"
                      width={1000}
                      height={1000}
                      className="w-[4vw] rounded-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Agency Name
                      <Required />
                    </label>
                    <input
                      id="name"
                      value={data?.name}
                      onChange={(e) => {
                        setData({ ...data, name: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Agency Name"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 h-[45px] text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="website"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Website
                      <Required />
                    </label>
                    <input
                      id="website"
                      value={data?.website}
                      onChange={(e) => {
                        setData({ ...data, website: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Website"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="location"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
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
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="warrenty"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Warranty Period
                      <Required />
                    </label>
                    <input
                      id="warrenty"
                      value={data?.warrenty}
                      onChange={(e) => {
                        setData({ ...data, warrenty: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Warranty Period"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="deployment"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Deployment Date
                    </label>
                    <input
                      id="deployment"
                      value={data?.deployment}
                      type="date"
                      placeholder="Enter deployment Period"
                      onChange={(e) => {
                        setData({ ...data, deployment: e.target.value });
                      }}
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="license"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      License Limit
                      <Required />
                    </label>
                    <input
                      id="license"
                      value={data?.license}
                      onChange={(e) => {
                        setData({ ...data, license: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter License Limit"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : page == 2 ? (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRefAgent}
                      style={{ display: "none" }}
                      onChange={handleFileChangeAgent}
                    />
                    <div
                      onClick={() => {
                        fileInputRef.current.click();
                      }}
                      className="absolute bg-newBlue flex items-center justify-center text-2xl px-2 -bottom-2 cursor-pointer -right-2 rounded-full"
                    >
                      +
                    </div>
                    <Image
                      src={
                        data?.profile ? data?.profile : "/Agency/temp_logo.png"
                      }
                      alt="Agency Img"
                      width={1000}
                      height={1000}
                      className="w-[4vw] rounded-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="namekey"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
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
                      className="bg-[#898989]/15 outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="designation"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
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
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
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
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="phone"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
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
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : page == 3 ? (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
                <div className="w-full mb-10">
                  <div className="flex flex-col mb-5">
                    <label
                      htmlFor="switchAcc1"
                      className="mb-1.5 text-base flex items-center"
                    >
                      Service Account 1<Info />
                    </label>
                    <textarea
                      id="switchAcc1"
                      value={data?.serviceAcc?.acc1}
                      onChange={(e) => {
                        setData({
                          ...data,
                          serviceAcc: {
                            ...data?.serviceAcc,
                            acc1: e.target.value,
                          },
                        });
                      }}
                      rows={4}
                      placeholder="Service Account 1"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                    ></textarea>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="switchAcc2"
                      className="mb-1.5 text-base flex items-center"
                    >
                      Service Account 2 <Info />
                    </label>
                    <textarea
                      id="switchAcc2"
                      value={data?.serviceAcc?.acc2}
                      onChange={(e) => {
                        setData({
                          ...data,
                          serviceAcc: {
                            ...data?.serviceAcc,
                            acc2: e.target.value,
                          },
                        });
                      }}
                      rows={4}
                      placeholder="Service Account 2"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                    ></textarea>
                  </div>
                </div>{" "}
              </div>
            ) : (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
                <div className="grid grid-cols-1 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="emailKey"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Email
                    </label>
                    <input
                      id="emailKey"
                      value={data?.credentials?.email}
                      onChange={(e) => {
                        setData({
                          ...data,
                          credentials: {
                            ...data?.credentials,
                            email: e.target.value,
                          },
                        });
                      }}
                      type="text"
                      placeholder="Enter Email"
                      className="bg-[#898989]/15 outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="passwordKey"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Password
                    </label>
                    <div className="w-full relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="passwordKey"
                        value={data?.credentials?.password}
                        onChange={(e) => {
                          setData({
                            ...data,
                            credentials: {
                              ...data?.credentials,
                              password: e.target.value,
                            },
                          });
                        }}
                        placeholder="Enter Password"
                        className="bg-[#898989]/15 w-full outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 text-white/80 right-5 text-lg min-[1600px]:text-xl cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? <LuEye /> : <LuEyeOff />}
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex flex-col">
                    <label
                      htmlFor="passwordKeyConfirm"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Confirm Password
                    </label>
                    <div className="w-full relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="passwordKeyConfirm"
                        value={data?.credentials?.cpassword}
                        onChange={(e) => {
                          setData({
                            ...data,
                            credentials: {
                              ...data?.credentials,
                              cpassword: e.target.value,
                            },
                          });
                        }}
                        placeholder="Enter Confirm Password"
                        className="bg-[#898989]/15 w-full outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 text-white/80 right-5 text-lg min-[1600px]:text-xl cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? <LuEye /> : <LuEyeOff />}
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
            )}
          </div>
          <div className="border-t border-t-gray-100/30 px-[3vw] min-[1600px]:px-[5vw] w-full flex items-center justify-between py-6 mt-10 mainText20">
            <button
              className={`text-white text-base min-[1600px]:text-lg w-[150px] min-[1600px]:w-[170px] ${
                page == 1 ? "bg-[#898989]/15" : "bg-newBlue cursor-pointer"
              } h-10 min-[1600px]:h-12 rounded-lg`}
              disabled={page == 1}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (page == maxPage) {
                  handleSave();
                } else {
                  setPage(page + 1);
                }
              }}
              className={`text-white text-base min-[1600px]:text-lg bg-newBlue w-[150px] min-[1600px]:w-[170px] h-10 min-[1600px]:h-12 rounded-lg`}
            >
              {page == maxPage ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddAgency;
