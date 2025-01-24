"use client";
import Context from "@/app/Context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const history = useRouter();
  const {
    userData,
    setSearchTextAgency,
    searchTextAgency,
    filteredAgencies,
    allTemplates,
    filteredCriticals,
    filteredUsers,
    filteredAlerts,
    platformsData,
  } = useContext(Context);

  return (
    <div className="text-white py-6 flex items-center justify-between w-full px-6">
      <h3 className="bigFont font-semibold">Hello {userData?.first_name},</h3>
      <div className="relative flex items-center w-[340px] min-[1600px]:w-[500px]">
        <FaSearch className="absolute left-4 z-40 text-white" />{" "}
        <form autoComplete="off" className="w-full relative">
          <input type="text" style={{ display: "none" }} />
          <input
            type="search"
            placeholder="Search"
            autoCorrect="false"
            autoComplete="off"
            value={searchTextAgency}
            onChange={(e) => {
              setSearchTextAgency(e.target.value);
            }}
            className="outline-none text-sm min-[1600px]:text-base border border-gray-200/5 px-6 bg-gray-700/60 backdrop-blur-sm z-10 py-2 min-[1600px]:py-3 rounded-lg pl-12 w-full"
          />
          {pathname === "/overview" && searchTextAgency && (
            <div className="absolute right-0 top-16 w-[500px] bg-main rounded-md min-h-[15vh] max-h-[20vh] small-scroller z-20 overflow-y-auto p-2">
              <Title
                text="Agencies"
                condition={filteredAgencies?.data?.length > 0}
              />
              {filteredAgencies?.data?.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                    onClick={() => {
                      history.push(
                        `/agencies/${e?.agency_name?.replaceAll(" ", "-")}`
                      );
                      setSearchTextAgency("");
                    }}
                  >
                    <p className="w-5/12 break-words">{e?.agency_name}</p>
                    <p className="text-sm">{`/agencies/${e?.agency_name?.replaceAll(
                      " ",
                      "-"
                    )}`}</p>
                  </div>
                );
              })}
              {allTemplates?.length > 0 && <Line />}
              <Title text="Templates" condition={allTemplates?.length > 0} />
              {allTemplates?.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                    onClick={() => {
                      history.push(`/templates`);
                      setSearchTextAgency("");
                    }}
                  >
                    <p className="w-full break-words">{e?.template_name}</p>
                    {/* <p className="text-sm">{`/agencies/${e?.agency_name?.replaceAll(
                      " ",
                      "-"
                    )}`}</p> */}
                  </div>
                );
              })}{" "}
              {platformsData?.length > 0 && <Line />}
              <Title
                text="Data Sources"
                condition={platformsData?.length > 0}
              />
              {platformsData?.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                    onClick={() => {
                      history.push(`/data-sources`);
                      setSearchTextAgency("");
                    }}
                  >
                    <p className="w-full break-words">{e?.agency_name}</p>
                    {/* <p className="text-sm">{`/agencies/${e?.agency_name?.replaceAll(
                      " ",
                      "-"
                    )}`}</p> */}
                  </div>
                );
              })}{" "}
              {filteredUsers?.data?.length > 0 && <Line />}
              <Title text="Users" condition={filteredUsers?.data?.length > 0} />
              {filteredUsers?.data?.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                    onClick={() => {
                      history.push(`/users`);
                      setSearchTextAgency("");
                    }}
                  >
                    <p className="w-full break-words">
                      {e?.first_name + " " + e?.last_name}
                    </p>
                    {/* <p className="text-sm">{`/agencies/${e?.agency_name?.replaceAll(
                      " ",
                      "-"
                    )}`}</p> */}
                  </div>
                );
              })}{" "}
              {filteredCriticals?.notifications?.length > 0 && <Line />}
              <Title
                text="Critical Notifications"
                condition={filteredCriticals?.notifications?.length > 0}
              />
              {filteredCriticals?.notifications?.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                    onClick={() => {
                      history.push(`/alerts`);
                      setSearchTextAgency("");
                    }}
                  >
                    <p className="w-full break-words">{e?.message}</p>
                  </div>
                );
              })}{" "}
              {filteredAlerts?.alerts?.length > 0 && <Line />}
              <Title
                text="Alerts"
                condition={filteredAlerts?.alerts?.length > 0}
              />
              {filteredAlerts?.alerts?.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                    onClick={() => {
                      history.push(`/alerts`);
                      setSearchTextAgency("");
                    }}
                  >
                    <p className="w-full break-words">{e?.message}</p>
                  </div>
                );
              })}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const Title = ({ text, condition }) => {
  return (
    condition && <p className="text-gray-200 px-2 py-0.5 text-sm">{text}</p>
  );
};

const Line = () => {
  return <div className="h-[1px] w-11/12 my-3 bg-gray-300/10 mx-auto"></div>;
};

export default Navbar;
