"use client";
import React, { useContext, useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import AgencyDetails from "@/app/Components/Agencies/AgencyDetails";
import AgencyDetailsTopbar from "@/app/Components/Agencies/AgencyDetailsTopbar";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import AddTemplates from "../../Components/Agencies/AddTemplates";
import AddDataSouces from "../../Components/Agencies/AddDataSources";
import Context from "@/app/Context/Context";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

function formatName(input) {
  return input
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const Overview = ({ params }) => {
  const [addDataSouces, setAddDataSouces] = useState(false);
  const [addTemplates, setAddTemplates] = useState(false);
  const [editTemplates, setEditTemplates] = useState(false);
  const {
    agencies,
    getTemplates,
    agency_templates,
    getAgencyDataSources,
    agencyDatasources,
  } = useContext(Context);
  const [data, setData] = useState();
  const { name } = params;

  useEffect(() => {
    let temp = agencies?.data?.find((e) => {
      return e?.agency_name?.replaceAll(" ", "-") == name;
    });
    setData(temp);
    getTemplates(temp?.agency_id);
    getAgencyDataSources(temp?.agency_id);
  }, [name, agencies]);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />{" "}
      <AddDataSouces
        showSubscribe={addDataSouces}
        original_data={data}
        setShowSubscribe={setAddDataSouces}
      />
      <AddTemplates
        showSubscribe={addTemplates}
        original_data={data}
        setShowSubscribe={setAddTemplates}
      />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg flex flex-row-reverse items-start justify-between px-6">
            <AgencyDetails data={data} />
            <div className="w-[69%]">
              <AgencyDetailsTopbar name={name} />
              <div className="border border-gray-500/5 h-[83vh] w-full rounded-lg p-3 min-[1600px]:p-4">
                <div className="bg-[#171C2A]/40 p-3 min-[1600px]:p-4 rounded-2xl border border-gray-500/5">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="min-[1600px]:text-xl">
                      Data Sources ({agencyDatasources?.length})
                    </h4>
                    <button
                      onClick={(e) => {
                        setAddDataSouces(!addDataSouces);
                      }}
                      className="bg-newBlue px-5 w-[170px] min-[1600px]:w-[185px] justify-center py-2.5 min-[1600px]:py-3 rounded-xl flex items-center gap-x-2 text-sm min-[1600px]:text-base"
                    >
                      <FaPlus className="text-sm" /> Add Source
                    </button>
                  </div>
                  <div className="gradient-line my-4"></div>
                  {agencyDatasources?.length > 0 ? (
                    <div className="bg-[#171C2A] grid grid-cols-4 gap-y-2 rounded-lg p-3 min-[1600px]:p-4 h-[12vh] overflow-y-auto small-scroller">
                      {agencyDatasources?.map((e, i) => {
                        return (
                          <div
                            key={i}
                            className="flex h-fit items-center px-2 py-1 rounded-full"
                          >
                            <div className="flex rounded-lg items-center justify-center bg-gradient-to-b from-[#1664FF]/10 to-[#1664FF]/50 from-[75%] w-7 min-[1600px]:w-8 aspect-square p-1.5 mr-3">
                              <Image
                                src={e?.img_link}
                                alt={e?.img_link?.src}
                                width={1000}
                                height={1000}
                                className="object-contain"
                              />
                            </div>
                            <p className="text-sm min-[1600px]:text-base">
                              {formatName(e?.name)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-[#171C2A] rounded-lg p-3 min-[1600px]:p-4 text-center">
                      No Data Sources Available Please Add some of the Data
                      Sources
                    </div>
                  )}
                </div>
                <div className="bg-[#171C2A]/40 p-3 min-[1600px]:p-4 rounded-2xl border border-gray-500/5 my-3 min-[1600px]:my-4">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="min-[1600px]:text-xl relative flex items-center">
                      Templates{" "}
                      {editTemplates ? (
                        <AiOutlineClose
                          className="text-lg text-gray-200 ml-3 cursor-pointer"
                          onClick={() => setEditTemplates(!editTemplates)}
                        />
                      ) : (
                        <FaRegEdit
                          className="text-lg text-gray-200 ml-3 cursor-pointer"
                          onClick={() => setEditTemplates(!editTemplates)}
                        />
                      )}
                    </h4>
                    <button
                      onClick={() => {
                        setAddTemplates(!addTemplates);
                      }}
                      className="bg-newBlue px-5 py-2.5 min-[1600px]:py-3 w-[170px] min-[1600px]:w-[185px] rounded-xl flex items-center justify-center gap-x-2 text-sm min-[1600px]:text-base"
                    >
                      <FaPlus className="text-sm" /> Add Template
                    </button>
                  </div>
                  <div className="gradient-line my-4"></div>
                  <div className="h-[41.5vh]">
                    {agency_templates?.length > 0 ? (
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {agency_templates?.map((e, i) => {
                          return (
                            <TemplateBlock
                              data={e}
                              key={i}
                              idx={i}
                              editTemplates={editTemplates}
                              setEditTemplates={setEditTemplates}
                              original_data={data}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <div className="mt-2 text-center">
                        No Templates Available Please Add some of the Templates
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateBlock = ({
  data,
  editTemplates,
  setEditTemplates,
  original_data,
}) => {
  const { agency_templates, getTemplates } = useContext(Context);

  return (
    <div
      className="border border-gray-400/10 hover:border-gray-400/40 rounded-xl p-1 relative cursor-pointer hover:scale-105 transition-all"
      onClick={() => {
        window.open(data?.template_link, "__blank");
      }}
    >
      {editTemplates && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-0 left-0 w-full h-full bg-red-800/10 flex items-center justify-center text-4xl"
        >
          <AiOutlineDelete
            className="bg-gray-600/90 p-1.5 rounded-full cursor-pointer"
            onClick={() => {
              try {
                axios
                  .post(
                    `${BACKEND_URI}/template/update`,
                    {
                      agency_id: original_data?.agency_id,
                      template_ids: agency_templates
                        ?.filter((e) => e?.id != data?.id)
                        ?.map((e) => e?.id),
                    },
                    {
                      headers: {
                        Accept:
                          "application/json, application/xml, text/plain, text/html, *.*",
                        Authorization: `Bearer ${getCookie("token")}`,
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((res) => {
                    if (res.status) {
                      toast.success("Template deleted successfully");
                      setEditTemplates(false);
                      getTemplates(original_data?.agency_id);
                    }
                  })
                  .catch((err) => {
                    console.error("Error creating user:", err);
                    toast.error("An error occurred while creating the user");
                  });
              } catch (error) {
                console.error("Unexpected error:", error);
                toast.error("An unexpected error occurred");
              }
            }}
          />
        </div>
      )}
      {data?.template_image && (
        <Image
          src={data?.template_image}
          alt={data?.template_image?.src}
          width={1000}
          height={1000}
          className="rounded-md h-[20vh] object-cover p-1"
        />
      )}
      <p className="text-center text-sm my-1 mx-auto py-1">
        {data?.template_name}
      </p>
    </div>
  );
};

export default Overview;
