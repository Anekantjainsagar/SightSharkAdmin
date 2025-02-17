"use client";
import React, { useContext, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Context from "../Context/Context";
import Image from "next/image";
import { IoReload } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { BACKEND_URI } from "../utils/url";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

function formatName(input) {
  return input
    ?.split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const DataSources = () => {
  const { platformsData, getDataSourcesDataFromAPI } = useContext(Context);

  const refreshByAgencyId = async (id, platformList) => {
    let platforms = platformList?.map((e) => e?.platform_name);

    try {
      const token = getCookie("token");

      const response = await fetch(
        `${BACKEND_URI}/data-refresh/${id}/data-refresh-all`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(platforms),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData?.message?.includes("Failed")) {
        toast.error(responseData.message);
      } else {
        toast.success(responseData.message);
      }
      getDataSourcesDataFromAPI();
    } catch (err) {
      console.error("Fetch Error:", err.message);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg py-2 px-6 min-[1600px]:py-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl min-[1600px]:text-2xl font-semibold">
                Data Sources
              </h3>
              <div></div>
            </div>
            <div className="overflow-y-auto mt-5 h-[78vh] rounded-2xl small-scroller">
              {platformsData?.filter((e) => {
                if (e?.platforms) {
                  return e;
                }
              })?.length == 0 ? (
                <div className="flex items-center justify-center w-full text-gray-400">
                  No Data Sources Available
                </div>
              ) : (
                platformsData
                  ?.filter((e) => {
                    if (e?.platforms) {
                      return e;
                    }
                  })
                  ?.map((e, i) => {
                    return (
                      <div
                        key={i}
                        className="border px-6 py-5 mb-10 rounded-2xl border-gray-200/5 bg-[#171C2A]/20"
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="text-2xl">{e?.agency_name}</h5>
                          <button
                            onClick={() => {
                              refreshByAgencyId(e?.agency_id, e?.platforms);
                            }}
                            className="bg-newBlue text-white flex items-center gap-x-2 rounded-lg px-6 py-3"
                          >
                            <TfiReload />
                            Refresh All
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-8 mt-5">
                          {e?.platforms?.map((data, i) => {
                            return <Block key={i} e={data} data={e} />;
                          })}
                        </div>
                      </div>
                    );
                  })
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Block = ({ e, data }) => {
  const { getDataSourcesDataFromAPI } = useContext(Context);
  const [isRotating, setIsRotating] = useState(false);

  const handleReloadClick = async () => {
    setIsRotating(true);
    try {
      const token = getCookie("token");

      const response = await fetch(
        `${BACKEND_URI}/data-refresh/?agency_id=${data?.agency_id}&script_name=${e?.platform_name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData?.message?.includes("Failed")) {
        toast.error(responseData.message);
      } else {
        toast.success(responseData.message);
      }
      getDataSourcesDataFromAPI();
    } catch (err) {
      console.error("Fetch Error:", err.message);
      toast.error("Internal Server Error");
    }

    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  return (
    <div className="bg-[#171C2A]/50 rounded-xl p-2 border border-gray-300/5">
      <div className="h-[15vh] rounded-2xl cursor-pointer flex flex-col text-white justify-center items-center lg:px-0 px-1">
        <Image
          src={e?.logo_link}
          alt={e?.logo_link?.src}
          width={1000}
          height={1000}
          className="aspect-square object-contain w-2/12"
        />
        <p className="text-sm text-center min-[1600px]:text-base cursor-pointer mt-2">
          {formatName(e?.platform_name)}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-between px-2">
        <p className="text-[10px] min-[1600px]:text-xs cursor-pointer">
          Last Refresh Time
          <br />
          {new Date(e?.last_refreshed).toString().slice(4, 21)}
        </p>
        <IoReload
          className={`text-lg cursor-pointer transition-transform ${
            isRotating ? "animate-spin" : ""
          }`}
          onClick={handleReloadClick}
        />
      </div>
    </div>
  );
};

export default DataSources;
