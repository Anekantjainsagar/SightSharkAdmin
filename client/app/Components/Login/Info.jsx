import React, { useState, useEffect, useRef } from "react";

const Info = ({ text, values, placement }) => {
  return (
    <PopoverComponent content={text} placement={placement} values={values}>
      <svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2"
      >
        <path
          d="M7.4987 10.6667V8.00004M7.4987 5.33337H7.50537M14.1654 8.00004C14.1654 11.6819 11.1806 14.6667 7.4987 14.6667C3.8168 14.6667 0.832031 11.6819 0.832031 8.00004C0.832031 4.31814 3.8168 1.33337 7.4987 1.33337C11.1806 1.33337 14.1654 4.31814 14.1654 8.00004Z"
          stroke="#85888E"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </PopoverComponent>
  );
};

const PopoverComponent = ({ children, placement = "top", content, values }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  const handleClickOutside = (event) => {
    event.stopPropagation();
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div
      className="relative inline-block text-left w-full z-50"
      ref={popoverRef}
    >
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
      {isOpen && (
        <div
          className={`absolute text-center z-50 ${
            placement === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
          } left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-300/5 rounded-lg shadow-lg px-2 py-1.5 text-[12px] transition-transform duration-300 ease-in-out`}
          style={values ? { width: "450px" } : { width: "280px" }}
        >
          {content}
          {values && (
            <ul className="grid grid-cols-2 gap-x-2">
              {values?.map((e, i) => (
                <li key={i} className="w-full text-left">
                  {i + 1}. {e}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};


export default Info;
