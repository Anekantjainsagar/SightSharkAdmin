"use client";
import Context from "@/app/Context/Context";
import React, { useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const { userData } = useContext(Context);

  return (
    <div className="text-white py-4 flex items-center justify-between w-full">
      <div>
        <h3 className="bigFont font-semibold">Hello {userData?.name},</h3>
        <p className="text-base text-[#85888E]">
          Here’s your overview of the agencies
        </p>
      </div>
      <div className="relative flex items-center w-[500px]">
        <FaSearch className="absolute left-4 z-40 text-white" />{" "}
        {/* Search Icon */}
        <input
          type="search"
          placeholder="Search"
          className="outline-none text-base border border-gray-200/20 bg-transparent px-6 glass py-3 rounded-lg pl-12 w-full" // Add padding to the left for the icon
        />
      </div>
    </div>
  );
};

export default Navbar;
