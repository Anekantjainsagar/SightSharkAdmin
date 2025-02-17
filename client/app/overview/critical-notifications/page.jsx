"use client";
import React, { useContext, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AddAgency from "@/app/Components/Agencies/AddAgency";
import Notify from "@/app/Components/Overview/Notify";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Context from "../../Context/Context";

const Alerts = () => {
  const { criticalNotifications } = useContext(Context);
  const history = useRouter();
  const [addAgency, setAddAgency] = useState(false);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <AddAgency showSubscribe={addAgency} setShowSubscribe={setAddAgency} />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full py-2 px-6 min-[1600px]:py-6">
            <div className="text-white w-full rounded-xl p-4 bg-[#171C2A]/20 border border-gray-500/5">
              <div className="flex items-center justify-between">
                <h3
                  className={`text-[18px] min-[1600px]:text-[20px] cursor-pointer text-white`}
                >
                  Critical Notifications
                </h3>
                <AiOutlineClose
                  className="min-[1600px]:text-2xl text-lg cursor-pointer"
                  onClick={() => {
                    history.push("/overview");
                  }}
                />
              </div>
              <div className="gradient-line my-4"></div>
              <div className="h-[72vh] pr-5 overflow-y-auto small-scroller">
                {criticalNotifications?.notifications?.map((e, i) => {
                  return (
                    <Notify data={e} key={i} status={e?.type != "error"} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
