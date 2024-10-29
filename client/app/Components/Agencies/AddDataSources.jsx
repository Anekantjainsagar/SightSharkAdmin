"use client";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
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

const AddDataSouces = ({ showSubscribe, setShowSubscribe }) => {
  let maxPage = 2;
  const { datasources, setSelectedDataSources, selectedDataSources } =
    useContext(Context);
  const [search, setSearch] = useState("");
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
          />{" "}
          <div className="flex items-center px-[10vw]">
            <div className="bg-newBlue w-[3vw] aspect-square rounded-full flex items-center justify-center text-[20px]">
              {page > 1 ? <IoMdCheckmark /> : "1"}
            </div>
            <div
              className={`line h-[1px] w-full ${
                page >= 2 ? "bg-newBlue" : "bg-[#343745]"
              }`}
            ></div>
            <div
              className={`w-[3vw] aspect-square rounded-full ${
                page >= 2
                  ? "bg-newBlue"
                  : "border border-gray-500/20 bg-[#343745]"
              } flex items-center justify-center text-[20px]`}
            >
              {page > 2 ? <IoMdCheckmark /> : "2"}
            </div>
          </div>
          <div className="items-center grid grid-cols-2 text-sm min-[1600px]:text-base mb-10 px-[8vw] mt-2">
            <p className="text-start pl-2">Data Sources</p>
            <p className="text-end">Data Sources Details</p>
          </div>
          <div className="h-[45vh] min-[1600px]:h-[40vh]">
            {page == 1 ? (
              <div className="px-[4vw] h-[45vh] min-[1600px]:h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
                <div className="relative flex items-center w-[350px] min-[1600px]:w-[456px]">
                  <FaSearch className="absolute left-4 z-40 text-white" />{" "}
                  {/* Search Icon */}
                  <input
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    className="outline-none text-sm min-[1600px]:text-base border border-gray-500/20 px-6 bg-[#898989]/15 py-1.5 min-[1600px]:py-2 rounded-lg pl-12 w-full" // Add padding to the left for the icon
                  />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-5">
                  {datasources
                    ?.filter((e) => {
                      if (search) {
                        return e?.name
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase());
                      }
                      return e;
                    })
                    .map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between border border-gray-300/30 px-3 py-3 rounded-full"
                        >
                          <div className="flex items-center">
                            <Image
                              src={e?.img_link}
                              alt={e?.img_link?.src}
                              width={1000}
                              height={1000}
                              className="min-[1600px]:w-8 min-[1600px]:h-8 w-6 h-6 mr-2 aspect-squre object-contain"
                            />
                            <label
                              htmlFor={e?.name}
                              className="text-[13px] min-[1600px]:text-base cursor-pointer"
                            >
                              {e?.name}
                            </label>
                          </div>
                          <div className="inline-flex items-start mr-1">
                            <label className="relative flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                id={e?.name}
                                onChange={(e) => {
                                  let name = e?.target?.id;
                                  if (selectedDataSources?.includes(name)) {
                                    let temp = selectedDataSources?.filter(
                                      (e) => e != name
                                    );
                                    setSelectedDataSources(temp);
                                  } else {
                                    setSelectedDataSources([
                                      ...selectedDataSources,
                                      name,
                                    ]);
                                  }
                                }}
                                checked={selectedDataSources?.includes(e?.name)}
                                className="before:content[''] peer relative min-[1600px]:h-6 min-[1600px]:w-6 w-5 h-5 rounded-full cursor-pointer appearance-none border-2 border-[#343745] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-16 before:w-16 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
                              />
                              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="min-[1600px]:h-4 min-[1600px]:w-4 w-3 h-3"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </span>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className="px-[4vw] h-[45vh] min-[1600px]:h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
                <div className="grid grid-cols-1 gap-3">
                  {selectedDataSources
                    ?.map((id) => datasources?.find((e) => e?.name === id))
                    ?.map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="border border-gray-300/10 p-2 rounded-lg flex items-center justify-center"
                        >
                          <div className="flex flex-col items-center justify-center w-[30%]">
                            <Image
                              src={e?.img_link}
                              alt={e?.img_link?.src}
                              width={1000}
                              height={1000}
                              className="min-[1600px]:w-12 min-[1600px]:h-12 w-6 h-6 mr-2 aspect-squre object-contain"
                            />
                            <h6 className="mt-2 text-lg">{e?.name}</h6>
                          </div>
                          <div className="w-[1px] mx-5 h-full bg-gray-300/10"></div>
                          <div className="w-[70%]">
                            <div className="grid grid-cols-3 w-full px-4 py-1">
                              <p className="text-[13px] min-[1600px]:text-base cursor-pointer">
                                {e?.name}
                              </p>
                              <p>Track</p>
                              <p>Show Fields</p>
                            </div>
                            {e?.tables.map((el, i) => {
                              return (
                                <div
                                  key={i}
                                  className="w-full grid grid-cols-3 rounded-md py-1.5 border border-gray-500/5 px-4 text-gray-300"
                                >
                                  <label
                                    htmlFor={el}
                                    className="cursor-pointer"
                                  >
                                    {el}
                                  </label>{" "}
                                  <div className="inline-flex items-start">
                                    <label className="relative flex items-center cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked
                                        className="before:content[''] peer relative h-6 w-6 rounded-md cursor-pointer appearance-none border-2 border-[#343745] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-16 before:w-16 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
                                        id={el}
                                      />
                                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                          stroke="currentColor"
                                          strokeWidth="1"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          ></path>
                                        </svg>
                                      </span>
                                    </label>
                                  </div>
                                  <p className="text-blue-500 underline cursor-pointer">
                                    Show Fields
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </div>
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
                } else {
                  setPage(page + 1);
                }
              }}
              className={`text-white text-base min-[1600px]:text-lg bg-newBlue w-[150px] min-[1600px]:w-[170px] h-10 min-[1600px]:h-12 rounded-lg`}
            >
              {page == maxPage ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddDataSouces;
