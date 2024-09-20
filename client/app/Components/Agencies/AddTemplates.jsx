"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import Required from "../Utils/Required";

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

const AddTemplates = ({ showSubscribe, setShowSubscribe }) => {
  let maxPage = 3;
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    dataSources: [],
  });
  const fileInputRef = React.useRef(null);

  const handleFileChangeProfile = (event) => {
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
          <div className="px-[4vw] h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
            {" "}
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
                    className="absolute bg-newBlue flex items-center justify-center text-2xl px-2 bottom-2.5 cursor-pointer right-2.5 rounded-full"
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
                    className="w-[8vw] rounded-full"
                  />
                </div>
              </div>
              <div className="gap-y-6 grid">
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-1.5 text-base">
                    Template Name
                    <Required />
                  </label>
                  <input
                    id="name"
                    value={data?.name}
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter Template Name"
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 h-[45px] px-4 py-2 rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="website" className="mb-1.5 text-base">
                    Template Link
                    <Required />
                  </label>
                  <input
                    id="website"
                    value={data?.website}
                    onChange={(e) => {
                      setData({ ...data, website: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter Template Link"
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-t-gray-100/30 px-[5vw] w-full flex items-center justify-end py-6 mt-10 mainText20">
            <button
              onClick={() => {}}
              className={`text-white bg-newBlue w-[170px] h-12 rounded-lg`}
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
