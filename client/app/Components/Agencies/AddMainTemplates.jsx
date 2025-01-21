"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import Required from "../Utils/Required";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import Context from "@/app/Context/Context";
import axios from "axios";
import Image from "next/image";

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
    border: "none",
  },
};

const AddMainTemplates = ({ showSubscribe, setShowSubscribe }) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const { getAllTemplates } = useContext(Context);
  const [isDragging, setIsDragging] = useState(false);
  const [data, setData] = useState({
    template_name: "",
    template_link: "",
    template_image: "",
  });
  function closeModal() {
    setShowSubscribe(false);
  }

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      setData({ ...data, template_image: file }); // Update `data` state with the selected file
    } else {
      console.log("No file selected");
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

  const handleClearProfile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setData({ ...data, template_image: "" });
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
        <div className="relative rounded-lg bg-main pt-10 text-white">
          <AiOutlineClose
            size={40}
            onClick={closeModal}
            className="absolute top-2 right-2 px-2 cursor-pointer"
          />
          <div className="px-[4vw] w-[30vw] gap-y-5 grid">
            <h1 className="text-3xl font-medium text-center mb-4">
              Add New Template
            </h1>
            <div className="flex items-center justify-center">
              <div
                className={`relative flex w-full flex-col items-center justify-center ${
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
                      !file ? "Upload Template Image" : "Remove Template Image"
                    }
                    className="absolute bg-newBlue flex items-center justify-center text-2xl px-2 top-6 aspect-square cursor-pointer right-6 rounded-full"
                  >
                    {file ? (
                      <AiOutlineClose className="text-base md:text-lg" />
                    ) : (
                      "+"
                    )}
                  </div>
                  <Image
                    src={file ? file : "/Agency/temp_logo.png"}
                    alt="Agency Img"
                    width={1000}
                    height={1000}
                    className="w-[6vw] min-[1600px]:w-[15vw] aspect-square object-cover rounded-full border border-gray-100/10"
                    title={
                      !file ? "Upload Template Image" : "Remove Template Image"
                    }
                  />
                </div>
                {isDragging && (
                  <p className="absolute text-blue-500 mt-3">
                    Drop file to upload
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="name"
                className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
              >
                Template Name
                <Required />
              </label>
              <input
                id="name"
                value={data?.template_name}
                onChange={(e) => {
                  setData({ ...data, template_name: e.target.value });
                }}
                type="text"
                placeholder="Enter Template Name"
                className="bg-[#898989]/15 outline-none w-full border border-gray-500/20 h-[45px] px-4 py-2 text-sm min-[1600px]:text-base rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="website"
                className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
              >
                Template Link
                <Required />
              </label>
              <input
                id="website"
                value={data?.template_link}
                onChange={(e) => {
                  setData({ ...data, template_link: e.target.value });
                }}
                type="text"
                placeholder="Enter Template Link"
                className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 text-sm min-[1600px]:text-base rounded-md"
              />
            </div>
          </div>
          <div className="border-t border-t-gray-100/30 px-[5vw] w-full flex items-center justify-end py-6 mt-10 text-[15px] min-[1600px]:text-xl">
            <button
              onClick={() => {
                if (data?.template_link && data?.template_name && file) {
                  try {
                    let queryParams = new URLSearchParams({
                      template_name: data?.template_name,
                      template_link: data?.template_link,
                    }).toString();

                    let formData = new FormData();
                    formData.append(
                      "profile_picture",
                      data?.template_image || ""
                    );
                    formData.append(
                      "profile_picture_filename",
                      data?.template_image.name || ""
                    );
                    formData.append(
                      "profile_picture_content_type",
                      data?.template_image.type || ""
                    );

                    axios
                      .post(
                        `${BACKEND_URI}/templates/?${queryParams}`,
                        formData,
                        {
                          headers: {
                            Authorization: `Bearer ${getCookie("token")}`,
                            "Content-Type": "multipart/form-data",
                          },
                        }
                      )
                      .then((response) => {
                        if (response.status == 200) {
                          toast.success("Template added successfully");
                          setShowSubscribe(false);
                          getAllTemplates();
                          setData({ template_name: "", template_link: "" });
                        }
                      })
                      .catch((error) => {
                        console.error(error);
                        toast.error(error.message);
                      });
                  } catch (error) {
                    console.error("Unexpected error:", error);
                    toast.error("An unexpected error occurred");
                  }
                } else {
                  toast.error("Please fill all the required details");
                }
              }}
              className={`text-white bg-newBlue w-[150px] min-[1600px]:w-[170px] h-9 min-[1600px]:h-12 rounded-lg`}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const UpdateMainTemplates = ({
  showSubscribe,
  setShowSubscribe,
  original_data,
}) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const { getAllTemplates } = useContext(Context);
  const [isDragging, setIsDragging] = useState(false);
  const [data, setData] = useState({
    template_name: "",
    template_link: "",
    template_image: "",
  });

  useEffect(() => {
    setData({ ...original_data });
    setFile(original_data?.template_image);
  }, [original_data]);

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      setData({ ...data, template_image: file }); // Update `data` state with the selected file
    } else {
      console.log("No file selected");
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

  const handleClearProfile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setData({ ...data, template_image: "" });
    }
  };

  return (
    <div className="z-50">
      <Modal
        isOpen={showSubscribe}
        onRequestClose={() => setShowSubscribe(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative rounded-lg bg-main pt-10 text-white">
          <AiOutlineClose
            size={40}
            onClick={() => setShowSubscribe(false)}
            className="absolute top-2 right-2 px-2 cursor-pointer"
          />
          <div className="px-[4vw] w-[30vw] gap-y-5 grid">
            <h1 className="text-3xl font-medium text-center mb-4">
              Update Template
            </h1>{" "}
            <div className="flex items-center justify-center">
              <div
                className={`relative flex w-full flex-col items-center justify-center ${
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
                      !file ? "Upload Template Image" : "Remove Template Image"
                    }
                    className="absolute bg-newBlue flex items-center justify-center text-2xl px-2 top-6 aspect-square cursor-pointer right-6 rounded-full"
                  >
                    {file ? (
                      <AiOutlineClose className="text-base md:text-lg" />
                    ) : (
                      "+"
                    )}
                  </div>
                  <Image
                    src={file ? file : "/Agency/temp_logo.png"}
                    alt="Agency Img"
                    width={1000}
                    height={1000}
                    className="w-[6vw] min-[1600px]:w-[15vw] aspect-square object-cover rounded-full border border-gray-100/10"
                    title={
                      !file ? "Upload Template Image" : "Remove Template Image"
                    }
                  />
                </div>
                {isDragging && (
                  <p className="absolute text-blue-500 mt-3">
                    Drop file to upload
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="name"
                className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
              >
                Template Name
                <Required />
              </label>
              <input
                id="name"
                value={data?.template_name}
                onChange={(e) => {
                  setData({ ...data, template_name: e.target.value });
                }}
                type="text"
                placeholder="Enter Template Name"
                className="bg-[#898989]/15 outline-none w-full border border-gray-500/20 h-[45px] px-4 py-2 text-sm min-[1600px]:text-base rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="website"
                className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
              >
                Template Link
                <Required />
              </label>
              <input
                id="website"
                value={data?.template_link}
                onChange={(e) => {
                  setData({ ...data, template_link: e.target.value });
                }}
                type="text"
                placeholder="Enter Template Link"
                className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 text-sm min-[1600px]:text-base rounded-md"
              />
            </div>
          </div>
          <div className="border-t border-t-gray-100/30 px-[5vw] w-full flex items-center justify-end py-6 mt-10 text-[15px] min-[1600px]:text-xl">
            <button
              onClick={() => {
                if (data?.template_link && data?.template_name && file) {
                  try {
                    let queryParams = new URLSearchParams({
                      template_name: data?.template_name,
                      template_link: data?.template_link,
                    }).toString();

                    let formData = new FormData();
                    formData.append(
                      "profile_picture",
                      data?.template_image || ""
                    );
                    formData.append(
                      "profile_picture_filename",
                      data?.template_image.name || ""
                    );
                    formData.append(
                      "profile_picture_content_type",
                      data?.template_image.type || ""
                    );

                    axios
                      .put(
                        `${BACKEND_URI}/templates/${data?.id}?${queryParams}`,
                        formData,
                        {
                          headers: {
                            Authorization: `Bearer ${getCookie("token")}`,
                            "Content-Type": "multipart/form-data",
                          },
                        }
                      )
                      .then((response) => {
                        if (response.status == 200) {
                          toast.success("Template updated successfully");
                          setShowSubscribe(false);
                          getAllTemplates();
                        }
                      })
                      .catch((error) => {
                        console.error(error);
                        toast.error(error.message);
                      });
                  } catch (error) {
                    console.error("Unexpected error:", error);
                    toast.error("An unexpected error occurred");
                  }
                } else {
                  toast.error("Please fill all the required details");
                }
              }}
              className={`text-white bg-newBlue w-[150px] min-[1600px]:w-[170px] h-9 min-[1600px]:h-12 rounded-lg`}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddMainTemplates;
