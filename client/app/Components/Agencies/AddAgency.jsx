"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import Info from "@/app/Components/Login/Info";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdCheckmark } from "react-icons/io";
import Required from "../Utils/Required";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import Context from "@/app/Context/Context";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsCloudUpload } from "react-icons/bs";

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
  const { getAgencies, checkPasswordCriteria, regions } = useContext(Context);
  const [file, setFile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSave, setShowSave] = useState(true);
  const [page, setPage] = useState(1);
  const [serviceAcc1, setserviceAcc1] = useState();
  const [data, setData] = useState({
    name: "",
    profile: "",
    website: "",
    location: "",
    warrenty: 3,
    deployment: "",
    onboarding_date: "",
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
  const criteria = checkPasswordCriteria(data?.credentials?.password);

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
        email_address: data?.credentials?.email || "",
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
        onboarding_date: data?.onboarding_date,
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
          setShowSubscribe(false);
          // if (res.status == 200) {
          toast.success("Agency created successfully");
          // setAgencies([...agencies, res.data]);
          getAgencies();
        })
        .catch((error) => {
          console.error(error);
          setShowSave(true);
          toast.error(error.message);
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
    console.log(file);
    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target.result;

        try {
          // Check if the file content is not empty before parsing
          if (result) {
            const content = JSON.parse(result);
            console.log(content);
            setData((prevData) => ({
              ...prevData,
              serviceAcc: {
                ...prevData.serviceAcc,
                acc1: JSON.stringify(content),
              },
            }));
          } else {
            throw new Error("Empty file content");
          }
        } catch (error) {
          console.error("Invalid JSON:", error);
          toast.error("Invalid JSON file. Please check the file format.");
        }
      };

      reader.onerror = () => {
        console.error("File reading error:", reader.error);
        toast.error("An error occurred while reading the file.");
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

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChangeProfile({ target: { files: [file] } });
    }
  };

  const handlePaste = (e) => {
    const clipboardItem = e.clipboardData.items[0];
    if (clipboardItem && clipboardItem.type.startsWith("image")) {
      const file = clipboardItem.getAsFile();
      handleFileChangeProfile({ target: { files: [file] } });
    }
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

  function closeModal() {
    setShowSubscribe(false);
  }

  useEffect(() => {
    if (regions) {
      setData({ ...data, region: regions[0]?.region_name });
    }
  }, [regions]);

  return (
    <div className="z-50">
      <Modal
        isOpen={showSubscribe}
        onRequestCl2ose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative rounded-lg bg-main text-white">
          <div className="bg-newBubbleColor/10 w-[20vw] h-[30vh] absolute left-20 top-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="bg-newBubbleColor/10 w-[15vw] h-[15vw] right-0 absolute top-3/6 rounded-full"></div>
          <div className="bg-newBubbleColor/10 w-[15vw] h-[15vw] right-20 absolute bottom-10 rounded-full"></div>
          <div className="relative flex mt-5 backdrop-blur-3xl rounded-lg">
            <AiOutlineClose
              size={40}
              onClick={closeModal}
              className="absolute right-2 top-2 px-1.5 text-lg text-white/60 cursor-pointer z-50"
            />
            <div className="w-[24%] rounded-lg flex items-start pl-10 py-10 bg-main">
              <div className="flex flex-col items-center justify-between h-full">
                {[1, 2, 3, 4].map((e, i, arr) => {
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`${
                          page > i + 1
                            ? "bg-transparent border-2 border-newBlue"
                            : page == i + 1
                            ? "bg-newBlue border-2 border-transparent"
                            : "border-2 border-gray-500/20 bg-transparent"
                        } w-[15vw] md:w-[2.5vw] aspect-square rounded-full flex items-center justify-center text-lg min-[1600px]:text-[24px]`}
                      >
                        {page > i + 1 ? <IoMdCheckmark /> : i + 1}
                      </div>
                      {arr.length - 1 !== i && (
                        <div
                          className={`h-[103px] w-[1px] ${
                            page > i + 1 ? "bg-newBlue" : "bg-[#343745]"
                          }`}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="items-start py-2 pl-5 flex flex-col h-full justify-between text-sm min-[1600px]:text-base">
                {[
                  "Agency Details",
                  "Key Contact Details",
                  "Portal Deployment",
                  "Credentials",
                ].map((e, i) => {
                  return (
                    <p className={``} key={i}>
                      {e}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="w-[76%] px-10 pb-10 pt-14 flex flex-col items-start justify-between relative z-40">
              <div className="w-full">
                {page === 1 ? (
                  <div className="w-full">
                    <div
                      className={`flex flex-col items-center justify-center mb-4 ${
                        isDragging
                          ? "border-2 border-dashed border-blue-500 bg-black/30"
                          : ""
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onPaste={handlePaste} // Adding paste event listener
                    >
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
                          className="absolute bg-newBlue flex items-center justify-center text-2xl w-[1.6vw] aspect-square top-0 cursor-pointer -right-2 rounded-full"
                          title={
                            data?.profile
                              ? "Remove Agency Logo"
                              : "Upload Agency Logo"
                          }
                        >
                          {data?.profile ? (
                            <AiOutlineClose className="text-sm" />
                          ) : (
                            "+"
                          )}
                        </div>
                        <Image
                          src={file || "/Agency/temp_logo.png"}
                          alt="Agency Img"
                          width={1000}
                          height={1000}
                          className="w-[5vw] aspect-square object-cover rounded-full"
                          title={
                            data?.profile
                              ? "Remove Agency Logo"
                              : "Upload Agency Logo"
                          }
                        />
                      </div>
                      {isDragging && (
                        <p className="absolute text-blue-500 mt-3">
                          Drop file to upload
                        </p>
                      )}
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
                          placeholder="Enter Agency Website"
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
                          htmlFor="warranty"
                          className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                        >
                          Warranty Period
                          <Required />
                        </label>

                        <div className="relative w-full">
                          <select
                            value={data?.warrenty}
                            onChange={(e) => {
                              setData({ ...data, warrenty: e.target.value });
                            }}
                            className="bg-[#898989]/15 w-full outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 pr-10 rounded-md appearance-none"
                          >
                            {[3, 6, 9, 12, 15, 18, 21, 24].map((e, i) => {
                              return (
                                <option value={e} key={i} className="bg-main">
                                  {e} Months
                                </option>
                              );
                            })}
                          </select>
                          {/* Custom dropdown icon */}
                          <span className="absolute right-3 top-1/2 text-2xl -translate-y-1/2 pointer-events-none">
                            <MdKeyboardArrowDown />
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="deployment"
                          className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                        >
                          Onboarding Date
                          <Required />
                        </label>
                        <input
                          id="deployment"
                          value={data?.onboarding_date}
                          type="date"
                          onChange={(e) => {
                            setData({
                              ...data,
                              onboarding_date: e.target.value,
                            });
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
                          type="number"
                          id="license"
                          value={data?.license}
                          onChange={(e) => {
                            setData({ ...data, license: e.target.value });
                          }}
                          placeholder="Enter License Limit"
                          className="bg-[#898989]/15 outline-none h-[45px] border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ) : page == 2 ? (
                  <div className="w-full grid grid-cols-2 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
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
                          setData({
                            ...data,
                            project_number: e.target.value,
                          });
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
                      <div className="relative w-full">
                        <select
                          value={data?.region}
                          onChange={(e) => {
                            setData({ ...data, region: e.target.value });
                          }}
                          className="bg-[#898989]/15 w-full outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 pr-10 rounded-md appearance-none"
                        >
                          {regions.map((e, i) => {
                            return (
                              <option
                                value={e?.region_name}
                                key={i}
                                className="bg-main"
                              >
                                {e?.region_name}
                              </option>
                            );
                          })}
                        </select>
                        {/* Custom dropdown icon */}
                        <span className="absolute right-3 top-1/2 text-2xl -translate-y-1/2 pointer-events-none">
                          <MdKeyboardArrowDown />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="switchAcc1"
                        className="mb-1.5 text-sm min-[1600px]:text-base w-fit flex items-center relative whitespace-nowrap"
                      >
                        Service Account
                        <Info
                          text="Add the service account with the following permission-"
                          values={[
                            "Artifact Registry Administrator",
                            "Artifact Registry Writer",
                            "Cloud Build Connection Admin",
                            "Cloud Build Editor",
                            "Cloud Run Admin",
                            "Cloud Scheduler Admin",
                            "Cloud SQL Admin",
                            "Logging Admin",
                            "Pub/Sub Admin",
                            "Secret Manager Admin",
                            "Service Account User",
                            "Service Usage Admin",
                            "Source Repository Reader",
                            "Storage Admin",
                            "Viewer",
                          ]}
                          placement={"bottom"}
                        />
                        <Required />
                      </label>
                      <div className="flex items-center">
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          ref={fileInputRef}
                          className="hidden"
                        />
                        {!serviceAcc1 ? (
                          <button
                            className="bg-[#898989]/15 outline-none h-[45px] w-full border flex items-center justify-center gap-x-3 border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <BsCloudUpload className="text-lg" />
                            Upload File
                          </button>
                        ) : (
                          <button
                            className="bg-[#898989]/15 outline-none h-[45px] w-full border flex items-center justify-center gap-x-3 border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            {serviceAcc1.name}
                          </button>
                        )}
                        {serviceAcc1 && (
                          <AiOutlineClose
                            className="text-4xl text-gray-400 cursor-pointer ml-4"
                            onClick={handleClearFile}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="grid grid-cols-1 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                      <div className="flex flex-col">
                        <label
                          htmlFor="emailKey"
                          className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                        >
                          Portal Owner Email
                          <Required />
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
                      <div className="grid grid-cols-2 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                        <div className="flex flex-col">
                          <label
                            htmlFor="passwordKey"
                            className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                          >
                            Password <Required />
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
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="passwordKeyConfirm"
                            className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                          >
                            Confirm Password <Required />
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
                      </div>
                      {data?.credentials?.password && (
                        <div className="text-sm mb-5">
                          <p
                            className={
                              criteria.hasUppercase
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {criteria.hasUppercase ? "✔" : "✘"} At least one
                            uppercase letter
                          </p>
                          <p
                            className={
                              criteria.hasLowercase
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {criteria.hasLowercase ? "✔" : "✘"} At least one
                            lowercase letter
                          </p>
                          <p
                            className={
                              criteria.hasNumber
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {criteria.hasNumber ? "✔" : "✘"} At least one number
                          </p>
                          <p
                            className={
                              criteria.hasSpecialChar
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {criteria.hasSpecialChar ? "✔" : "✘"} At least one
                            special character
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full flex items-center justify-between mt-10 mainText20">
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
                    console.log(data);
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
                        data?.license &&
                        data?.onboarding_date &&
                        file
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
                          data?.serviceAcc?.acc1
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
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddAgency;
