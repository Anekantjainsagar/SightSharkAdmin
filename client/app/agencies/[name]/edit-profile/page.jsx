"use client";
import React, { useContext, useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import AgencyDetails from "@/app/Components/Agencies/AgencyDetails";
import AgencyDetailsTopbar from "@/app/Components/Agencies/AgencyDetailsTopbar";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import DeleteAgency from "@/app/Components/Agencies/DeleteAgency";
import Info from "@/app/Components/Login/Info";
import { useRouter } from "next/navigation";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import Required from "@/app/Components/Utils/Required";
import Context from "@/app/Context/Context";
import axios from "axios";

let databar = [
  "Agency Details",
  "Key Contact Information",
  "Portal Deployment",
];

const Overview = ({ params }) => {
  const [status, setStatus] = useState("Active");
  const [comment, setComment] = useState("");
  const [selected, setSelected] = useState("Agency Details");
  const [deleteAgency, setDeleteAgency] = useState(false);
  const [original_data, setOriginal_data] = useState();
  const [file, setFile] = useState("");
  const [data, setData] = useState({
    name: "",
    profile: "",
    website: "",
    location: "",
    warrenty: 3,
    deployment: "",
    license: "",
    keyContact: {
      name: "",
      profile: "",
      designation: "",
      email: "",
      phone: "",
    },
    dataSources: [],
    serviceAcc: { acc1: "", acc2: "" },
    agency_id: "",
    project_id: "",
    region: "",
    profile_picture: "",
    project_number: "",
  });
  const fileInputRef = React.useRef(null);
  const fileInputRef2 = React.useRef(null);
  const [serviceAcc1, setserviceAcc1] = useState();
  const [serviceAcc2, setserviceAcc2] = useState();
  const { agencies, getAgencies } = useContext(Context);
  const { name } = params;
  const history = useRouter();

  const setDetails = (temp) => {
    setData({
      name: temp?.agency_name,
      website: temp?.website,
      location: temp?.location,
      warrenty: temp?.warranty_period,
      license: temp?.license_limit,
      deployment: temp?.deployment_date,
      agency_id: temp?.agency_id,
      project_id: temp?.project_id,
      region: temp?.region,
      project_number: temp?.project_number,
      keyContact: {
        name: temp?.key_contact_name,
        designation: temp?.key_contact_designation,
        phone: temp?.key_contact_phone,
        email: temp?.key_contact_email_address,
      },
      serviceAcc: {
        acc1: temp?.service_account_cloud,
        acc2: temp?.service_account_api,
      },
    });
    setStatus(temp?.status);
    setFile(temp?.profile_picture);
  };

  useEffect(() => {
    let temp = agencies?.data?.find((e) => {
      return e?.agency_name?.replaceAll(" ", "-") == name;
    });
    setOriginal_data(temp);
    setDetails(temp);
  }, [name, agencies]);

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      setData({ ...data, profile_picture: file });
    } else {
      console.log("No file selected");
    }
  };

  const handleClearFile = () => {
    setserviceAcc1(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setData({
      ...data,
      serviceAcc: {
        ...data.serviceAcc,
        acc1: "",
      },
    });
  };

  const handleClearFile2 = () => {
    setserviceAcc2(null);
    if (fileInputRef2.current) {
      fileInputRef2.current.value = "";
    }
    setData({
      ...data,
      serviceAcc: {
        ...data.serviceAcc,
        acc2: "",
      },
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setserviceAcc1(file);
    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result);
          setData({
            ...data,
            serviceAcc: {
              ...data.serviceAcc,
              acc1: JSON.stringify(content),
            },
          });
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
      };

      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid JSON file.");
    }
  };

  const handleFileUpload2 = (event) => {
    const file = event.target.files[0];
    setserviceAcc2(file);
    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result);
          setData({
            ...data,
            serviceAcc: {
              ...data.serviceAcc,
              acc2: JSON.stringify(content),
            },
          });
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
      };

      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid JSON file.");
    }
  };

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <DeleteAgency
        showSubscribe={deleteAgency}
        setShowSubscribe={setDeleteAgency}
        name={data?.name}
        id={data?.agency_id}
      />

      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg flex flex-row-reverse items-start justify-between px-6">
            <AgencyDetails data={original_data} />
            <div className="w-[69%] min-[1600px]:h-[82vh] h-fit">
              <AgencyDetailsTopbar name={name} />
              <div className="border border-gray-500/5 min-[1600px]:h-[83vh] h-fit w-full rounded-lg p-3 min-[1600px]:p-4 flex flex-col justify-between">
                <div className="h-[90%]">
                  <div className="flex items-center">
                    {databar.map((e, i) => {
                      return (
                        <h4
                          key={i}
                          className={`min-[1600px]:text-lg cursor-pointer mr-5 ${
                            selected === e ? "text-blue-600" : "text-gray-300"
                          }`}
                          onClick={() => {
                            setSelected(e);
                          }}
                        >
                          {e}
                        </h4>
                      );
                    })}
                  </div>
                  <div className="gradient-line min-[1600px]:my-4 my-2"></div>
                  {selected == databar[0] ? (
                    <div className="flex items-start justify-between mt-4 px-3">
                      <div className="flex items-center w-1/12">
                        <div className="relative flex items-center justify-center">
                          <div
                            onClick={() => {
                              fileInputRef.current.click();
                            }}
                            className="absolute bg-newBlue text-xl py-1.5 px-1.5 -bottom-1 cursor-pointer -right-1 rounded-full"
                          >
                            <BiPencil />
                          </div>{" "}
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChangeProfile}
                          />
                          <Image
                            src={file ? file : "/Agency/individual/logo.png"}
                            alt="Agency Img"
                            width={1000}
                            height={1000}
                            className="rounded-full aspect-square object-cover border border-gray-300/30"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-11/12 pl-[2vw]">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                          >
                            Agency Name
                            <Required />
                          </label>
                          <input
                            id="name"
                            value={data?.name}
                            onChange={(e) => {
                              setData({ ...data, name: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter Agency Name"
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="website"
                            className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                          >
                            Website <Required />
                          </label>
                          <input
                            id="website"
                            value={data?.website}
                            onChange={(e) => {
                              setData({ ...data, website: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter Website"
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="location"
                            className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                          >
                            Location
                          </label>
                          <input
                            id="location"
                            value={data?.location}
                            onChange={(e) => {
                              setData({ ...data, location: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter Location"
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="warrenty"
                            className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                          >
                            Warranty Period <Required />
                          </label>
                          <div className="custom-select-wrapper w-full">
                            <select
                              value={data?.warrenty}
                              onChange={(e) => {
                                setData({ ...data, warrenty: e.target.value });
                              }}
                              className="bg-[#898989]/15 w-full outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                            >
                              {[3, 6, 9, 12, 15, 18, 21, 24].map((e, i) => {
                                return (
                                  <option value={e} key={i} className="bg-main">
                                    {e} Months
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="deployment"
                            className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                          >
                            Deployment Date <Required />
                          </label>
                          <input
                            id="deployment"
                            value={data?.deployment}
                            onChange={(e) => {
                              setData({
                                ...data,
                                deployment: e.target.value,
                              });
                            }}
                            type="date"
                            placeholder="Enter deployment Period"
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="license"
                            className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                          >
                            License Limit
                          </label>
                          <input
                            id="license"
                            value={data?.license}
                            onChange={(e) => {
                              setData({ ...data, license: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter License Limit"
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>{" "}
                        <div className="flex flex-col">
                          <label
                            htmlFor="status"
                            className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                          >
                            Status
                          </label>
                          <select
                            name="status"
                            id="status"
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            {["active", "offline", "hold"].map((e, i) => {
                              return (
                                <option value={e} key={i} className="bg-main">
                                  {e[0]?.toUpperCase() + e.slice(1)}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="comment"
                            className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                          >
                            Comment
                          </label>
                          <input
                            id="comment"
                            value={comment}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                            type="text"
                            placeholder="Enter Comment"
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ) : selected === databar[1] ? (
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-4 px-3">
                      <div className="flex flex-col">
                        <label
                          htmlFor="namekey"
                          className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                        >
                          Name
                        </label>
                        <input
                          id="namekey"
                          value={data?.keyContact?.name}
                          onChange={(e) => {
                            setData({
                              ...data,
                              keyContact: {
                                ...data?.keyContact,
                                name: e.target.value,
                              },
                            });
                          }}
                          type="text"
                          placeholder="Enter Name"
                          className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="designation"
                          className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                        >
                          Designation
                        </label>
                        <input
                          id="designation"
                          value={data?.keyContact?.designation}
                          onChange={(e) => {
                            setData({
                              ...data,
                              keyContact: {
                                ...data?.keyContact,
                                designation: e.target.value,
                              },
                            });
                          }}
                          type="text"
                          placeholder="Enter Designation"
                          className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="email"
                          className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          value={data?.keyContact?.email}
                          onChange={(e) => {
                            setData({
                              ...data,
                              keyContact: {
                                ...data?.keyContact,
                                email: e.target.value,
                              },
                            });
                          }}
                          type="email"
                          placeholder="Enter Email Address"
                          className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="phone"
                          className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                        >
                          Phone no.
                        </label>
                        <input
                          id="phone"
                          value={data?.keyContact?.phone}
                          onChange={(e) => {
                            setData({
                              ...data,
                              keyContact: {
                                ...data?.keyContact,
                                phone: e.target.value,
                              },
                            });
                          }}
                          type="number"
                          placeholder="Enter Phone no."
                          className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start justify-between mt-4 px-3">
                      <div className="w-full">
                        <div className="grid grid-cols-2 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                          <div className="flex flex-col">
                            <label
                              htmlFor="project_number"
                              className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                            >
                              Project Number
                              <Required />
                            </label>
                            <input
                              id="project_number"
                              value={data?.project_number}
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  project_number: e.target.value,
                                });
                              }}
                              type="text"
                              placeholder="Enter Project Number"
                              className="bg-[#898989]/15 outline-none border border-gray-500/20 h-[45px] text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="project_id"
                              className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                            >
                              Project ID
                              <Required />
                            </label>
                            <input
                              id="project_id"
                              value={data?.project_id}
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  project_id: e.target.value,
                                });
                              }}
                              type="text"
                              placeholder="Enter Project ID"
                              className="bg-[#898989]/15 outline-none h-[45px] border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="region"
                              className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                            >
                              Region <Required />
                            </label>
                            <input
                              id="region"
                              value={data?.region}
                              onChange={(e) => {
                                setData({ ...data, region: e.target.value });
                              }}
                              type="text"
                              placeholder="Enter Region"
                              className="bg-[#898989]/15 outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                            />
                          </div>
                        </div>{" "}
                        <div className="flex items-center justify-between mt-8">
                          <label
                            htmlFor="switchAcc1"
                            className="mb-1.5 text-base flex items-center"
                          >
                            Service Account 1
                            <Info text="Manages internal google cloud services" />
                          </label>
                          <div className="flex items-center">
                            {/* Custom File Input */}
                            <label
                              className={`border border-gray-300/20 py-1 ${
                                serviceAcc1 ? "px-4" : "px-1"
                              } rounded-md cursor-pointer`}
                            >
                              {/* Show file name or "Replace file" */}
                              {serviceAcc1 ? serviceAcc1.name : "Replace file"}
                              <input
                                type="file"
                                onChange={handleFileUpload}
                                ref={fileInputRef}
                                style={{ display: "none" }} // Hide the input
                              />
                            </label>

                            {serviceAcc1 && (
                              <AiOutlineClose
                                className="text-lg cursor-pointer ml-2"
                                onClick={handleClearFile}
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-5">
                          <label
                            htmlFor="switchAcc2"
                            className="mb-1.5 text-base flex items-center"
                          >
                            Service Account 2
                            <Info text="Manages internal google cloud services" />
                          </label>
                          <div className="flex items-center">
                            {/* Custom File Input */}
                            <label
                              className={`border border-gray-300/20 py-1 ${
                                serviceAcc2 ? "px-4" : "px-1"
                              } rounded-md cursor-pointer`}
                            >
                              {/* Show file name or "Replace file" */}
                              {serviceAcc2 ? serviceAcc2.name : "Replace file"}
                              <input
                                type="file"
                                onChange={handleFileUpload2}
                                ref={fileInputRef2}
                                style={{ display: "none" }} // Hide the input
                              />
                            </label>

                            {serviceAcc2 && (
                              <AiOutlineClose
                                className="text-lg cursor-pointer ml-2"
                                onClick={handleClearFile2}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex h-[10%] items-center justify-between min-[1600px]:mt-0 mt-6">
                  <button
                    className={`bg-red-600 min-[1600px]:font-semibold min-[1600px]:px-8 px-5 py-2 min-[1600px]:text-base text-sm rounded-xl min-[1600px]:rounded-xl flex items-center ml-4`}
                    onClick={() => {
                      setDeleteAgency(!deleteAgency);
                    }}
                  >
                    <MdDelete className="mr-1 text-xl" />
                    Delete Agency
                  </button>
                  <div>
                    <button
                      className={`bg-[#898989]/15 min-[1600px]:font-semibold min-[1600px]:px-8 px-5 py-2 min-[1600px]:text-base text-sm rounded-xl min-[1600px]:rounded-xl ml-4`}
                      onClick={() => {
                        setDetails(original_data);
                        toast.success("Changes Discarded");
                      }}
                    >
                      Discard
                    </button>
                    <button
                      className={`bg-newBlue min-[1600px]:font-semibold min-[1600px]:px-8 px-5 py-2 min-[1600px]:text-base text-sm rounded-xl min-[1600px]:rounded-xl ml-4`}
                      onClick={() => {
                        if (
                          data?.name &&
                          data?.website &&
                          data?.warrenty &&
                          data?.license &&
                          data?.keyContact?.email
                        ) {
                          const queryParams = new URLSearchParams({
                            agency_name: data?.name.trim(),
                            warranty_period: parseInt(data?.warrenty),
                            deployment_date: data?.deployment,
                            license_limit: data?.license,
                            key_contact_name: data?.keyContact?.name,
                            key_contact_designation:
                              data?.keyContact?.designation,
                            key_contact_email_address: data?.keyContact?.email,
                            key_contact_phone: data?.keyContact?.phone,
                            service_account_cloud: data?.serviceAcc?.acc1,
                            service_account_api: data?.serviceAcc?.acc2,
                            status,
                            ...data,
                          }).toString();

                          console.log(data?.profile_picture);

                          const formData = new FormData();
                          formData.append(
                            "profile_picture",
                            data?.profile_picture ? data?.profile_picture : ""
                          );
                          formData.append(
                            "profile_picture_filename",
                            data?.profile_picture?.name
                              ? data?.profile_picture?.name
                              : ""
                          );
                          formData.append(
                            "profile_picture_content_type",
                            data?.profile_picture?.type
                              ? data?.profile_picture?.type
                              : ""
                          );

                          try {
                            axios
                              .put(
                                `${BACKEND_URI}/agency/update/${data?.agency_id}?${queryParams}`,
                                formData,
                                {
                                  headers: {
                                    Accept:
                                      "application/json, application/xml, text/plain, text/html, *.*",
                                    Authorization: `Bearer ${getCookie(
                                      "token"
                                    )}`,
                                  },
                                }
                              )
                              .then((res) => {
                                if (res.data.msg) {
                                  getAgencies();
                                  toast.success("Agency updated successfully");
                                  history.push(
                                    `/agencies/${data?.name
                                      .trim()
                                      ?.replaceAll(" ", "-")}/edit-profile`
                                  );
                                }
                                if (res.detail) {
                                  toast.error(res.detail);
                                }
                              })
                              .catch((err) => {
                                console.log("Error aagya");
                                console.log(err);
                              });
                          } catch (error) {
                            console.log("Error aagya H bhai");
                            console.log(error);
                          }
                        } else {
                          toast.error("Please fill all the details");
                        }
                      }}
                    >
                      Save
                    </button>
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

export default Overview;
