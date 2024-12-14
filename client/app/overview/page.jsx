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
  const { agencies, criticalNotifications } = useContext(Context);
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
                  name: "Total Agencies",
                  value: agencies?.total_count,
                  img: "/Overview/Icons/total.png",
                },
                {
                  name: "Active Agencies",
                  value: agencies?.total_count,
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
                  {agencies?.data?.slice(0, 10)?.map((e, i) => {
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
                    history.push("/overview/critical-notifications");
                  }}
                >
                  View All
                  <HiOutlineArrowNarrowRight className="text-xl ml-2" />
                </p>
              </div>
              <div className="gradient-line my-4"></div>
              <div className="h-[15vh] overflow-y-auto small-scroller">
                {criticalNotifications?.map((e, i) => {
                  return (
                    <Notify data={e} key={i} status={e?.type != "error"} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
