"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { CiGrid41, CiSettings, CiWallet } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import Cookies from "js-cookie";

const Leftbar = () => {
  const pathname = usePathname();
  const history = useRouter();
  let mainRoutes = [
    {
      title: "Overview",
      icon: <CiGrid41 className="text-2xl" />,
      route: "/overview",
    },
    {
      title: "Agencies",
      icon: <IoNewspaperOutline className="text-2xl" />,
      route: "/agencies",
    },
    {
      title: "Users",
      icon: <CiWallet className="text-2xl" />,
      route: "/users",
    },
  ];
  let settingRoutes = [
    {
      title: "Settings",
      icon: <CiSettings className="text-2xl" />,
      route: "/settings",
    },
    {
      title: "Help",
      icon: <IoIosHelpCircleOutline className="text-2xl" />,
      route: "/help",
    },
  ];

  return (
    <div className="bg-main w-[13%] text-white h-full py-5 flex flex-col items-center justify-between">
      <div>
        <div className="flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={1000}
            height={1000}
            className="w-[2vw]"
          />
          <h1 className="mainLogoSize font-bold ml-3">sightshark</h1>
        </div>
        <div className="gradient-line my-8"></div>
        <div className="">
          <p className="text-gray-400 mb-3 text-[12px]">MAIN</p>
          {mainRoutes?.map((e, i) => {
            return (
              <div
                key={i}
                className={`flex items-center py-2 rounded-xl cursor-pointer px-4 mb-2 mainText14 ${
                  pathname.includes(e?.route)
                    ? "radialGradient border border-gray-200/10"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  history.push(e?.route);
                }}
              >
                {e?.icon} <p className="ml-4">{e?.title}</p>
              </div>
            );
          })}
        </div>
        <div className="gradient-line my-8"></div>{" "}
        <div className="">
          <p className="text-gray-400 mb-3 text-[12px]">SETTINGS</p>
          {settingRoutes?.map((e, i) => {
            return (
              <div
                key={i}
                className={`flex items-center py-2 rounded-xl cursor-pointer px-4 mb-2 mainText14 ${
                  pathname.includes(e?.route)
                    ? "radialGradient border border-gray-200/10"
                    : "text-gray-400"
                }`}
              >
                {e?.icon} <p className="ml-4">{e?.title}</p>
              </div>
            );
          })}
        </div>
      </div>{" "}
      <div
        className={`flex items-center py-2 rounded-xl cursor-pointer text-[#D93F21]`}
        onClick={() => {
          Cookies.remove("token");
          history.push("/");
        }}
      >
        <AiOutlineLogout className="mainText14" />{" "}
        <p className="ml-4 mainText14">Logout</p>
      </div>
    </div>
  );
};

export default Leftbar;
