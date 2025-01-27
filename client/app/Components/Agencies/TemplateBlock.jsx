import React, { useState } from "react";
import Image from "next/image";
import DeleteTemplate from "@/app/Components/Agencies/DeleteTemplate";
import { BsThreeDotsVertical } from "react-icons/bs";
import { UpdateMainTemplates } from "./AddMainTemplates";

const TemplateBlock = ({ data, showActions }) => {
  const [deleteTemplate, setDeleteTemplate] = useState(false);
  const [editTemplates, setEditTemplates] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className="absolute">
        <UpdateMainTemplates
          showSubscribe={editTemplates}
          setShowSubscribe={setEditTemplates}
          original_data={data}
        />
        <DeleteTemplate
          showSubscribe={deleteTemplate}
          setShowSubscribe={setDeleteTemplate}
          name={data?.template_name}
          id={data?.id}
        />
      </div>
      <div
        className="border border-gray-400/10 hover:border-gray-400/40 rounded-xl p-1 relative cursor-pointer hover:scale-105 transition-all"
        onClick={() => {
          window.open(data?.template_link, "__blank");
        }}
      >
        {showActions && (
          <BsThreeDotsVertical
            onClick={(e) => {
              e.stopPropagation();
              setClicked(!clicked);
            }}
            className="absolute right-3.5 top-3.5 aspect-square rounded-full p-1.5 text-[28px] cursor-pointer hover:bg-gray-800/50 transition-all text-gray-300 bg-gray-800"
          />
        )}
        {clicked && (
          <div
            className={`w-fit md:w-[9vw] absolute right-2 z-50 top-10 shadow-sm text-xs md:text-sm shadow-gray-200/30 bg-main rounded-md`}
          >
            {[
              {
                title: "Edit Template",
                callback: (e) => {
                  e.stopPropagation();
                  setEditTemplates(!editTemplates);
                  setClicked(false);
                },
              },
              {
                title: "Delete Template",
                callback: (e) => {
                  e.stopPropagation();
                  setDeleteTemplate(!deleteTemplate);
                  setClicked(false);
                },
              },
            ]?.map((e, i) => (
              <p
                key={i}
                onClick={e?.callback}
                className="py-2 md:py-3 cursor-pointer px-2 md:px-3 hover:bg-gray-50/20 rounded-md"
              >
                {e?.title}
              </p>
            ))}
          </div>
        )}
        {data?.template_image && (
          <Image
            src={data?.template_image}
            alt={data?.template_image?.src}
            width={1000}
            height={1000}
            className="rounded-xl h-[20vh] object-cover p-1"
          />
        )}
        <p className="text-center text-sm my-1 mx-auto py-1">
          {data?.template_name}
        </p>
      </div>
    </>
  );
};

export default TemplateBlock;
