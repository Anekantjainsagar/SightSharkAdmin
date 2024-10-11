"use client";
import React, { useContext } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AgencySmallBlock from "@/app/Components/Agencies/AgencySmallBlock";
import Image from "next/image";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Notify from "@/app/Components/Overview/Notify";
import { useRouter } from "next/navigation";
import Context from "../Context/Context";

const Overview = () => {
  const { agencies } = useContext(Context);
  const history = useRouter();

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full py-2 px-6 min-[1600px]:py-6">
            <div className="grid grid-cols-4 gap-x-6">
              {[
                {
                  name: "Total Clients",
                  value: 20,
                  img: "/Overview/Icons/total.png",
                },
                {
                  name: "Active Clients",
                  value: 10,
                  img: "/Overview/Icons/active.png",
                },
                {
                  name: "Dashboard Views",
                  value: 5,
                  img: "/Overview/Icons/dashboard.png",
                },
                {
                  name: "Satisfaction Score",
                  value: 25,
                  img: "/Overview/Icons/satisfaction.png",
                },
              ].map((e, i) => {
                return (
                  <div
                    key={i}
                    className="bg-[#171C2A]/50 flex items-center justify-between p-4 min-[1600px]:p-6 border border-gray-500/5 rounded-xl"
                  >
                    <div>
                      <p className="text-sm min-[1600px]:text-base text-[#CECFD2]">
                        {e?.name}
                      </p>
                      <p className="text-[20px] min-[1600px]:text-[30px] font-semibold mt-1">
                        {e?.value}
                      </p>
                    </div>
                    <Image
                      src={e.img}
                      alt={e.img?.src}
                      width={1000}
                      height={1000}
                      className="w-[50px] min-[1600px]:w-[60px] aspect-square"
                    />
                  </div>
                );
              })}
            </div>
            <div className="text-white w-full rounded-xl p-4 bg-[#171C2A]/20 border border-gray-500/5 mt-4 min-[1600px]:mt-6">
              <h3 className="mainText20">Agencies</h3>
              <div className="mt-4 border border-gray-200/5 rounded-2xl">
                <div className="grid bg-[#030021]/40 py-3.5 px-7 agencySmallBlockGrid items-center rounded-2xl">
                  <div className="inline-flex items-start">
                    <label className="relative flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-6 w-6 rounded-md cursor-pointer appearance-none border-2 border-[#343745] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-16 before:w-16 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
                        id="check"
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
                  {[
                    "Agency Name",
                    "Status",
                    "Onboarding Date",
                    "Deployment Date",
                  ].map((e, i) => {
                    return (
                      <h5
                        key={i}
                        className={`text-sm min-[1600px]:text-base ${
                          e?.includes("Name")
                            ? "text-start min-[1600px]:ml-0 ml-1"
                            : "text-center"
                        } font-light tracking-wider`}
                      >
                        {e}
                      </h5>
                    );
                  })}
                </div>
                <div className="h-[26vh] overflow-y-auto small-scroller">
                  {agencies?.slice(0, 10)?.map((e, i) => {
                    return (
                      <AgencySmallBlock data={e} key={i} status={"Active"} />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="text-white w-full rounded-xl p-4 bg-[#171C2A]/20 border border-gray-500/5 mt-4 min-[1600px]:mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[20px]">Critical Notifications</h3>{" "}
                <p
                  className="text-white text-sm min-[1600px]:text-base flex items-center cursor-pointer"
                  onClick={() => {
                    history.push("/overview/critical-notification");
                  }}
                >
                  View All
                  <HiOutlineArrowNarrowRight className="text-xl ml-2" />
                </p>
              </div>
              <div className="gradient-line my-4"></div>
              <div className="h-[15vh] overflow-y-auto small-scroller">
                <Notify status={true} />
                <Notify status={false} />
                <Notify status={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
