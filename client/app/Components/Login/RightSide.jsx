import React from "react";
import IconCloud from "@/app/Components/Animations/Cloud";
import Image from "next/image";

const RightSide = () => {
  return (
    <div className="w-5/12 relative p-[3vw] flex flex-col items-center justify-between bg-gradient-to-br from-gradientMain/50 from-[50%] to-black/50 h-full">
      {" "}
      <div className="w-10/12 flex items-center justify-center">
        <IconCloud
          iconSlugs={[
            "amazon",
            "facebook",
            "googleads",
            "googleanalytics",
            "googlesearchconsole",
            "googlesheets",
            "hubspot",
            "instagram",
            "linkedin",
            "paypal",
            "shopify",
            "stripe",
            "xero",
            "youtube",
            "mysql",
            "amazonrds",
            "amazonredshift",
            "googlebigquery",
            "googlecloudstorage",
            "postgresql",
            "snowflake",
          ]}
        />
      </div>
      <Image
        src="/design_elements/blue_ellipse.png"
        alt="Blue ellipse"
        width={1000}
        height={1000}
        className="absolute left-1/2 -translate-x-1/2 bottom-5 w-10/12"
      />
      <div className="p-[2vw] glass rounded-xl">
        <button className="bg-btnBlue text-white px-5 py-2 text-xl rounded-md">
          👍 Data Sources
        </button>
        <p className="text-white text-2xl mt-5">
          Today, we create innovative solutions to the challenges that consumers
          face in both their everyday lives and events.
        </p>
      </div>
    </div>
  );
};

export default RightSide;
