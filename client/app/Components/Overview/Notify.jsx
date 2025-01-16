import React from "react";
import { BiSolidError } from "react-icons/bi";
import { CiCircleInfo } from "react-icons/ci";
import { PiShieldWarningFill } from "react-icons/pi";

const Notify = ({ status, data }) => {
  return (
    <div className="flex items-center justify-between py-1.5 min-[1600px]:py-2">
      <div className="flex items-center">
        <div className="text-xl">
          {data?.type == "error" ? (
            <BiSolidError className="text-red-500" />
          ) : data?.type == "info" ? (
            <CiCircleInfo className="text-green-500" />
          ) : (
            <PiShieldWarningFill className="text-yellow-500" />
          )}
        </div>
        <p className="text-sm min-[1600px]:text-base font-medium ml-4">
          <span className="font-normal mainText14">{data?.message}</span>
        </p>
      </div>
      <p className="text-sm min-[1600px]:text-base">
        {new Date(data?.created_at).toString().slice(4, 21)}
      </p>  
    </div>
  );
};

export default Notify;
