"use client";
import React, { useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AgencyDetailsBlock from "@/app/Components/Utils/AgencyDetails";
import AddAgency from "@/app/Components/Agencies/AddAgency";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Overview = () => {
  const [addAgency, setAddAgency] = useState(false);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <AddAgency showSubscribe={addAgency} setShowSubscribe={setAddAgency} />
      <div className="gradient-line-vertical"></div>
      <div className="w-[87%] px-10 mainPageBg h-full">
        <Navbar />
        <div className="bg-main border mt-3 border-gray-200/30 text-white py-5 w-full rounded-lg">
          <div className="flex items-center justify-between px-5">
            <h3 className="text-xl font-semibold">
              Agencies{" "}
              <span className="bg-newPurple text-base px-2.5 ml-3 py-0.5 rounded-md">
                25
              </span>
            </h3>
            <div className="flex items-center">
              <button
                onClick={() => {
                  setAddAgency(!addAgency);
                }}
                className="bg-newPurple px-5 py-0.5 rounded-md ml-4"
              >
                + Add Agency
              </button>
              <button className="bg-[#1C2826] text-[#7DBE9E] px-5 py-0.5 rounded-md ml-4">
                Export as CSV
              </button>
              <button className="bg-[#2A2E31] px-5 py-0.5 rounded-md ml-4">
                Sort By
              </button>
            </div>
          </div>
          <div className="grid mt-8 pb-3 px-5 agencyBlockGrid">
            <div className="flex items-center justify-start">
              <input
                type="checkbox"
                className="cursor-pointer w-4 h-4 !bg-main rounded-xl border border-gray-600"
              />
            </div>
            {[
              "Agency Name",
              "Status",
              "Key Contact",
              "Email",
              "Phone",
              "Deployment Date",
              "License Usage",
              "Actions",
            ].map((e, i) => {
              return (
                <h5
                  key={i}
                  className="font-semibold tracking-wider text-center"
                >
                  {e}
                </h5>
              );
            })}
          </div>
          <div className="py-2 h-[72vh] px-3">
            <div className="overflow-y-auto small-scroller h-[95%]">
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
              <AgencyDetailsBlock />
            </div>
            <div className="h-[8%] px-2 flex items-center justify-between">
              <p className="flex items-center">
                Showing 11 Entries{" "}
                <HiOutlineArrowNarrowRight className="ml-2 text-lg" />
              </p>
              <div className="flex items-center">
                <button className="ml-4 cursor-pointer">Prev</button>
                <span className="ml-4 px-2 py-0.5 rounded-md cursor-pointer bg-newPurple">
                  1
                </span>
                <span className="ml-4 px-2 py-0.5 rounded-md cursor-pointer">
                  2
                </span>
                <button className="text-newPurple ml-4 cursor-pointer">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
