import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const UserDetailBlock = ({ status, acess }) => {
  const history = useRouter();

  return (
    <div className="py-4 px-7 border-gray-200/5 border-y grid userBlockGrid items-center cursor-pointer text-textGrey mainText14">
      <div className="inline-flex items-start">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="before:content[''] peer relative h-6 w-6 rounded-md cursor-pointer appearance-none border-2 border-[#343745] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-16 before:w-16 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
            id="check"
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
      </div>{" "}
      <div className="flex items-start">
        <Image
          src="/Agency/Avatar.png"
          width={1000}
          height={1000}
          className="w-10 aspect-square rounded-full"
          alt="Key contact"
        />
        <div className="ml-4">
          <p className="mainText14">Olivia Rhye</p>
          <p className="mainText14 text-[#85888E]">olivia@gmail.com</p>
        </div>
      </div>
      <h5>{acess}</h5>
      <div className="w-full">
        <div
          className={`status-${status?.toLowerCase()} flex items-center gap-x-2 w-fit px-3 border-2 py-0.5 rounded-2xl`}
        >
          <div
            className={`w-2.5 h-2.5 rounded-full dot-${status?.toLowerCase()}`}
          ></div>
          {status}
        </div>
      </div>
      <p>15-08-2024</p>
      <p>6:30 PM, 16-08-2024</p>
      <div className="flex items-center justify-end">
        <svg
          width="4"
          height="16"
          viewBox="0 0 4 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.99984 8.8335C2.46007 8.8335 2.83317 8.4604 2.83317 8.00016C2.83317 7.53993 2.46007 7.16683 1.99984 7.16683C1.5396 7.16683 1.1665 7.53993 1.1665 8.00016C1.1665 8.4604 1.5396 8.8335 1.99984 8.8335Z"
            stroke="#85888E"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.99984 3.00016C2.46007 3.00016 2.83317 2.62707 2.83317 2.16683C2.83317 1.70659 2.46007 1.3335 1.99984 1.3335C1.5396 1.3335 1.1665 1.70659 1.1665 2.16683C1.1665 2.62707 1.5396 3.00016 1.99984 3.00016Z"
            stroke="#85888E"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.99984 14.6668C2.46007 14.6668 2.83317 14.2937 2.83317 13.8335C2.83317 13.3733 2.46007 13.0002 1.99984 13.0002C1.5396 13.0002 1.1665 13.3733 1.1665 13.8335C1.1665 14.2937 1.5396 14.6668 1.99984 14.6668Z"
            stroke="#85888E"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default UserDetailBlock;
