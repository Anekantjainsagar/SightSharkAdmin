"use client";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import TemplateBlock from "../Components/Agencies/TemplateBlock";
import { useContext } from "react";
import Context from "../Context/Context";

const TemplatePage = () => {
  const { agency_templates } = useContext(Context);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg py-2 px-6 min-[1600px]:py-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl min-[1600px]:text-2xl font-semibold">
                Templates
              </h3>
              <div></div>
            </div>
            <div className="overflow-y-auto mt-5 p-4 h-[78vh] gap-4 bg-[#171C2A]/20 rounded-2xl small-scroller border border-gray-500/10">
              <div className="grid grid-cols-4 gap-4">
                {agency_templates?.map((e, i) => {
                  return (
                    <TemplateBlock
                      data={e}
                      key={i}
                      original_data={{}}
                      showDeleteTemplate={false}
                      setShowDeleteTemplate={() => {}}
                    />
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

export default TemplatePage;
