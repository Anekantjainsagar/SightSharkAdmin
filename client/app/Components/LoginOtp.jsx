"use client";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";
import Context from "../Context/Context";
import { BACKEND_URI } from "../utils/url";
import { setCookie } from "cookies-next";

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

const LoginOtp = ({ showSubscribe, setShowSubscribe, email }) => {
  const [showOtp, setShowOtp] = useState(false);
  const [otpVal, setOtpVal] = useState("");
  const history = useRouter();
  const { checkToken } = useContext(Context);

  function closeModal() {
    setShowSubscribe(false);
  }

  const onCheckOtp = () => {
    if (email && otpVal) {
      try {
        const loginData = new URLSearchParams({
          email: email,
          code: otpVal,
        });

        fetch(`${BACKEND_URI}/auth/verify-code`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
          body: loginData,
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.access_token) {
              setCookie("token", res.access_token);
              checkToken();
              history.push("/overview");
            }
            if (res.detail) {
              toast.error(res.detail);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.msg);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please fill all the details");
    }
  };

  return (
    <div className="z-50">
      <Toaster />
      <Modal
        isOpen={showSubscribe}
        onRequestCl2ose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative rounded-lg bg-[#0C111D] py-6 border border-gray-500/40 px-4 text-white flex flex-col items-center justify-center w-[30vw] min-[1600px]:w-[25vw]">
          <AiOutlineClose
            className="text-2xl absolute top-4 right-4 cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          />
          <Image
            src="/forgot.png"
            alt="Forgot"
            width={1000}
            height={1000}
            className=""
          />
          {showOtp ? (
            <div>
              <button
                className={`bg-newBlue w-full py-2 mt-5 rounded-lg text-sm min-[1600px]:text-base text-center`}
                onClick={() => {
                  onCheckOtp();
                }}
              >
                Submit
              </button>{" "}
            </div>
          ) : (
            <div>
              <h4 className="mainText20 w-11/12 text-center mb-5 mt-5">
                Enter Otp for Verification
              </h4>
              <OtpInput
                value={otpVal}
                onChange={(val) => {
                  setOtpVal(val);
                }}
                className="w-full border-3 px-3 text-2xl py-1.5 outline-none rounded-md mb-4"
                numInputs={6}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
                separator={<span style={{ width: "8px" }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                inputType="number"
                inputStyle={{
                  border: "1px solid transparent",
                  borderRadius: "8px",
                  width: "54px",
                  height: "54px",
                  fontSize: "20px",
                  color: "#000",
                  caretColor: "blue",
                  marginRight: "5px",
                }}
                focusStyle={{
                  border: "1px solid #aeafb0",
                  outline: "none",
                }}
              />
              <button
                onClick={() => {
                  if (user?.email) {
                    const formData = new URLSearchParams();
                    formData.append("email", user.email);

                    axios
                      .post(`${BACKEND_URI}/user/recover-password`, formData, {
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/x-www-form-urlencoded",
                          Authorization: `Bearer ${getCookie("token")}`,
                        },
                      })
                      .then((res) => {
                        if (res.status == 200) {
                          toast.success("Password reset email sent");
                        }
                      })
                      .catch((err) => {
                        if (err.response.status === 404) {
                          toast.error("User not found");
                        }
                      });
                  } else {
                    toast.error("Please enter an email address");
                  }
                }}
                className="text-[#F04438] mainText18"
              >
                Recover Password
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LoginOtp;
