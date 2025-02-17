"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import Context from "@/app/Context/Context";
import axios from "axios";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";

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
    width: "65vw",
    border: "none",
  },
};

function formatName(input) {
  return input
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const AddDataSouces = ({ showSubscribe, setShowSubscribe, original_data }) => {
  let maxPage = 2;
  const {
    datasources,
    setSelectedDataSources,
    selectedDataSources,
    agencyDatasources,
    getAgencyDataSources,
  } = useContext(Context);
  const [checkedTables, setCheckedTables] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  function closeModal() {
    setShowSubscribe(false);
  }

  useEffect(() => {
    if (agencyDatasources) {
      setSelectedDataSources(agencyDatasources);
      setCheckedTables(
        agencyDatasources.reduce((acc, platform) => {
          acc[platform.name] = [];
          return acc;
        }, {})
      );
      const mappedTables = agencyDatasources.reduce((acc, item) => {
        acc[item.name] = item.tables;
        return acc;
      }, {});
      setCheckedTables(mappedTables);
    }
  }, [agencyDatasources]);

  return (
    <div className="z-50">
      <Modal
        isOpen={showSubscribe}
        onRequestCl2ose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative rounded-lg bg-main text-white">
          <div className="bg-newBubbleColor/10 w-[20vw] h-[30vh] absolute left-20 top-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="bg-newBubbleColor/10 w-[15vw] h-[15vw] right-0 absolute top-3/6 rounded-full"></div>
          <div className="bg-newBubbleColor/10 w-[15vw] h-[15vw] right-20 absolute bottom-10 rounded-full"></div>
          <div className="relative flex mt-5 backdrop-blur-3xl rounded-lg">
            <AiOutlineClose
              size={40}
              onClick={closeModal}
              className="absolute right-2 top-2 px-1.5 text-lg text-white/60 cursor-pointer z-50"
            />
            <div className="w-[24%] flex items-start pl-10 py-10 bg-main rounded-lg">
              <div className="flex flex-col items-center justify-between h-[20vh]">
                {[1, 2].map((e, i, arr) => {
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`${
                          page > i + 1
                            ? "bg-transparent border-2 border-newBlue"
                            : page == i + 1
                            ? "bg-newBlue border-2 border-transparent"
                            : "border-2 border-gray-500/20 bg-transparent"
                        } w-[15vw] md:w-[2.5vw] aspect-square rounded-full flex items-center justify-center text-lg min-[1600px]:text-[24px]`}
                      >
                        {page > i + 1 ? <IoMdCheckmark /> : i + 1}
                      </div>
                      {arr.length - 1 !== i && (
                        <div
                          className={`h-[103px] w-[1px] ${
                            page > i + 1 ? "bg-newBlue" : "bg-[#343745]"
                          }`}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="items-start py-2 pl-5 flex flex-col justify-between h-[21vh] text-sm min-[1600px]:text-base">
                {["Data Sources", "Data Sources Details"].map((e, i) => {
                  return (
                    <p className={``} key={i}>
                      {e}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="w-[76%] px-10 pb-10 pt-14 flex flex-col items-start justify-between relative z-40">
              {page == 1 ? (
                <div className="h-[45vh] min-[1600px]:h-[40vh] overflow-y-auto overflow-x-hidden small-scroller w-full">
                  <div className="relative flex items-center w-[350px] min-[1600px]:w-[456px]">
                    <FaSearch className="absolute left-4 z-40 text-white" />{" "}
                    {/* Search Icon */}
                    <input
                      type="search"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      className="outline-none text-sm min-[1600px]:text-base border border-gray-500/20 px-6 bg-[#898989]/15 py-1.5 min-[1600px]:py-2 rounded-lg pl-12 w-full" // Add padding to the left for the icon
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-5">
                    {datasources
                      ?.filter((e) => {
                        if (search) {
                          return e?.name
                            ?.toLowerCase()
                            ?.includes(search?.toLowerCase());
                        }
                        return e;
                      })
                      .map((e, i) => {
                        return (
                          <div
                            key={i}
                            className="flex items-center justify-between border border-gray-300/30 p-3 rounded-full"
                          >
                            <div className="flex items-center w-full">
                              <Image
                                src={e?.img_link}
                                alt={e?.img_link?.src}
                                width={1000}
                                height={1000}
                                className="min-[1600px]:w-8 min-[1600px]:h-8 w-6 h-6 mr-2.5 aspect-squre object-contain"
                              />
                              <p className="text-[13px] min-[1600px]:text-base cursor-pointer">
                                {formatName(e?.name)}
                              </p>
                            </div>
                            <div className="inline-flex items-start mr-0.5 w-3/12 justify-end">
                              <label className="relative flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  id={`${e?.name}_source`}
                                  onChange={(e) => {
                                    let name = e?.target?.id;

                                    if (
                                      selectedDataSources?.find(
                                        (e) => e?.name == name
                                      )
                                    ) {
                                      let temp = selectedDataSources?.filter(
                                        (e) => e?.name != name
                                      );
                                      setSelectedDataSources(temp);
                                    } else {
                                      setSelectedDataSources([
                                        ...selectedDataSources,
                                        datasources?.find(
                                          (e) => e?.name === name
                                        ),
                                      ]);
                                    }
                                  }}
                                  checked={selectedDataSources?.find(
                                    (el) => el?.name == e?.name
                                  )}
                                  className="before:content[''] peer relative min-[1600px]:h-6 min-[1600px]:w-6 w-5 h-5 rounded-full cursor-pointer appearance-none border-2 border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-16 before:w-16 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
                                />
                                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="min-[1600px]:h-4 min-[1600px]:w-4 w-3 h-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : (
                <Page2
                  setCheckedTables={setCheckedTables}
                  checkedTables={checkedTables}
                />
              )}{" "}
              <div className="w-full flex items-center justify-between mt-10 mainText20">
                <button
                  className={`text-white text-base min-[1600px]:text-lg w-[150px] min-[1600px]:w-[170px] ${
                    page == 1 ? "bg-[#898989]/15" : "bg-newBlue cursor-pointer"
                  } h-10 min-[1600px]:h-12 rounded-lg`}
                  disabled={page == 1}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (page === maxPage) {
                      const combined = selectedDataSources.map((item) => ({
                        ...item,
                        tables: checkedTables[item.name] || item.tables,
                      }));
                      const difference = agencyDatasources.filter(
                        (selected) =>
                          !selectedDataSources.some(
                            (agency) => agency.name === selected.name
                          )
                      );
                      const agencyId = original_data?.agency_id; // Make sure `original_data` is the correct variable for agency_id

                      if (combined?.length > 0 && agencyId) {
                        let cookie = getCookie("token");

                        Promise.all(
                          combined.map((item) => {
                            const platformName = item.name; // Assuming `item.name` represents the platform name
                            const tableNames = item.tables || []; // Ensure table names are an array

                            // API call for each item
                            return axios.post(
                              `${BACKEND_URI}/assign_script/update_tables?agency_id=${agencyId}&platform_name=${platformName}`,
                              { table_names: tableNames },
                              {
                                headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                  Authorization: `Bearer ${cookie}`,
                                },
                              }
                            );
                          })
                        )
                          .then(() => {
                            toast.success("Tables added successfully!");
                            setShowSubscribe(false);
                            getAgencyDataSources(original_data?.agency_id);
                          })
                          .catch((error) => {
                            console.error("Error adding tables", error);
                            toast.error("Error adding tables");
                          });
                      } else {
                        toast.error("Please select at least 1 data source");
                      }
                      if (difference?.length > 0 && agencyId) {
                        let cookie = getCookie("token");

                        Promise.all(
                          difference.map((item) => {
                            const platformName = item.name;

                            return axios.post(
                              `${BACKEND_URI}/assign_script/remove_platform?agency_id=${agencyId.trim()}&platform_name=${platformName.trim()}`,
                              {},
                              {
                                headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                  Authorization: `Bearer ${cookie}`,
                                },
                              }
                            );
                          })
                        )
                          .then(() => {
                            toast.success("Tables removed successfully!");
                            setShowSubscribe(false);
                            getAgencyDataSources(original_data?.agency_id);
                          })
                          .catch((error) => {
                            if (
                              error.response &&
                              error.response.status === 401
                            ) {
                              toast.error(
                                "Authentication failed. Please log in again."
                              );
                            } else {
                              console.error("Error adding tables", error);
                              toast.error("Error adding tables");
                            }
                          });
                      }
                    } else {
                      setPage(page + 1);
                    }
                  }}
                  className={`text-white text-base min-[1600px]:text-lg bg-newBlue w-[150px] min-[1600px]:w-[170px] h-10 min-[1600px]:h-12 rounded-lg`}
                >
                  {page == maxPage ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Page2 = ({ checkedTables, setCheckedTables }) => {
  const { selectedDataSources } = useContext(Context);

  useEffect(() => {
    if (Object?.keys(checkedTables)?.length == 0) {
      setCheckedTables(
        selectedDataSources.reduce((acc, platform) => {
          acc[platform.name] = [];
          return acc;
        }, {})
      );
    }
  }, [selectedDataSources]);

  return (
    <div className="h-[45vh] min-[1600px]:h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
      {selectedDataSources?.length == 0 ? (
        <div className="flex items-center justify-center w-full text-gray-400">
          No Data Sources Selected
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {selectedDataSources?.map((e, i) => (
            <Block
              e={e}
              key={i}
              checkedTables={checkedTables}
              setCheckedTables={setCheckedTables}
              i={i}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Block = ({ e, checkedTables, setCheckedTables, i }) => {
  const { selectedDataSources, datasources } = useContext(Context);

  const handleCheckboxChange = (sourceIndex, table, isChecked) => {
    const platformName = selectedDataSources[sourceIndex].name;

    setCheckedTables((prevCheckedTables) => {
      const newCheckedTables = { ...prevCheckedTables };

      // Ensure newCheckedTables[platformName] is initialized as an array
      if (!Array.isArray(newCheckedTables[platformName])) {
        newCheckedTables[platformName] = [];
      }

      if (isChecked) {
        newCheckedTables[platformName] = [
          ...newCheckedTables[platformName],
          table,
        ];
      } else {
        newCheckedTables[platformName] = newCheckedTables[platformName].filter(
          (t) => t !== table
        );
      }

      return newCheckedTables;
    });
  };

  return (
    <div className="border border-gray-300/10 p-2 rounded-lg flex flex-col items-center justify-center">
      <div className="gap-x-2 px-2 flex items-center justify-start w-full">
        <img
          src={e?.img_link}
          alt={e?.name}
          width={1000}
          height={1000}
          className="min-[1600px]:w-9 min-[1600px]:h-9 w-4 h-4 mr-2 aspect-square object-contain"
        />
        <p>{formatName(e?.name)}</p>
      </div>
      <div className="w-full h-[1px] bg-gray-300/10 my-3"></div>
      <div className="grid grid-cols-3 w-full gap-1">
        <div className="flex items-start gap-x-2.5 w-full rounded-md p-2 text-gray-200">
          <div className="inline-flex items-start">
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                id={`${e?.name}_source`}
                checked={
                  checkedTables[e?.name]?.length ===
                  datasources?.find((item) => item?.name === e?.name)?.tables
                    ?.length
                }
                className="peer relative h-6 w-6 rounded-md cursor-pointer appearance-none border-2 border-[#343745] transition-all"
                onChange={(event) => {
                  let platformName = e?.name;
                  if (event?.target?.checked) {
                    setCheckedTables((prevCheckedTables) => {
                      const newCheckedTables = { ...prevCheckedTables };
                      newCheckedTables[platformName] = datasources?.find(
                        (item) => item?.name === e?.name
                      )?.tables;
                      return newCheckedTables;
                    });
                  } else {
                    setCheckedTables((prevCheckedTables) => {
                      let newCheckedTables = { ...prevCheckedTables };
                      delete newCheckedTables[platformName];
                      return newCheckedTables;
                    });
                  }
                }}
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
          <label className="cursor-pointer">Select All</label>
        </div>
        {checkedTables &&
          datasources &&
          datasources
            ?.find((item) => item?.name === e?.name)
            ?.tables.map((table, index) => {
              return (
                <Row
                  table={table}
                  key={index}
                  i={i}
                  checkedTables={checkedTables}
                  handleCheckboxChange={handleCheckboxChange}
                  platformName={e?.name}
                />
              );
            })}
      </div>
    </div>
  );
};

const Row = ({
  table,
  i,
  platformName,
  checkedTables,
  handleCheckboxChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (checkedTables) {
      let checkIfTrue = checkedTables[platformName]?.includes(table);
      if (checkIfTrue) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
  }, [checkedTables]);

  return (
    <div className="flex items-start gap-x-2.5 w-full rounded-md p-2 text-gray-200">
      <div className="inline-flex items-start">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            className="peer relative h-6 w-6 rounded-md cursor-pointer appearance-none border-2 border-[#343745] transition-all"
            id={table}
            onChange={(event) =>
              handleCheckboxChange(i, table, event.target.checked)
            }
          />
          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
      </div>
      <label htmlFor={table} className="cursor-pointer">
        {formatName(table)?.replaceAll("Ga4", "GA4")}
      </label>
    </div>
  );
};

export default AddDataSouces;
