"use client";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import Required from "../Utils/Required";
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

const AddTemplates = ({ showSubscribe, setShowSubscribe, original_data }) => {
  const { getTemplates } = useContext(Context);
  const [data, setData] = useState({
    template_name: "",
    template_link: "",
    profile_picture: null,
  });
  const [file, setFile] = useState("");
  const fileInputRef = React.useRef(null);

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      setData({ ...data, profile_picture: file });
    }
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
          <div className="px-[4vw] h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
            <div className="px-[8vw] w-full">
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
                    className="absolute bg-newBlue flex items-center justify-center text-xl min-[1600px]:text-2xl px-2 bottom-0 min-[1600px]:bottom-2.5 cursor-pointer right-0 min-[1600px]:right-2.5 rounded-full"
                  >
                    +
                  </div>
                  <Image
                    src={file || "/Agency/temp_logo.png"}
                    alt="Agency Img"
                    width={1000}
                    height={1000}
                    className="w-[6vw] aspect-square object-cover min-[1600px]:w-[8vw] rounded-full"
                  />
                </div>
              </div>
              <div className="gap-y-6 grid">
                <div className="flex flex-col">
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
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 h-[45px] px-4 py-2 text-sm min-[1600px]:text-base rounded-md"
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
            </div>
          </div>
          <div className="border-t border-t-gray-100/30 px-[5vw] w-full flex items-center justify-end py-6 mt-10 text-[15px] min-[1600px]:text-xl">
            <button
              onClick={() => {
                if (data?.template_link && data?.template_name) {
                  let queryParams = new URLSearchParams({
                    ...data,
                    agency_id: original_data?.agency_id,
                  }).toString();

                  const formData = new FormData();
                  formData.append(
                    "profile_picture",
                    data?.profile_picture || ""
                  );
                  formData.append(
                    "profile_picture_filename",
                    data?.profile_picture?.name || ""
                  );
                  formData.append(
                    "profile_picture_content_type",
                    data?.profile_picture?.type || ""
                  );

                  if (data?.profile_picture?.name) {
                    try {
                      fetch(
                        `${BACKEND_URI}/template/add/template?${queryParams}`,
                        {
                          headers: {
                            Accept:
                              "application/json, application/xml, text/plain, text/html, *.*",
                            Authorization: `Bearer ${getCookie("token")}`,
                          },
                          method: "POST",
                          body: formData,
                        }
                      )
                        .then((res) => res.json())
                        .then((res) => {
                          if (res.msg) {
                            toast.success("Template added successfully");
                            setShowSubscribe(false);
                            getTemplates(original_data?.agency_id);
                          } else if (res.detail) {
                            toast.error(res.detail);
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
                    toast.error("Please select a Template Image");
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

export default AddTemplates;
