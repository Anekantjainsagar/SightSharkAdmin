import React, { useState } from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import DeleteTemplate from "@/app/Components/Agencies/DeleteTemplate";

const TemplateBlock = ({
  data,
  showDeleteTemplate,
  setShowDeleteTemplate,
  original_data,
}) => {
  const [deleteTemplate, setDeleteTemplate] = useState(false);

  return (
    <div
      className="border border-gray-400/20 hover:border-white rounded-xl p-1 relative cursor-pointer hover:scale-105 transition-all"
      onClick={() => {
        window.open(data?.template_link, "__blank");
      }}
    >
      <DeleteTemplate
        showSubscribe={deleteTemplate}
        setShowSubscribe={setDeleteTemplate}
        name={data?.template_name}
        id={original_data?.agency_id}
      />
      {data?.template_image && (
        <Image
          src={data?.template_image}
          alt={data?.template_image?.src}
          width={1000}
          height={1000}
          className="rounded-md h-[16vh] object-cover"
        />
      )}
      <p className="text-center text-sm my-1 mx-auto">{data?.template_name}</p>
      {showDeleteTemplate && (
        <div
          className="absolute w-full h-full flex items-center justify-center top-0 text-3xl left-0 bg-red-400/10 rounded-xl cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteTemplate(true);
            setShowDeleteTemplate(false);
          }}
        >
          <MdDelete />
        </div>
      )}
    </div>
  );
};

export default TemplateBlock;
