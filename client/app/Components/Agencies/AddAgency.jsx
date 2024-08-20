"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
    width: "60vw",
    border: "none",
  },
};

const AddAgency = ({ showSubscribe, setShowSubscribe }) => {
  let maxPage = 3;
  const [page, setPage] = useState(1);
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
              <div className="bg-newPurple w-[3vw] aspect-square rounded-full"></div>
              <div
                className={`line h-[1px] w-full ${
                  page >= 2 ? "bg-newPurple" : "bg-white/40"
                }`}
              ></div>
              <div
                className={`w-[3vw] aspect-square rounded-full ${
                  page >= 2 ? "bg-newPurple" : "border border-gray-300/80"
                }`}
              ></div>
              <div
                className={`line h-[1px] w-full ${
                  page == maxPage ? "bg-newPurple" : "bg-white/40"
                }`}
              ></div>
              <div
                className={`w-[3vw] aspect-square rounded-full ${
                  page == maxPage ? "bg-newPurple" : "border border-gray-300/80"
                }`}
              ></div>
            </div>
            <div className="flex items-center text-sm justify-between px-[6vw] mt-2">
              <p>Agency Details</p>
              <p>Key Contact Details</p>
              <p>Data Sources</p>
            </div>
          </div>
          {page === 1 ? (
            <div className="px-[8vw] w-full">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute bg-newPurple text-2xl px-2 -bottom-2 cursor-pointer -right-2 rounded-full">
                    +
                  </div>
                  <Image
                    src={"/agency/temp_logo.png"}
                    alt="Agency Img"
                    width={1000}
                    height={1000}
                    className="bg-[#D9D9D9] p-2 w-[3.5vw] rounded-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-1.5">
                    Agency Name
                  </label>
                  <input
                    id="name"
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
                    type="text"
                    placeholder="Enter License Limit"
                    className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                  />
                </div>
              </div>
            </div>
          ) : page == 2 ? (
            <div className="px-[8vw] w-full">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute bg-newPurple text-2xl px-2 -bottom-2 cursor-pointer -right-2 rounded-full">
                    +
                  </div>
                  <Image
                    src={"/agency/temp_logo.png"}
                    alt="Agency Img"
                    width={1000}
                    height={1000}
                    className="bg-[#D9D9D9] p-2 w-[3.5vw] rounded-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex flex-col">
                  <label htmlFor="namekey" className="mb-1.5">
                    Name
                  </label>
                  <input
                    id="namekey"
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
                    type="number"
                    placeholder="Enter Phone no."
                    className="bg-transparent outline-none border border-gray-100/30 px-4 py-1 rounded-md"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="px-[8vw] w-full grid grid-cols-3 gap-3">
              {[
                { img: "/agency/data-sources/facebook.png", title: "Meta Ads" },
                {
                  img: "/agency/data-sources/facebook.png",
                  title: "Meta Insights",
                },
                {
                  img: "/agency/data-sources/google analytics.png",
                  title: "Google Analytics",
                },
                { img: "/agency/data-sources/hubspot.png", title: "HubSpot" },
                { img: "/agency/data-sources/amazon.png", title: "Amazon" },
                { img: "/agency/data-sources/shopify.png", title: "Shopify" },
                {
                  img: "/agency/data-sources/google ads.png",
                  title: "Google Ads",
                },
                { img: "/agency/data-sources/linkedin.png", title: "Linkedin" },
              ].map((e, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between border border-gray-300/30 px-2 py-1 rounded-full"
                  >
                    <div className="flex items-center">
                      <Image
                        src={e?.img}
                        alt={e?.img?.src}
                        width={1000}
                        height={1000}
                        className="w-[3vw] mr-2"
                      />
                      <label htmlFor={e?.title}>{e?.title}</label>
                    </div>
                    <input
                      type="checkbox"
                      id={e?.title}
                      className="form-checkbox cursor-pointer h-6 w-6 text-blue-600 rounded-full appearance-none border-2 border-gray-300 checked:bg-blue-600 mr-2"
                    />
                  </div>
                );
              })}
            </div>
          )}
          <div className="border-t border-t-gray-100/30 px-[5vw] w-full flex items-center justify-between py-6 mt-10">
            <button
              className={`text-white ${
                page == 1 ? "bg-gray-800" : "bg-newPurple cursor-pointer"
              } px-8 py-1.5 rounded-md`}
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
                } else {
                  setPage(page + 1);
                }
              }}
              className={`text-white bg-newPurple px-8 py-1.5 rounded-md`}
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
