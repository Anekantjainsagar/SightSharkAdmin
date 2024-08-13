import Image from "next/image";
import React from "react";

const LoginNav = () => {
  return (
    <div className="flex items-center text-white text-3xl font-bold w-full">
      <Image
        src={"/logo.png"}
        alt="Main logo"
        width={1000}
        height={1000}
        className="w-[2.25vw] mr-3"
      />
      <h1>sightshark</h1>
    </div>
  );
};

export default LoginNav;
