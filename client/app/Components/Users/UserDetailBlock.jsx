import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";

const UserDetailBlock = () => {
  const history = useRouter();

  return (
    <div className="py-3 px-2 border-gray-200/30 border-y grid items-center userBlockGrid cursor-pointer text-white mainText14">
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          className="cursor-pointer w-4 h-4 !bg-main rounded-xl border border-gray-600"
        />
      </div>
      <div className="flex items-start justify-center">
        <Image
          src={"/Agency/logo.png"}
          width={1000}
          height={1000}
          className="w-[10%] rounded-full mr-2"
        />
        <div className="ml-2">
          <h5 className="text-base">John Doe</h5>
          <p className="text-gray-400">johndoe@gmail.com</p>
        </div>
      </div>{" "}
      <p className="text-center">Owner</p>
      <div className="status-active w-fit mx-auto px-4 py-1 rounded-md">
        Online
      </div>{" "}
      <p className="text-center">13-08-2024</p>
      <p className="text-center">6:30 PM, 16-08-2024</p>
      <div className="flex items-center justify-evenly">
        <AiOutlineEye
          onClick={() => {}}
          className="bg-[#3836FF4D]/30 text-[#3836FF] p-1.5 text-3xl rounded-full cursor-pointer"
        />
        <BiPencil className="bg-[#2457DA26]/20 text-[#2457DA] p-1.5 text-3xl rounded-full cursor-pointer" />
        <AiOutlineDelete className="bg-[#FF202026]/20 text-[#FF2020] p-1.5 text-3xl rounded-full cursor-pointer" />
      </div>
    </div>
  );
};

export default UserDetailBlock;
