"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AgencySmallBlock = ({ data }) => {
  const history = useRouter();

  return (
    <div
      onClick={() => {
        history.push(`/agencies/${data?.agency_name?.replaceAll(" ", "-")}`);
      }}
      className="py-3 px-7 border-gray-400/5 border-y grid agencySmallBlockGrid items-center cursor-pointer text-textGrey "
    >
      <h5 className="text-sm min-[1600px]:text-base min-[1600px]:ml-0 ml-1">
        {data?.agency_name}
      </h5>
      <div className="flex items-center justify-center">
        <div
          className={`status-${data?.status?.toLowerCase()} w-fit p-2 border-2 rounded-2xl`}
        ></div>
      </div>
      <p className="text-center text-sm min-[1600px]:text-base">
        {data?.onboarding_date
          ? new Date(data?.onboarding_date)?.toString()?.slice(4, 21)
          : ""}
      </p>{" "}
      <p className="text-center text-sm min-[1600px]:text-base">
        {data?.created_at
          ? new Date(data?.created_at)?.toString()?.slice(4, 21)
          : ""}
      </p>
    </div>
  );
};

export default AgencySmallBlock;
