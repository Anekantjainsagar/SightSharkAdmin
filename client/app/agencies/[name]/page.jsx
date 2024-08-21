"use client";
import React, { useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import AgencyDetails from "@/app/Components/Agencies/AgencyDetails";
import AgencyDetailsTopbar from "@/app/Components/Agencies/AgencyDetailsTopbar";

const Overview = () => {
  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="gradient-line-vertical"></div>
      <div className="w-[87%] px-10 mainPageBg h-full">
        <Navbar />
        <div className="flex items-start justify-between mt-3 text-white bg-main p-3">
          <AgencyDetails />
          <div className="w-[69%]">
            <AgencyDetailsTopbar />
            <div className="border border-gray-200/30 w-full rounded-lg px-6 py-4">
              <div>
                <h4 className="text-xl">Data Sources :</h4>
                <div className="grid grid-cols-4 gap-y-2 mt-2">
                  {[
                    {
                      img: "/Agency/data-sources/facebook.png",
                      title: "Meta Ads",
                    },
                    {
                      img: "/Agency/data-sources/facebook.png",
                      title: "Meta Insights",
                    },
                    {
                      img: "/Agency/data-sources/google analytics.png",
                      title: "Google Analytics",
                    },
                    {
                      img: "/Agency/data-sources/hubspot.png",
                      title: "HubSpot",
                    },
                    { img: "/Agency/data-sources/amazon.png", title: "Amazon" },
                    {
                      img: "/Agency/data-sources/shopify.png",
                      title: "Shopify",
                    },
                    {
                      img: "/Agency/data-sources/google ads.png",
                      title: "Google Ads",
                    },
                    {
                      img: "/Agency/data-sources/linkedin.png",
                      title: "Linkedin",
                    },
                  ].map((e, i) => {
                    return (
                      <div
                        key={i}
                        className="flex items-center px-2 py-1 rounded-full"
                      >
                        <Image
                          src={e?.img}
                          alt={e?.img?.src}
                          width={1000}
                          height={1000}
                          className="w-[2.5vw] mr-2"
                        />
                        <label htmlFor={e?.title}>{e?.title}</label>
                      </div>
                    );
                  })}
                </div>
              </div>{" "}
              <div className="gradient-line my-6"></div>
              <div>
                <h4 className="text-xl">Templates :</h4>
                <div className="grid grid-cols-4 gap-x-4 mt-2">
                  {[
                    {
                      img: "/Agency/individual/templates/1 (2).png",
                    },
                    {
                      img: "/Agency/individual/templates/1 (1).png",
                    },
                    { img: "/Agency/individual/templates/1 (4).png" },
                    {
                      img: "/Agency/individual/templates/1 (3).png",
                    },
                  ].map((e, i) => {
                    return (
                      <div key={i}>
                        <Image
                          src={e?.img}
                          alt={e?.img?.src}
                          width={1000}
                          height={1000}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>{" "}
              <div className="gradient-line my-6"></div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl">Recent Activity</h3>
                  <p className="text-newGrey flex items-center">
                    View All{" "}
                    <HiOutlineArrowNarrowRight className="text-xl ml-2" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
