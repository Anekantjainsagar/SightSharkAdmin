"use client";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import Context from "@/app/Context/Context";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";

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
    width: "30vw",
    border: "none",
  },
};

const DeleteAgency = ({ showSubscribe, setShowSubscribe, name, id }) => {
  const [value, setValue] = useState("");
  const { getAgencies } = useContext(Context);
  function closeModal() {
    setShowSubscribe(false);
  }

  return (
    <div className="z-50">
      <Modal
        isOpen={showSubscribe}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bg-main relative rounded-lg">
          <div className="bg-newBubbleColor/10 w-[15vw] h-[15vw] left-0 absolute bottom-0 rounded-full"></div>
          <div className="bg-newBubbleColor/10 w-[15vw] h-[15vw] right-0 absolute top-3/6 rounded-full"></div>
          <div className="relative rounded-lg backdrop-blur-3xl py-6 border border-gray-500/40 px-4 text-white flex flex-col items-center justify-center">
            <div className="bg-[#FEE4E2] w-16 aspect-square rounded-full flex items-center justify-center">
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.4996 15.5004V22.1671M20.4996 28.8337H20.5163M18.1918 6.98659L4.48369 30.6643C3.72334 31.9776 3.34317 32.6343 3.39936 33.1732C3.44837 33.6433 3.69466 34.0705 4.07692 34.3484C4.51518 34.6671 5.27395 34.6671 6.79149 34.6671H34.2078C35.7253 34.6671 36.4841 34.6671 36.9223 34.3484C37.3046 34.0705 37.5509 33.6433 37.5999 33.1732C37.6561 32.6343 37.2759 31.9776 36.5156 30.6643L22.8074 6.98658C22.0498 5.67798 21.671 5.02368 21.1768 4.80392C20.7457 4.61223 20.2536 4.61223 19.8225 4.80392C19.3283 5.02368 18.9494 5.67798 18.1918 6.98659Z"
                  stroke="#F04438"
                  strokeWidth="3.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4 className="min-[1600px]:text-xl text-center mt-5">
              Are you sure you want to delete the Agency?
            </h4>
            <p className="bg-[#171C2A] p-3 text-[#ECECED] text-center text-sm min-[1600px]:text-base my-2.5">
              All Dashboards, Data sources and Templates will be lost and
              permanently deleted.
            </p>
            <p className="text-[#B2B4BA] text-sm min-[1600px]:text-base my-2">
              This action can’t be undone.
            </p>
            <p className="mainText18 mb-2 text-[#B2B4BA]">
              Type <span className="font-semibold text-white">{name}</span> to
              confirm
            </p>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter here"
              className="mb-4 bg-gray-700/60 backdrop-blur-sm z-10 outline-none text-sm min-[1600px]:text-lg px-4 py-2 w-full rounded-md"
            />
            <div className="flex items-center gap-x-4 w-full text-sm min-[1600px]:text-base">
              <button
                className={`bg-[#898989]/15 w-full py-1.5 min-[1600px]:py-2 rounded-lg text-center`}
                onClick={() => {
                  closeModal();
                }}
              >
                Cancel
              </button>
              <button
                className={`bg-red-600 w-full py-1.5 min-[1600px]:py-2 rounded-lg text-center`}
                onClick={() => {
                  if (value.trim() == name) {
                    try {
                      fetch(`${BACKEND_URI}/agency/delete/${id}`, {
                        method: "DELETE",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${getCookie("token")}`,
                        },
                      })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error(
                              `HTTP error! status: ${response.status}`
                            );
                          }
                          return response.json();
                        })
                        .then((res) => {
                          if (res.msg) {
                            setShowSubscribe(false);
                            toast.success("Agency Deleted Successfully");
                            getAgencies();
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    } catch (error) {
                      console.log(error);
                    }
                  } else {
                    toast.error("Please enter the correct value");
                  }
                }}
              >
                Delete
              </button>{" "}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteAgency;
