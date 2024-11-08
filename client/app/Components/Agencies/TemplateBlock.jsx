import Context from "@/app/Context/Context";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import Image from "next/image";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const TemplateBlock = ({
  data,
  showDeleteTemplate,
  setShowDeleteTemplate,
  original_data,
}) => {
  const { getTemplates } = useContext(Context);

  return (
    <div
      className="border border-gray-400/20 hover:border-white rounded-xl p-1 relative cursor-pointer hover:scale-105 transition-all"
      onClick={() => {
        window.open(data?.template_link, "__blank");
      }}
    >
      {data?.template_image && (
        <Image
          src={data?.template_image}
          alt={data?.template_image?.src}
          width={1000}
          height={1000}
          className="rounded-md h-[10vh] object-cover"
        />
      )}
      <p className="text-center text-sm my-1 mx-auto">{data?.template_name}</p>
      {showDeleteTemplate && (
        <div
          className="absolute w-full h-full flex items-center justify-center top-0 text-3xl left-0 bg-red-400/10 rounded-xl cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            let check = confirm(`You're sure deleting ${data?.template_name}`);
            if (check) {
              try {
                fetch(
                  `${BACKEND_URI}/template/remove/template?agency_id=${original_data?.agency_id}&template_name=${data?.template_name}`,
                  {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${getCookie("token")}`,
                    },
                  }
                )
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then((res) => {
                    if (res.msg) {
                      toast.success("Template Deleted Successfully");
                      getTemplates(original_data?.agency_id);
                      setShowDeleteTemplate(false);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } catch (error) {
                console.log(error);
              }
            } else {
              setShowDeleteTemplate(false);
            }
          }}
        >
          <MdDelete />
        </div>
      )}
    </div>
  );
};

export default TemplateBlock;
