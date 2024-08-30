import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";

const AgencyDetailsBlock = () => {
  const history = useRouter();

  return (
    <div className="py-3 px-2 border-gray-200/30 border-y grid items-center agencyBlockGrid cursor-pointer hover:text-white text-white/70 mainText14">
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          className="cursor-pointer w-4 h-4 !bg-main rounded-xl border border-gray-600"
        />
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={"/Agency/logo.png"}
          width={1000}
          height={1000}
          alt="Logo"
          className="w-2/12 rounded-full mr-2"
        />
        <h5>Alpha solutions</h5>
      </div>
      <div className="status-active w-fit mx-auto px-4 py-1 rounded-md">
        Active
      </div>{" "}
      <div className="flex items-center justify-center">
        <Image
          src={"/Agency/contact.png"}
          width={1000}
          height={1000}
          alt="Contact"
          className="w-2/12 rounded-full mr-2"
        />
        <p>Anna</p>
      </div>
      <div className="flex items-center justify-center flex-wrap whitespace-normal">
        <MdOutlineMailOutline className="mr-2 text-xl" />
        <p className="break-words w-fit text-center">
          alpha.solutions@example.com
        </p>
      </div>
      <p className="text-center">13-08-2024</p>
      <div className="flex items-center justify-center">
        <p className="mr-2">670</p>
        <div className="bg-[#3836FF4D]/20 w-[6vw] rounded-full h-3">
          <div className="bg-[#3836FF] w-[30%] text-transparent rounded-full h-full text-xs">
            .
          </div>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <AiOutlineEye
          onClick={() => {
            history.push("/agencies/alpha-solutions");
          }}
          className="bg-[#3836FF4D]/30 text-[#3836FF] p-1.5 text-3xl rounded-full cursor-pointer"
        />
        <BiPencil className="bg-[#2457DA26]/20 text-[#2457DA] p-1.5 text-3xl rounded-full cursor-pointer" />
        <AiOutlineDelete className="bg-[#FF202026]/20 text-[#FF2020] p-1.5 text-3xl rounded-full cursor-pointer" />
      </div>
    </div>
  );
};

export default AgencyDetailsBlock;
