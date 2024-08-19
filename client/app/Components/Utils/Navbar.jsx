import Context from "@/app/Context/Context";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { FaSortDown } from "react-icons/fa";

const Navbar = () => {
  const { userData } = useContext(Context);

  return (
    <div className="text-white py-4 flex items-center justify-between w-full">
      <div>
        <h3 className="text-3xl font-semibold">Hello {userData?.name},</h3>
        <p className="text-sm">Here’s your overview of the agencies</p>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search your query"
          className="outline-none border border-gray-200/40 bg-transparent px-4 glass py-1.5 rounded-lg"
        />
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s"
          alt="user img"
          width={1000}
          height={1000}
          className="w-[2.5vw] ml-4 rounded-full"
        />
        <FaSortDown className="text-2xl" ml-1 />
      </div>
    </div>
  );
};

export default Navbar;
