"use client";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import Info from "@/app/Components/Login/Info";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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
  const fileInputRef = React.useRef(null);
  const fileInputRef2 = React.useRef(null);
  const { setAgencies, agencies, getAgencies } = useContext(Context);
  const [file, setFile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSave, setShowSave] = useState(true);
  const [page, setPage] = useState(1);
  const [serviceAcc1, setserviceAcc1] = useState();
  const [serviceAcc2, setserviceAcc2] = useState();
  const [data, setData] = useState({
    name: "",
    profile: "",
    website: "",
    location: "",
    warrenty: 3,
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
    project_id: "",
    region: "",
    project_number: "",
  });

  const handleSave = () => {
    setShowSave(false);
    if (
      data?.name &&
      data?.website &&
      data?.warrenty &&
      data?.license &&
      data?.keyContact?.email
    ) {
      let queryParams = new URLSearchParams({
        agency_name: data?.name,
        website: data?.website,
        location: data?.location || "",
        warranty_period: parseInt(data?.warrenty),
        deployment_date: data?.deployment || "",
        license_limit: parseInt(data?.license),
        current_number_of_clients: data?.currentClients || 1,
        email_address: data?.keyContact?.email || "",
        password: data?.credentials?.password || "",
        key_contact_name: data?.keyContact?.name,
        key_contact_designation: data?.keyContact?.designation,
        key_contact_email_address: data?.keyContact?.email,
        key_contact_phone: data?.keyContact?.phone,
        service_account_cloud: data?.serviceAcc?.acc1 || "",
        service_account_api: data?.serviceAcc?.acc2 || "",
        region: data?.region || "",
        project_id: data?.project_id || "",
        project_number: data?.project_number || "",
        status: data?.status || "active",
      }).toString();

      let formData = new FormData();
      if (data?.profile instanceof File || data?.profile instanceof Blob) {
        formData.append("profile_picture", data?.profile); // The file itself
        formData.append("profile_picture_filename", data?.profile.name); // The filename
        formData.append("profile_picture_content_type", data?.profile.type); // The MIME type
      }

      axios
        .post(`${BACKEND_URI}/agency/create?${queryParams}`, formData, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const res = response.data;
          if (res.msg) {
            toast.success("Agency created successfully");
            setAgencies([...agencies, res.data]);
            getAgencies();
            setShowSubscribe(false);
          } else if (res.detail) {
            setShowSave(true);
            toast.error(res.detail);
          }
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          setShowSave(true);
          if (error.response && error.response.data) {
            toast.error(
              error.response.data.detail ||
                "An error occurred while creating the user"
            );
          } else {
            toast.error("An error occurred while creating the user");
          }
        });
    } else {
      toast.error("Please fill all the required details");
    }
  };

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      setData({ ...data, profile: file });
    } else {
      console.log("No file selected");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setserviceAcc1(file);
    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result);
          setData({
            ...data,
            serviceAcc: { ...data.serviceAcc, acc1: JSON.stringify(content) },
          });
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
      };

      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid JSON file.");
    }
  };

  const handleFileUpload2 = (event) => {
    const file = event.target.files[0];
    setserviceAcc2(file);
    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result);
          setData({
            ...data,
            serviceAcc: { ...data.serviceAcc, acc2: JSON.stringify(content) },
          });
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
      };

      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid JSON file.");
    }
  };

  const handleClearProfile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setData({
      ...data,
      profile: "",
    });
  };

  const handleClearFile = () => {
    setserviceAcc1(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setData({
      ...data,
      serviceAcc: {
        ...data.serviceAcc,
        acc1: "",
      },
    });
  };

  const handleClearFile2 = () => {
    setserviceAcc2(null);
    if (fileInputRef2.current) {
      fileInputRef2.current.value = "";
    }
    setData({
      ...data,
      serviceAcc: {
        ...data.serviceAcc,
        acc2: "",
      },
    });
  };

  function closeModal() {
    setShowSubscribe(false);
  }

  return (
    <div className="z-50">
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
            <div className="items-center grid grid-cols-4 text-sm min-[1600px]:text-base px-10 mt-2">
              {[
                "Agency Details",
                "Key Contact Details",
                "Portal Deployment",
                "Credentials",
              ].map((e, i) => {
                return (
                  <p className={`text-center`} key={i}>
                    {e}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="h-[45vh] min-[1600px]:h-[40vh]">
            {page === 1 ? (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChangeProfile}
                    />
                    <div
                      onClick={() => {
                        if (data?.profile) {
                          handleClearProfile();
                        } else {
                          fileInputRef.current.click();
                        }
                      }}
                      className="absolute bg-newBlue flex items-center justify-center text-2xl w-[1.6vw] aspect-square -bottom-2 cursor-pointer -right-2 rounded-full"
                    >
                      {data?.profile ? (
                        <AiOutlineClose className="text-sm" />
                      ) : (
                        "+"
                      )}
                    </div>
                    <Image
                      src={file ? file : "/Agency/temp_logo.png"}
                      alt="Agency Img"
                      width={1000}
                      height={1000}
                      className="w-[4vw] aspect-square object-cover rounded-full"
                    />
                  </div>
                  <p className="text-center mt-3 text-gray-300">
                    {data?.profile?.name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                      className="bg-[#898989]/15 outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="location"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                      className="bg-[#898989]/15 outline-none h-[45px] border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="warrenty"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Warranty Period
                      <Required />
                    </label>

                    <div className="custom-select-wrapper w-full">
                      <select
                        value={data?.warrenty}
                        onChange={(e) => {
                          setData({ ...data, warrenty: e.target.value });
                        }}
                        className="bg-[#898989]/15 w-full outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                      >
                        {[3, 6, 9, 12, 15, 18, 21, 24].map((e, i) => {
                          return (
                            <option value={e} key={i} className="bg-main">
                              {e} Months
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="deployment"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                      className="bg-[#898989]/15 outline-none h-[45px] border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="license"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                      className="bg-[#898989]/15 outline-none h-[45px] border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : page == 2 ? (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full grid grid-cols-2 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="namekey"
                    className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                    className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                    className="bg-[#898989]/15 outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                  >
                    Email Address
                    <Required />
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
                    className="bg-[#898989]/15 outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="phone"
                    className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                    className="bg-[#898989]/15 outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                  />
                </div>
              </div>
            ) : page == 3 ? (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
                <div className="grid grid-cols-2 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="project_number"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Project Number
                      <Required />
                    </label>
                    <input
                      id="project_number"
                      value={data?.project_number}
                      onChange={(e) => {
                        setData({ ...data, project_number: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Project Number"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 h-[45px] text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="project_id"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Project ID
                      <Required />
                    </label>
                    <input
                      id="project_id"
                      value={data?.project_id}
                      onChange={(e) => {
                        setData({ ...data, project_id: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Project ID"
                      className="bg-[#898989]/15 outline-none h-[45px] border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="region"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Region <Required />
                    </label>
                    <input
                      id="region"
                      value={data?.region}
                      onChange={(e) => {
                        setData({ ...data, region: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Region"
                      className="bg-[#898989]/15 outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                </div>{" "}
                <div className="flex items-center justify-between mt-8">
                  <label
                    htmlFor="switchAcc1"
                    className="mb-1.5 text-base flex items-center w-fit relative"
                  >
                    Service Account 1
                    <Info text="Manages internal google cloud services" />{" "}
                    <Required />
                  </label>
                  <div className="flex items-center">
                    {/* Custom File Input */}
                    <label
                      className={`border border-gray-300/20 py-1 ${
                        serviceAcc1 ? "px-4" : "px-1"
                      } rounded-md cursor-pointer`}
                    >
                      {serviceAcc1 && serviceAcc1?.name}
                      {!serviceAcc1 && (
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          ref={fileInputRef}
                        />
                      )}
                    </label>

                    {serviceAcc1 && (
                      <AiOutlineClose
                        className="text-lg cursor-pointer ml-2"
                        onClick={handleClearFile}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <label
                    htmlFor="switchAcc2"
                    className="mb-1.5 text-base flex items-center w-fit relative"
                  >
                    Service Account 2
                    <Info text="Manages internal google cloud services" />{" "}
                    <Required />
                  </label>
                  <div className="flex items-center">
                    {/* Custom File Input */}
                    <label
                      className={`border border-gray-300/20 py-1 ${
                        serviceAcc2 ? "px-4" : "px-1"
                      } rounded-md cursor-pointer`}
                    >
                      {serviceAcc2 && serviceAcc2?.name}
                      {!serviceAcc2 && (
                        <input
                          type="file"
                          onChange={handleFileUpload2}
                          ref={fileInputRef2}
                        />
                      )}
                    </label>

                    {serviceAcc2 && (
                      <AiOutlineClose
                        className="text-lg cursor-pointer ml-2"
                        onClick={handleClearFile2}
                      />
                    )}
                  </div>
                </div>{" "}
              </div>
            ) : (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
                <div className="grid grid-cols-1 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="emailKey"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Email
                      <Required /> <Info text="Login Email" />
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
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Password <Required />
                      <Info text="Login Password" />
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
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Confirm Password <Required />
                      <Info text="Login Confirm Password" />
                    </label>
                    <div className="w-full relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
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
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                      >
                        {showConfirmPassword ? <LuEye /> : <LuEyeOff />}
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
                  if (
                    page == 4 &&
                    data?.credentials?.email &&
                    data?.credentials?.password &&
                    data?.credentials?.cpassword
                  ) {
                    if (
                      data?.credentials?.password ===
                      data?.credentials?.cpassword
                    ) {
                      handleSave();
                    } else {
                      toast.error(
                        "Both password didn't match please check again"
                      );
                    }
                  } else {
                    toast.error("Please fill all the details");
                  }
                } else {
                  if (
                    page == 1 &&
                    data?.name &&
                    data?.website &&
                    data?.warrenty &&
                    data?.license
                  ) {
                    setPage(page + 1);
                  } else {
                    if (page == 2 && data?.keyContact?.email) {
                      setPage(page + 1);
                    } else if (
                      page == 3 &&
                      data?.project_id &&
                      data?.project_number &&
                      data?.region &&
                      data?.serviceAcc?.acc1 &&
                      data?.serviceAcc?.acc2
                    ) {
                      setPage(page + 1);
                    } else {
                      toast.error("Please fill all the details");
                    }
                  }
                }
              }}
              className={`text-white ${
                !showSave ? "bg-[#898989]/15" : "bg-newBlue cursor-pointer"
              } text-base min-[1600px]:text-lg w-[150px] min-[1600px]:w-[170px] h-10 min-[1600px]:h-12 rounded-lg`}
              disabled={!showSave}
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
