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

  const getAgencies = (grow) => {
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
            }&limit=${limit}`,
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

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    getAgencies();
    getUsers();
  }, [userData]);

  return (
    <Context.Provider
      value={{
        userData,
        checkToken,
        setUsers,
        getUsers,
        users,
        agencies,
        getAgencies,
        setAgencies,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
