import Context from "@/app/Context/Context";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const { userData } = useContext(Context);

  return (
    <div className="text-white py-4 flex items-center justify-between w-full">
      <div>
        <h3 className="bigFont font-semibold">Hello {userData?.name},</h3>
        <p className="maintext14">Here’s your overview of the agencies</p>
      </div>
      <div className="flex items-center">
        <div className="relative flex items-center">
          <FaSearch className="absolute left-3 z-40 text-gray-200/40" />{" "}
          {/* Search Icon */}
          <input
            type="search"
            placeholder="Search your query"
            className="outline-none mainText14 border border-gray-200/40 bg-transparent px-4 glass py-1.5 rounded-lg pl-10" // Add padding to the left for the icon
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
