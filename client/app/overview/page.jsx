import React from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";

const Overview = () => {
  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="gradient-line-vertical"></div>
      <div className="w-10/12 mainPageBg h-full">
        <Navbar />
      </div>
    </div>
  );
};

export default Overview;
