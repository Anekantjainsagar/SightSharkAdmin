"use client";
import React, { useContext } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Context from "../Context/Context";
import Image from "next/image";
import { IoReload } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";

function formatName(input) {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const DataSources = () => {
  const { getAgencies, agencies, datasources } = useContext(Context);

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
                Agencies Data Sources{" "}
                <span className="text-lg min-[1600px]:text-xl text-white/80">
                  ({agencies?.total_count})
                </span>
              </h3>
              <div></div>
            </div>
            <div className="overflow-y-auto mt-5 h-[78vh] rounded-2xl small-scroller">
              {agencies?.data?.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="border px-6 py-5 mb-10 rounded-2xl border-gray-200/5"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="text-2xl">{e?.agency_name}</h5>
                      <button className="bg-newBlue text-white flex items-center gap-x-2 rounded-lg px-6 py-3">
                        <TfiReload />
                        Refresh All
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-8 mt-5">
                      {datasources?.map((e, i) => {
                        return (
                          <div
                            key={i}
                            className="border border-gray-400/20 rounded-2xl p-2"
                          >
                            <div className="py-10 border border-gray-400/20 rounded-2xl cursor-pointer flex flex-col text-white justify-center items-center lg:px-0 px-1 h-fit">
                              <Image
                                src={e?.img_link}
                                alt={e?.img_link?.src}
                                width={1000}
                                height={1000}
                                className="aspect-squre object-contain w-2/12"
                              />{" "}
                              <p className="text-base min-[1600px]:text-lg cursor-pointer mt-2">
                                {formatName(e?.name)}
                              </p>
                            </div>
                            <div className="mt-2 flex items-end justify-between px-2">
                              <p className="text-[10px] min-[1600px]:text-xs cursor-pointer">
                                Last Refresh Time
                                <br />
                                {new Date(Date.now()).toString().slice(4, 21)}
                              </p>
                              <IoReload className="text-lg cursor-pointer" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSources;
