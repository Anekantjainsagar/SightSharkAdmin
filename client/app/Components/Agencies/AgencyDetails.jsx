import Image from "next/image";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const AgencyDetails = () => {
  return (
    <div className="border border-gray-200/30 py-4 px-5 w-[30%] rounded-lg flex flex-col items-center justify-center">
      <Image
        width={1000}
        height={1000}
        src="/Agency/individual/logo.png"
        alt="Agency logo"
        className="w-[5vw] rounded-full"
      />
      <h3 className="mainLogoSize font-semibold">Prowiz Analytics</h3>
      <div className="w-full">
        {[
          {
            img: "/Agency/individual/icons/status.png",
            title: "Status",
            value: "Active",
          },
          {
            img: "/Agency/individual/icons/website.png",
            title: "Website",
            value: "www.prowiz.io",
          },
          {
            img: "/Agency/individual/icons/location.png",
            title: "Location",
            value: "Chandigarh, India",
          },
          {
            img: "/Agency/individual/icons/deployment.png",
            title: "Deployment Date",
            value: "15th August, 2024",
          },
          {
            img: "/Agency/individual/icons/warrenty.png",
            title: "Warrenty Period",
            value: "6 Months",
          },
        ].map((e, i) => {
          return (
            <div
              key={i}
              className="w-full flex items-center justify-between my-2"
            >
              <div className="flex items-center">
                <Image
                  src={e?.img}
                  alt={e?.img?.src}
                  width={1000}
                  height={1000}
                  className="w-[1.5vw]"
                />
                <h6 className="text-newGrey mainText14 ml-2">{e?.title}</h6>
              </div>
              <div
                className={`${
                  e?.title == "Status" ? "text-[#5E8E3E]" : "text-[#597BC3]"
                } flex items-center mainText14`}
              >
                {e?.title == "Status" && (
                  <div className="w-[10px] mr-2 h-[10px] rounded-full bg-[#5E8E3E]"></div>
                )}
                <span>{e?.value}</span>
              </div>
            </div>
          );
        })}
      </div>{" "}
      <h5 className="text-mainBlue w-full mainText18 mt-4 mb-1 font-medium">
        Key Contact Info:
      </h5>
      {[
        {
          img: "/Agency/individual/icons/status.png",
          title: "Name",
          value: "Varun Sethi",
        },
        {
          img: "/Agency/individual/icons/website.png",
          title: "Designation",
          value: "Co-Founder",
        },
        {
          img: "/Agency/individual/icons/location.png",
          title: "Email Address",
          value: "varun@prowiz.io",
        },
        {
          img: "/Agency/individual/icons/deployment.png",
          title: "Phone Number",
          value: "+91 1234567890",
        },
      ].map((e, i) => {
        return (
          <div
            key={i}
            className="w-full flex items-center justify-between my-1.5"
          >
            <h6 className="text-newGrey ml-2 mainText14">{e?.title}</h6>
            <p className={`text-[#597BC3] flex items-center mainText14`}>
              {e?.value}
            </p>
          </div>
        );
      })}{" "}
      <h5 className="text-mainBlue w-full mainText18 mt-4 mb-1 font-medium">
        License Limit:
      </h5>
      <div className="w-6/12 mx-auto relative">
        <p className="text-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-semibold">
          15 <br />
          Used out of 50
        </p>
        <PieChart
          data={[
            { title: "One", value: 50, color: "#FFAE4C" },
            { title: "Two", value: 15, color: "#3836FF" },
          ]}
          lineWidth={25}
        />
      </div>
    </div>
  );
};

export default AgencyDetails;
