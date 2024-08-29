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

const connectorsData = [
  {
    title: "Amazon Selling Partner",
    img: "/Agency/connectors/Amazon Selling Partner.svg",
  },
  {
    title: "Bamboo HR",
    img: "/Agency/connectors/BambooHR.svg",
  },
  {
    title: "Facebook Ads",
    img: "/Agency/connectors/Facebook Ads.svg",
  },
  {
    title: "Facebook Insights",
    img: "/Agency/connectors/Facebook Insights.svg",
  },
  {
    title: "Google Ads Manager",
    img: "/Agency/connectors/Google Ads Manager.svg",
  },
  {
    title: "Google Ads",
    img: "/Agency/connectors/Google Ads.svg",
  },
  {
    title: "Google Analytics",
    img: "/Agency/connectors/Google Analytics 4.svg",
  },
  {
    title: "Google DV360",
    img: "/Agency/connectors/Google DV360.svg",
  },
  {
    title: "Google My Business",
    img: "/Agency/connectors/Google My Business.svg",
  },
  {
    title: "Google Search Console",
    img: "/Agency/connectors/Google Search Console.svg",
  },
  {
    title: "Google Sheets",
    img: "/Agency/connectors/Google Sheets.svg",
  },
  {
    title: "HubSpot",
    img: "/Agency/connectors/HubSpot.svg",
  },
  {
    title: "Instagram Ads",
    img: "/Agency/connectors/Instagram Ads.svg",
  },
  {
    title: "Instagram Insights",
    img: "/Agency/connectors/Instagram Insights.svg",
  },
  {
    title: "JSON",
    img: "/Agency/connectors/JSON.svg",
  },
  {
    title: "Klaviyo",
    img: "/Agency/connectors/Klaviyo.svg",
  },
  {
    title: "LinkedIn",
    img: "/Agency/connectors/LinkedIn.svg",
  },
  {
    title: "Outbrain",
    img: "/Agency/connectors/Outbrain.svg",
  },
  {
    title: "PayPal",
    img: "/Agency/connectors/PayPal.svg",
  },
  {
    title: "Shopify",
    img: "/Agency/connectors/Shopify.svg",
  },
  {
    title: "Stripe",
    img: "/Agency/connectors/Stripe.svg",
  },
  {
    title: "Taboola",
    img: "/Agency/connectors/Taboola.svg",
  },
  {
    title: "TikTok",
    img: "/Agency/connectors/TikTok.svg",
  },
  {
    title: "X Ads",
    img: "/Agency/connectors/X Ads.svg",
  },
  {
    title: "Xero",
    img: "/Agency/connectors/Xero.svg",
  },
  {
    title: "Klaviyo",
    img: "/Agency/connectors/Klaviyo.svg",
  },
  {
    title: "YouTube",
    img: "/Agency/connectors/YouTube.svg",
  },
];

const AddAgency = ({ showSubscribe, setShowSubscribe }) => {
  let maxPage = 3;
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
    dataSources: [],
  });
  const fileInputRef = React.useRef(null);
  const fileInputRefAgent = React.useRef(null);

  // Function to handle file selection
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
              <div className="bg-newPurple w-[4vw] aspect-square rounded-full"></div>
              <div
                className={`line h-[1px] w-full ${
                  page >= 2 ? "bg-newPurple" : "bg-white/40"
                }`}
              ></div>
              <div
                className={`w-[4vw] aspect-square rounded-full ${
                  page >= 2 ? "bg-newPurple" : "border border-gray-300/80"
                }`}
              ></div>
              <div
                className={`line h-[1px] w-full ${
                  page == maxPage ? "bg-newPurple" : "bg-white/40"
                }`}
              ></div>
              <div
                className={`w-[4vw] aspect-square rounded-full ${
                  page == maxPage ? "bg-newPurple" : "border border-gray-300/80"
                }`}
              ></div>
            </div>
            <div className="flex items-center mainText20 justify-between px-[6vw] mt-2">
              <p>Agency Details</p>
              <p>Key Contact Details</p>
              <p>Data Sources</p>
            </div>
          </div>
          <div className="h-[40vh]">
            {page === 1 ? (
              <div className="px-[8vw] w-full">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    {" "}
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
                      className="absolute bg-newPurple text-2xl px-2 -bottom-2 cursor-pointer -right-2 rounded-full"
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
                      className="bg-[#D9D9D9] p-2 w-[4vw] rounded-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="mb-1.5 text-base">
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
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="website" className="mb-1.5 text-base">
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
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="location" className="mb-1.5 text-base">
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
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="warrenty" className="mb-1.5 text-base">
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
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="deployment" className="mb-1.5 text-base">
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
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="license" className="mb-1.5 text-base">
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
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : page == 2 ? (
              <div className="px-[8vw] w-full">
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
                        fileInputRefAgent.current.click();
                      }}
                      className="absolute bg-newPurple text-2xl px-2 -bottom-2 cursor-pointer -right-2 rounded-full"
                    >
                      +
                    </div>
                    <Image
                      src={
                        data?.keyContact?.profile
                          ? data?.keyContact?.profile
                          : "/Agency/temp_logo.png"
                      }
                      alt="Agency Img"
                      width={1000}
                      height={1000}
                      className="bg-[#D9D9D9] p-2 w-[4vw] rounded-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div className="flex flex-col">
                    <label htmlFor="namekey" className="mb-1.5 text-base">
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
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="designation" className="mb-1.5 text-base">
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
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1.5 text-base">
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
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-1.5 text-base">
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
                      className="bg-transparent outline-none border border-gray-100/30 px-4 py-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-[4vw] h-[40vh] pb-5 overflow-y-auto small-scroller w-full grid grid-cols-3 gap-3">
                {connectorsData.map((e, i) => {
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
                          className="w-[3vw] mr-2 p-1.5 aspect-squre object-contain"
                        />
                        <label
                          htmlFor={e?.title}
                          className="text-base cursor-pointer"
                        >
                          {e?.title}
                        </label>
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
          </div>
          <div className="border-t border-t-gray-100/30 px-[5vw] w-full flex items-center justify-between py-6 mt-10 mainText20">
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
