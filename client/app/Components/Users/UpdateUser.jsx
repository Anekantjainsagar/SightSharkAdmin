"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import Required from "../Utils/Required";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import Context from "@/app/Context/Context";
import { MdKeyboardArrowDown } from "react-icons/md";

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

const UpdateUser = ({ showSubscribe, setShowSubscribe, clickedUsers }) => {
  let maxPage = 1;
  const context = useContext(Context);
  const { getUsers } = useContext(Context);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    access: "admin",
    email: "",
    profile: "",
    phone: "",
    postal_code: "",
    country: "India",
    password: "",
    profile: "",
    status: "",
  });
  const [availableRoles, setAvailableRoles] = useState([]);
  const [file, setFile] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    setData({
      firstName: clickedUsers?.first_name.trim(),
      lastName: clickedUsers?.last_name.trim(),
      access: clickedUsers?.role,
      ...clickedUsers,
    });
    setFile(clickedUsers?.profile_picture);
  }, [clickedUsers]);

  useEffect(() => {
    if (context?.userData?.role == "superadmin") {
      setAvailableRoles(["admin", "guest"]);
      setData({ ...data, access: "admin" });
    } else if (context?.userData?.role == "admin") {
      setAvailableRoles(["guest"]);
      setData({ ...data, access: "guest" });
    } else if (context?.userData?.role == "owner") {
      setAvailableRoles(["superadmin", "admin", "guest"]);
      setData({ ...data, access: "superadmin" });
    }
  }, [context?.userData]);

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      setData({ ...data, profile: file });
    }
  };

  const handleClearProfile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setData({ ...data, profile: "" });
    }
  };

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
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChangeProfile({ target: { files: [droppedFile] } });
    }
  };

  const handlePaste = (e) => {
    const clipboardItem = e.clipboardData.items[0];
    if (clipboardItem && clipboardItem.type.startsWith("image")) {
      const pastedFile = clipboardItem.getAsFile();
      handleFileChangeProfile({ target: { files: [pastedFile] } });
    }
  };

  function closeModal() {
    setShowSubscribe(false);
  }

  const updateUsers = () => {
    if (data?.firstName && data?.lastName && data?.email && data?.access) {
      const queryParams = new URLSearchParams({
        email: data?.email,
        password: data?.password,
        first_name: data?.firstName,
        last_name: data?.lastName,
        phone: data?.phone || "",
        postal_code: data?.postal_code || "",
        role: data?.access || "admin",
        country: data?.country || "",
        status: data?.status || "active",
      }).toString();

      let formdata = new FormData();
      if (data?.profile instanceof File || data?.profile instanceof Blob) {
        formdata.append("profile_picture", data?.profile);
        formdata.append("profile_picture_filename", data?.profile.name);
        formdata.append("profile_picture_content_type", data?.profile.type);
      } else {
        formdata.append("profile_picture", "");
        formdata.append("profile_picture_filename", "");
        formdata.append("profile_picture_content_type", "");
      }

      try {
        fetch(`${BACKEND_URI}/user/update/${clickedUsers?.id}?${queryParams}`, {
          headers: {
            Accept:
              "application/json, application/xml, text/plain, text/html, *.*",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          method: "PUT",
          body: formdata,
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.msg) {
              closeModal();
              getUsers();
              toast.success("User updated successfully");
            }
            if (res.detail) {
              toast.error(res.detail);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please fill all the details");
    }
  };

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
          <div className="relative rounded-lg backdrop-blur-3xl pt-8 md:pt-10 text-white">
            <AiOutlineClose
              size={40}
              onClick={closeModal}
              className="absolute top-2 right-2 px-2 cursor-pointer"
            />
            <div className="mb-5 text-center">
              <h1 className="mainLogoSize font-semibold">
                Update User Details
              </h1>
            </div>
            <div className="h-fit px-[8vw] w-full">
              <div className="flex items-center justify-center mb-2">
                <div
                  className={`relative flex w-full flex-col items-center justify-center mb-3 md:mb-4 ${
                    isDragging
                      ? "border-2 border-dashed border-blue-500 bg-black/30 cursor-pointer"
                      : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onPaste={handlePaste}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChangeProfile}
                  />
                  <div className="relative">
                    <div
                      onClick={() => {
                        if (file) {
                          handleClearProfile();
                        } else {
                          fileInputRef.current.click();
                        }
                      }}
                      title={
                        !file ? "Upload User Profile" : "Remove User Profile"
                      }
                      className="absolute bg-newBlue flex items-center justify-center text-2xl px-2 -top-1 aspect-square cursor-pointer right-0 rounded-full"
                    >
                      {file ? (
                        <AiOutlineClose className="text-base md:text-[13px]" />
                      ) : (
                        "+"
                      )}
                    </div>
                    <Image
                      src={file ? file : "/Agency/temp_logo.png"}
                      alt="Agency Img"
                      width={1000}
                      height={1000}
                      title={
                        !file ? "Upload User Profile" : "Remove User Profile"
                      }
                      className="w-[6vw] min-[1600px]:w-[5vw] aspect-square object-cover rounded-full"
                    />
                  </div>
                  {isDragging && (
                    <p className="absolute text-blue-500 mt-3">
                      Drop file to upload
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                  >
                    First Name
                    <Required />
                  </label>
                  <input
                    id="name"
                    value={data?.firstName}
                    onChange={(e) => {
                      setData({ ...data, firstName: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter First Name"
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 h-9 min-[1600px]:h-[45px] px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="lastName"
                    className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                  >
                    Last Name
                    <Required />
                  </label>
                  <input
                    id="lastName"
                    value={data?.lastName}
                    onChange={(e) => {
                      setData({ ...data, lastName: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter Last Name"
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                  >
                    Email
                    <Required />
                  </label>
                  <input
                    id="email"
                    value={data?.email}
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter Email"
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                  />
                </div>{" "}
                <div className="flex flex-col">
                  <label
                    htmlFor="access"
                    className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                  >
                    Access
                    <Required />
                  </label>

                  <div className="relative w-full">
                    <select
                      name="access"
                      id="access"
                      className="bg-[#898989]/15 outline-none w-full border border-gray-500/20 min-[1600px]:h-[45px] px-4 py-2 pr-10 min-[1600px]:text-base text-sm rounded-md appearance-none"
                      value={data?.access}
                      onChange={(e) => {
                        setData({ ...data, access: e.target.value });
                      }}
                    >
                      {availableRoles?.map((e, i) => {
                        return (
                          <option value={e} key={i} className="bg-main">
                            {e[0]?.toUpperCase() + e.slice(1)}
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
                {/* <div className="flex flex-col">
                {" "}
                <label
                  htmlFor="password"
                  className="text-sm min-[1600px]:text-base"
                >
                  Password
                </label>
                <div className="w-full relative mt-1.5">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={data?.password}
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
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
              </div> */}
                <div className="flex flex-col">
                  <label
                    htmlFor="phone"
                    className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    value={data?.phone}
                    onChange={(e) => {
                      setData({ ...data, phone: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter Phone"
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                  />
                </div>{" "}
                <div className="flex flex-col">
                  <label
                    htmlFor="postal_code"
                    className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                  >
                    Postal Code
                  </label>
                  <input
                    id="postal_code"
                    value={data?.postal_code}
                    onChange={(e) => {
                      setData({ ...data, postal_code: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter Postal Code"
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="country"
                    className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    value={data?.country}
                    onChange={(e) => {
                      setData({ ...data, country: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter Country"
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                  >
                    Status
                  </label>

                  <div className="relative w-full">
                    <select
                      id="status"
                      value={data?.status}
                      onChange={(e) => {
                        setData({ ...data, status: e.target.value });
                      }}
                      className="bg-[#898989]/15 w-full outline-none border border-gray-500/20 px-4 py-2 pr-10 min-[1600px]:text-base text-sm rounded-md appearance-none"
                    >
                      {["active", "inactive"].map((e, i) => {
                        return (
                          <option key={i} className="bg-main" value={e}>
                            {e[0]?.toUpperCase() + e.slice(1)}
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
              </div>
            </div>
            <div className="px-[5vw] w-full flex items-center justify-end py-5 text-sm min-[1600px]:text-base">
              <button
                onClick={() => {
                  if (page == maxPage) {
                    updateUsers();
                  } else {
                    setPage(page + 1);
                  }
                }}
                className={`text-white bg-newBlue w-[170px] h-12 rounded-lg`}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateUser;
