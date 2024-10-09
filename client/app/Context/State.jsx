"use client";
import React, { useEffect, useState } from "react";
import Context from "./Context";
import { usePathname } from "next/navigation";
import axios from "axios";
import { BACKEND_URI } from "../utils/url";
import Cookies from "js-cookie";
import { getCookie } from "cookies-next";

const State = (props) => {
  const pathname = usePathname();
  const [userData, setUserData] = useState();
  const [users, setUsers] = useState([]);

  const checkToken = () => {};

  const getUsers = () => {
    let cookie = getCookie("token");
    if (cookie.length > 5) {
      // console.log(cookie);
      try {
        axios
          .get(`${BACKEND_URI}/user/users`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            if (res.data?.length > 0) {
              setUsers(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Auth Token not found");
    }
  };

  useEffect(() => {
    checkToken();
    getUsers();
  }, []);

  return (
    <Context.Provider
      value={{ userData, setUserData, checkToken, setUsers, users }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
