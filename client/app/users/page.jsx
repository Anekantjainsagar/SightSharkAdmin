"use client";
import React, { useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AgencyDetailsBlock from "@/app/Components/Utils/AgencyDetails";
import AddAgency from "@/app/Components/Agencies/AddAgency";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Users = () => {
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
            <h3 className="text-lg font-semibold">
              Users{" "}
              <span className="bg-newPurple text-base px-2.5 ml-3 py-0.5 rounded-md">
                25
              </span>
            </h3>
            <div className="flex items-center">
              <button
                onClick={() => {
                  setAddAgency(!addAgency);
                }}
                className="bg-newPurple px-5 py-2 rounded-md ml-4 mainText14"
              >
                + Add Users
              </button>
              <button className="bg-[#2A2E31] mainText14 px-5 py-2 rounded-md ml-4">
                Sort By
              </button>
            </div>
          </div>
          <div className="grid mt-8 pb-3 px-5 agencyBlockGrid">
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                className="cursor-pointer w-4 h-4 !bg-main rounded-xl border border-gray-600"
              />
            </div>
            {["Name", "Access", "Status", "Joined", "Last Online"].map(
              (e, i) => {
                return (
                  <h5
                    key={i}
                    className="font-semibold text-base tracking-wider text-center"
                  >
                    {e}
                  </h5>
                );
              }
            )}
          </div>
          <div className="py-2 h-[70vh] px-3">
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
              <p className="flex items-center mainText14">
                Showing 11 Entries{" "}
                <HiOutlineArrowNarrowRight className="ml-2 text-lg" />
              </p>
              <div className="flex items-center">
                <button className="ml-4 cursor-pointer mainText14">Prev</button>
                <span className="ml-4 px-2 py-0.5 rounded-md cursor-pointer bg-newPurple">
                  1
                </span>
                <span className="ml-4 px-2 py-0.5 rounded-md cursor-pointer">
                  2
                </span>
                <button className="text-newPurple ml-4 cursor-pointer mainText14">
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

export default Users;