"use client";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import Required from "../Utils/Required";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import Context from "@/app/Context/Context";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";

const customStyles = {
  overlay: { zIndex: 50 },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
  },
};

const AddTemplates = ({ showSubscribe, setShowSubscribe, original_data }) => {
  const { getTemplates, allTemplates } = useContext(Context);
  const [ids, setIds] = useState([]);

  function closeModal() {
    setShowSubscribe(false);
  }

  return (
    <div className="z-50">
      <Modal
        isOpen={showSubscribe}
        onRequestCl2ose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative rounded-lg bg-main pt-10 text-white">
          <AiOutlineClose
            size={40}
            onClick={closeModal}
            className="absolute top-2 right-2 px-2 cursor-pointer"
          />
          <h1 className="text-3xl font-medium mb-4 text-center">
            Select Templates
          </h1>
          <div className="px-[3vw] py-2 h-[50vh] w-[70vw] overflow-y-auto small-scroller">
            <div className="grid grid-cols-3 h-fit gap-5">
              {allTemplates?.map((data, i) => {
                return <Block key={i} data={data} ids={ids} setIds={setIds} />;
              })}
            </div>
          </div>
          <div className="border-t border-t-gray-100/30 px-[5vw] w-full flex items-center justify-end py-6 mt-10 text-[15px] min-[1600px]:text-lg">
            <button
              onClick={() => {
                if (ids?.length > 0) {
                  try {
                    try {
                      axios
                        .post(
                          `${BACKEND_URI}/template/update`,
                          {
                            agency_id: original_data?.agency_id,
                            template_ids: ids,
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
                            toast.success("Template added successfully");
                            setShowSubscribe(false);
                            getTemplates(original_data?.agency_id);
                          }
                        })
                        .catch((err) => {
                          console.error("Error creating user:", err);
                          toast.error(
                            "An error occurred while creating the user"
                          );
                        });
                    } catch (error) {
                      console.error("Unexpected error:", error);
                      toast.error("An unexpected error occurred");
                    }
                  } catch (error) {
                    console.error("Unexpected error:", error);
                    toast.error("An unexpected error occurred");
                  }
                } else {
                  toast.error("Please select atleast one template");
                }
              }}
              className={`text-white bg-newBlue w-[150px] min-[1600px]:w-[170px] h-9 min-[1600px]:h-12 rounded-lg`}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Block = ({ data, ids, setIds }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`border border-gray-400/10 hover:border-gray-400/50 rounded-xl z-10 p-1 relative cursor-pointer transition-all`}
      onClick={() => {
        if (selected == false) {
          setIds([...ids, data?.id]);
        } else {
          setIds((prevIds) => {
            let temp = prevIds;
            temp = temp?.filter((e) => e != data?.id);
            return temp;
          });
        }
        setSelected(!selected);
      }}
    >
      {selected && (
        <div className="w-full h-full bg-black/20 rounded-xl absolute left-0 top-0 z-20 p-4 flex items-end justify-end">
          <IoMdCheckmark className="bg-blue-500 text-white text-2xl p-1 rounded-full" />
        </div>
      )}
      <Image
        src={data?.template_image}
        alt={data?.template_image?.src}
        width={1000}
        height={1000}
        className="rounded-md h-[20vh] object-cover p-1"
      />

      <p className="text-center text-sm my-1 mx-auto py-1">
        {data?.template_name}
      </p>
    </div>
  );
};

export default AddTemplates;
