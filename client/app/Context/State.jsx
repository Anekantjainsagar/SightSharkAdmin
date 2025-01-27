"use client"; // Mark this component as a Client Component

import axios from "axios";
import Context from "./Context";
import { getCookie } from "cookies-next";
import { BACKEND_URI } from "../utils/url";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { debounce } from "lodash"; // Import debounce directly

const State = (props) => {
  const pathname = usePathname();
  const history = useRouter();
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState();
  const [agencies, setAgencies] = useState([]);
  const [filteredAgencies, setFilteredAgencies] = useState([]);
  const [datasources, setDatasources] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [agency_templates, setAgency_templates] = useState([]);
  const [selectedAgencies, setSelectedAgencies] = useState([]);
  const [agencyDatasources, setAgencyDatasources] = useState();
  const [selectedDataSources, setSelectedDataSources] = useState([]);
  const [searchTextAgency, setSearchTextAgency] = useState("");
  const [platformsData, setPlatformsData] = useState();
  const [criticalNotifications, setCriticalNotifications] = useState([]);
  const [criticalNotificationsLength, setCriticalNotificationsLength] =
    useState(0);
  const [alerts, setAlerts] = useState([]);
  const [alertsLength, setAlertsLength] = useState(0);
  const [activeAgencies, setActiveAgencies] = useState(0);
  const [regions, setRegions] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredCriticals, setFilteredCriticals] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);

  const password_params = [
    "hasUppercase",
    "hasLowercase",
    "hasNumber",
    "hasSpecialChar",
  ];
  const tooltips = {
    hasUppercase: "Password must have at least one uppercase letter.",
    hasLowercase: "Password must have at least one lowercase letter.",
    hasNumber: "Password must have at least one number.",
    hasSpecialChar: "Password must have at least one special character.",
  };

  const getActiveAgencies = () => {
    let cookie = getCookie("token");
    if (cookie?.length > 5) {
      try {
        axios
          .get(`${BACKEND_URI}/agency/active-agencies`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            setActiveAgencies(res.data.count);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getRegions = () => {
    let cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(`${BACKEND_URI}/agency/regions`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            setRegions(res.data.regions);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
            if (err.status) {
              if (pathname != "/reset-password") {
                toast.error("Login Error Occured Please try again");
                history.push("/");
              }
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkPasswordCriteria = (password) => {
    return {
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  useEffect(() => {
    if (pathname == "/" && userData?.id) {
      history.push("/overview");
      toast.success("Logged in Successfully");
    }
  }, [userData]);

  const getCriticalNotifications = (page = 1) => {
    const cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/critical_notification/?unseen_only=${false}&order_by=${"created_at"}&page=${page}&page_size=${50}&search_string=${searchTextAgency}`,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setCriticalNotifications(res.data);
          })
          .catch((err) => {
            console.log(err);
            if (err.message?.includes("404")) {
              setCriticalNotifications([]);
            }
          });
      } catch (error) {
        console.log(error);
      }

      try {
        axios
          .get(`${BACKEND_URI}/critical_notification/unseen/count/`, {
            headers: {
              Authorization: `Bearer ${cookie}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setCriticalNotificationsLength(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getFilteredCriticalNotifications = (page = 1) => {
    const cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/critical_notification/?unseen_only=${false}&order_by=${"created_at"}&page=${page}&page_size=${50}&search_string=${searchTextAgency}`,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setFilteredCriticals(res.data);
          })
          .catch((err) => {
            console.log(err);
            if (err.message?.includes("404")) {
              setFilteredCriticals([]);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAlerts = (page = 1) => {
    const cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/alert/?unseen_only=${false}&order_by=${"created_at"}&page=${page}&page_size=${50}&search_string=${searchTextAgency}`,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setAlerts(res.data);
            if (pathname == "/overview") {
              setFilteredAlerts(res.data);
            }
          })
          .catch((err) => {
            if (err.message?.includes("404")) {
              setFilteredAlerts([]);
            }
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }

      try {
        axios
          .get(`${BACKEND_URI}/alert/unseen/count/`, {
            headers: {
              Authorization: `Bearer ${cookie}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setAlertsLength(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getDataSourcesDataFromAPI = () => {
    let cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/data-refresh/platform-by-agency?agency_name=${searchTextAgency}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then((res) => {
            setPlatformsData(res.data.data);
          })
          .catch((err) => {
            console.log(err);
            if (err.message?.includes("404")) {
              setPlatformsData([]);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUsers = (page = 1, order_by = "created_at", type = false) => {
    let cookie = getCookie("token");
    let limit = users?.limit ? users?.limit : 7;

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/user/users?offset=${
              (page - 1) * limit
            }&limit=${limit}&sort_by=${order_by}&order=${
              type ? "asc" : "desc"
            }&name=${searchTextAgency}`,
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
              if (pathname == "/overview") {
                setFilteredUsers(res.data);
              }
              setUsers(res.data);
            } else {
              setFilteredUsers([]);
              setUsers([]);
            }
          })
          .catch((err) => {
            if (err.message?.includes("404")) {
              setFilteredUsers([]);
              setUsers([]);
            }
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAgencies = (page = 1, order_by = "created_at", type = false) => {
    let cookie = getCookie("token");
    let limit = agencies?.limit ? agencies?.limit : 7;

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/agency/agencies?offset=${
              (page - 1) * limit
            }&limit=${limit}&sort_by=${order_by}&order=${
              type ? "asc" : "desc"
            }&agency_name=${searchTextAgency}`,
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
            } else {
              setAgencies([]);
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.message?.includes("404")) {
              setAgencies();
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getFilteredAgencies = (
    page = 1,
    order_by = "created_at",
    type = false
  ) => {
    let cookie = getCookie("token");
    let limit = agencies?.limit ? agencies?.limit : 7;

    if (cookie?.length > 5 && !pathname?.includes("agencies")) {
      try {
        axios
          .get(
            `${BACKEND_URI}/agency/agencies?offset=${
              (page - 1) * limit
            }&limit=${limit}&sort_by=${order_by}&order=${
              type ? "asc" : "desc"
            }&agency_name=${searchTextAgency}`,
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
              setFilteredAgencies(res.data);
            } else {
              setFilteredAgencies([]);
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.message?.includes("404")) {
              setFilteredAgencies();
            }
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
            console.log(res.data);
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

  const getAllTemplates = () => {
    let cookie = getCookie("token");
    setAllTemplates([]);
    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/templates/search?template_name=${searchTextAgency}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then((res) => {
            setAllTemplates(res.data);
          })
          .catch((err) => {
            if (err.message?.includes("404")) {
              setAllTemplates([]);
            }
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
            let transformedPlatforms = res.data.platforms.map((platform) => {
              if (platform?.have_access) {
                const [name, img_link] = [
                  platform.platform_name,
                  platform.logo_link,
                ];
                return { name, img_link };
              }
            });
            transformedPlatforms = transformedPlatforms?.filter((e) => {
              if (e?.name) {
                return e;
              }
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
    getRegions();
    getAllTemplates();
  }, [userData]);

  useEffect(() => {
    getCriticalNotifications();
    getAlerts();
    getDataSourcesDataFromAPI();
  }, [userData]);

  const callAPIs = () => {
    if (pathname == "/overview") {
      getFilteredAgencies();
      getFilteredCriticalNotifications();
    }
    if (pathname?.includes("agencies")) {
      getAgencies();
    }
    if (
      pathname?.includes("alerts") ||
      pathname === "/overview/critical-notifications"
    ) {
      getCriticalNotifications();
    }
    if (pathname?.includes("data-sources") || pathname == "/overview") {
      getDataSourcesDataFromAPI();
    }
    if (pathname?.includes("alerts") || pathname == "/overview") {
      getAlerts();
    }
    if (pathname?.includes("users") || pathname == "/overview") {
      getUsers();
    }
    if (pathname == "/overview" || pathname?.includes("templates")) {
      getAllTemplates();
    }
  };

  const debouncedCallAPIs = useCallback(
    debounce(() => {
      callAPIs();
    }, 600),
    [searchTextAgency] 
  );
  useEffect(() => {
    debouncedCallAPIs();
    return () => {
      debouncedCallAPIs.cancel(); 
    };
  }, [searchTextAgency, debouncedCallAPIs]);

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
        filteredAgencies,
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
        setUserData,
        checkPasswordCriteria,
        tooltips,
        password_params,
        setSearchTextAgency,
        searchTextAgency,
        platformsData,
        criticalNotificationsLength,
        criticalNotifications,
        alerts,
        alertsLength,
        getDataSourcesDataFromAPI,
        activeAgencies,
        getActiveAgencies,
        regions,
        getAlerts,
        getCriticalNotifications,
        getAllTemplates,
        allTemplates,
        filteredUsers,
        filteredAlerts,
        filteredCriticals,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
