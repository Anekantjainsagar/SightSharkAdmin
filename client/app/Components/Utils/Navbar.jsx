"use client";
import Context from "@/app/Context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const history = useRouter();
  const { userData, setSearchTextAgency, searchTextAgency, filteredAgencies } =
    useContext(Context);

  return (
    <div className="text-white py-6 flex items-center justify-between w-full px-6">
      <h3 className="bigFont font-semibold">Hello {userData?.first_name},</h3>
      <div className="relative flex items-center w-[340px] min-[1600px]:w-[500px]">
        <FaSearch className="absolute left-4 z-40 text-white" />{" "}
        <form autoComplete="off" className="w-full relative">
          <input type="text" style={{ display: "none" }} />
          <input
            type="search"
            placeholder="Search"
            autoCorrect="false"
            autoComplete="off"
            value={searchTextAgency}
            onChange={(e) => {
              setSearchTextAgency(e.target.value);
            }}
            className="outline-none text-sm w-full min-[1600px]:text-base border border-gray-200/5 bg-transparent px-6 bg-gray-700/60 backdrop-blur-sm z-10 py-2 min-[1600px]:py-3 rounded-lg pl-12 w-full"
          />
          {pathname !== "/agencies" && searchTextAgency && (
            <div className="absolute right-0 top-16 w-[500px] bg-main rounded-md min-h-[15vh] z-20 overflow-y-auto p-2">
              {filteredAgencies?.data?.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                    onClick={() => {
                      history.push(`/agencies/${e?.agency_name}`);
                      setSearchTextAgency("");
                    }}
                  >
                    <p>
                      {i + 1}. {e?.agency_name}
                    </p>
                    <p>{new Date(e?.created_at).toString()?.slice(4, 21)}</p>
                  </div>
                );
              })}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Navbar;
