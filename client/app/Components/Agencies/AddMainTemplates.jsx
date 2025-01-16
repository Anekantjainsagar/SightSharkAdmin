"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import Required from "../Utils/Required";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import Context from "@/app/Context/Context";
import axios from "axios";

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
  const { getAllTemplates } = useContext(Context);
  const [data, setData] = useState({
    template_name: "",
    template_link: "",
  });

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
          <div className="px-[4vw] w-[30vw] gap-y-5 grid">
            <h1 className="text-3xl font-medium text-center mb-4">
              Add New Template
            </h1>
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
                if (data?.template_link && data?.template_name) {
                  try {
                    axios
                      .post(`${BACKEND_URI}/templates/`, data, {
                        headers: {
                          Accept:
                            "application/json, application/xml, text/plain, text/html, *.*",
                          Authorization: `Bearer ${getCookie("token")}`,
                          "Content-Type": "application/json",
                        },
                      })
                      .then((res) => {
                        if (res.data.id) {
                          toast.success("Template added successfully");
                          setShowSubscribe(false);
                          getAllTemplates();
                          setData({ template_name: "", template_link: "" });
                        }
                      })
                      .catch((err) => {
                        console.error("Error creating user:", err);
                        toast.error(
                          "An error occurred while creating the user"
                        );
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
  const { getAllTemplates } = useContext(Context);
  const [data, setData] = useState({
    template_name: "",
    template_link: "",
  });

  function closeModal() {
    setShowSubscribe(false);
  }

  useEffect(() => {
    setData({ ...original_data });
  }, [original_data]);

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
              Update Template
            </h1>
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
                if (data?.template_link && data?.template_name) {
                  try {
                    axios
                      .put(
                        `${BACKEND_URI}/templates/${original_data?.id}`,
                        data,
                        {
                          headers: {
                            Accept:
                              "application/json, application/xml, text/plain, text/html, *.*",
                            Authorization: `Bearer ${getCookie("token")}`,
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((res) => {
                        if (res.data.id) {
                          toast.success("Template updated successfully");
                          setShowSubscribe(false);
                          getAllTemplates();
                        }
                      })
                      .catch((err) => {
                        console.error("Error creating user:", err);
                        toast.error(
                          "An error occurred while creating the user"
                        );
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
