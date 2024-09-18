"use client";
import React, { useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import AgencyDetails from "@/app/Components/Agencies/AgencyDetails";
import AgencyDetailsTopbar from "@/app/Components/Agencies/AgencyDetailsTopbar";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

const RecentActivites = () => {
  const history = useRouter();

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[87%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5">
          <Navbar />
          <div className="text-white w-full rounded-lg flex items-start justify-between">
            <AgencyDetails />
            <div className="w-[69%] h-[82vh]">
              <AgencyDetailsTopbar />
              <div className="border border-gray-500/5 h-[83vh] w-full rounded-lg p-4">
                <div className="bg-[#171C2A]/40 p-4 rounded-2xl border border-gray-500/5 h-full">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="mainText20">Recent Activity </h4>
                    <p
                      className="text-white text-base flex items-center"
                      onClick={() =>
                        history.push("/agencies/recent-activities")
                      }
                    >
                      View All
                      <HiOutlineArrowNarrowRight className="text-base ml-2" />
                    </p>
                  </div>
                  <div className="gradient-line my-4"></div>
                  <div>
                    {[1, 2, 3, 4].map((e, i) => {
                      return (
                        <div key={i} className="mb-6">
                          <span className="bg-[#5F5F5F]/10 px-4 py-1 w-fit rounded border border-gray-500/20">
                            14 August 2024
                          </span>
                          <div className="mt-4">
                            {[1, 2]?.map((e, i) => {
                              return (
                                <div
                                  key={i}
                                  className={`flex items-center justify-between mb-4`}
                                >
                                  <div className="flex items-center gap-x-3 ml-12">
                                    <Circle />
                                    <h6 className="mainText14">
                                      <span className="font-semibold">
                                        ProWiz Analytics
                                      </span>{" "}
                                      - Assigned “SightShark” Google Ads, Meta
                                      Ads and LinkedIn Ads data sources
                                    </h6>
                                  </div>
                                  <p className="mainText14">02:30 PM</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Circle = () => {
  return (
    <div className="bg-[#FFE8CC] p-2 w-7 rounded-full aspect-square">
      <div className="bg-[#FF8A00] w-full h-full rounded-full"></div>
    </div>
  );
};

export default RecentActivites;
