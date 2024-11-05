"use client";
import React, { useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import { BACKEND_URI } from "../utils/url";
import { getCookie } from "cookies-next";

const State = (props) => {
  const [userData, setUserData] = useState();
  const [users, setUsers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [agency_templates, setAgency_templates] = useState([]);
  const [datasources, setDatasources] = useState();
  const [selectedDataSources, setSelectedDataSources] = useState([]);
  const [agencyDatasources, setAgencyDatasources] = useState();
  const [selectedAgencies, setSelectedAgencies] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const checkToken = () => {
    let cookie = getCookie("token");
    if (cookie?.length > 5) {
      try {
        axios
          .get(`${BACKEND_URI}/user/me`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            setUserData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUsers = (grow, order_by) => {
    let cookie = getCookie("token");
    let page = users?.current_page ? users?.current_page : 1;
    let limit = users?.limit ? users?.limit : 7;
    let order = users?.order == "asc" ? "desc" : "asc";
    let sort_by = "created_at";

    if (grow == "inc") {
      page++;
    } else if (grow == "dec") {
      page--;
    }
    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/user/users?offset=${
              (page - 1) * limit
            }&limit=${limit}&sort_by=${sort_by}&order=${order}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then((res) => {
            if (res.data?.data?.length > 0) {
              setUsers(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAgencies = (grow, order_by = "created_at", type = "asc") => {
    let cookie = getCookie("token");
    let page = agencies?.current_page ? agencies?.current_page : 1;
    let limit = agencies?.limit ? agencies?.limit : 8;
    if (grow == "inc") {
      page++;
    } else if (grow == "dec") {
      page--;
    }

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/agency/agencies?offset=${
              (page - 1) * limit
            }&limit=${limit}&sort_by=${order_by}&order=${
              type ? "asc" : "desc"
            }`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then((res) => {
            if (res.data.data?.length > 0) {
              setAgencies(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getTemplates = (id) => {
    let cookie = getCookie("token");
    setAgency_templates([]);
    if (cookie?.length > 5 && id) {
      try {
        axios
          .get(`${BACKEND_URI}/template/templates?agency_id=${id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            setAgency_templates(res.data.templates);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getDataSources = () => {
    let cookie = getCookie("token");
    if (cookie?.length > 5) {
      try {
        axios
          .get(`${BACKEND_URI}/platform/platforms`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then(async (res) => {
            const transformedPlatforms = res.data.platforms.map((platform) => {
              const [name, img_link] = Object.entries(platform)[0];
              return { name, img_link };
            });

            const results = await Promise.all(
              transformedPlatforms.map((source) =>
                axios
                  .get(
                    `${BACKEND_URI}/platform/tables?platform_name=${source.name}`,
                    {
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookie}`,
                      },
                    }
                  )
                  .then((res) => ({
                    ...source,
                    tables: res.data.tables,
                  }))
              )
            );

            setDatasources(results);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAgencyDataSources = (id) => {
    let cookie = getCookie("token");
    setAgencyDatasources([]);
    if (cookie?.length > 5) {
      try {
        axios
          .get(`${BACKEND_URI}/assign_script/platform?agency_id=${id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then(async (res) => {
            const transformedPlatforms = res.data.platforms.map((platform) => {
              const [name, img_link] = Object.entries(platform)[0];
              return { name, img_link };
            });

            const results = await Promise.all(
              transformedPlatforms.map((source) =>
                axios
                  .get(
                    `${BACKEND_URI}/assign_script/tables?agency_id=${id}&platform_name=${source.name}`,
                    {
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookie}`,
                      },
                    }
                  )
                  .then((res) => ({
                    ...source,
                    tables: res.data.tables,
                  }))
              )
            );

            setAgencyDatasources(results);
            // setDatasources(results);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    getAgencies();
    getUsers();
    getDataSources();
  }, [userData]);

  return (
    <Context.Provider
      value={{
        userData,
        checkToken,
        setUsers,
        getUsers,
        agency_templates,
        getTemplates,
        users,
        datasources,
        getDataSources,
        agencies,
        getAgencies,
        setAgencies,
        setSelectedDataSources,
        selectedDataSources,
        getAgencyDataSources,
        agencyDatasources,
        setSelectedAgencies,
        selectedAgencies,
        selectedUsers,
        setSelectedUsers,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
