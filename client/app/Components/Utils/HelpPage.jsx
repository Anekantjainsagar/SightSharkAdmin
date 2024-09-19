"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
    width: "30vw",
    border: "none",
  },
};

const HelpPage = ({ showSubscribe, setShowSubscribe }) => {
  function closeModal() {
    setShowSubscribe(false);
  }

  return (
    <div className="z-50">
      <Toaster />
      <Modal
        isOpen={showSubscribe}
        onRequestCl2ose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative rounded-lg bg-[#0C111D] py-6 border border-gray-500/40 px-4 text-white flex flex-col items-center justify-center">
          <h4 className="mainText20">Contact Us</h4>
          <p className="bg-[#171C2A] p-3 text-[#ECECED] text-center text-base my-2.5">
            All Dashboards, Data sources and Templates will be lost and
            permanently deleted.
          </p>
          <div className="flex items-center gap-x-4 w-full">
            <button
              className={`bg-red-500 w-full py-2 rounded-lg text-center`}
              onClick={() => {
                closeModal();
              }}
            >
              Cancel
            </button>
            <button
              className={`bg-newBlue w-full py-2 rounded-lg text-center`}
              onClick={() => {}}
            >
              Contact
            </button>{" "}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HelpPage;
