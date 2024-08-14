"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { CiGrid41, CiSettings, CiWallet } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";

const Leftbar = () => {
  const pathname = usePathname();
  let mainRoutes = [
    {
      title: "Overview",
      icon: <CiGrid41 className="text-3xl" />,
      route: "/overview",
    },
    {
      title: "Agencies",
      icon: <IoNewspaperOutline className="text-3xl" />,
      route: "/agencies",
    },
    {
      title: "Users",
      icon: <CiWallet className="text-3xl" />,
      route: "/users",
    },
  ];
  let settingRoutes = [
    {
      title: "Settings",
      icon: <CiSettings className="text-3xl" />,
      route: "/settings",
    },
    {
      title: "Help",
      icon: <IoIosHelpCircleOutline className="text-3xl" />,
      route: "/help",
    },
  ];

  return (
    <div className="bg-main w-2/12 text-white h-full py-5">
      <div className="flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={1000}
          height={1000}
          className="w-[2.5vw]"
        />
        <h1 className="text-3xl font-bold ml-3">sightshark</h1>
      </div>
      <div className="gradient-line my-8"></div>
      <div className="px-5">
        <p className="text-gray-400 mb-3 text-sm">MAIN</p>
        {mainRoutes?.map((e, i) => {
          return (
            <div
              key={i}
              className={`flex items-center py-3 rounded-xl cursor-pointer px-4 mb-2 ${
                pathname == e?.route
                  ? "radialGradient border border-gray-200/10"
                  : "text-gray-400"
              }`}
            >
              {e?.icon} <p className="ml-4 text-lg">{e?.title}</p>
            </div>
          );
        })}
      </div>
      <div className="gradient-line my-8"></div>{" "}
      <div className="px-5">
        <p className="text-gray-400 mb-3 text-sm">SETTINGS</p>
        {settingRoutes?.map((e, i) => {
          return (
            <div
              key={i}
              className={`flex items-center py-3 rounded-xl cursor-pointer px-4 mb-2 ${
                pathname == e?.route
                  ? "radialGradient border border-gray-200/10"
                  : "text-gray-400"
              }`}
            >
              {e?.icon} <p className="ml-4 text-lg">{e?.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leftbar;
