import { useContext, useEffect, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsSharp } from 'react-icons/io5'
import { FiLogOut, FiSearch,FiUnlock } from 'react-icons/fi'
import { HiOutlineChevronDown, HiOutlinePlusCircle } from 'react-icons/hi'

export default function TopBar({ showNav }) {

  const navigation = useNavigate()

  const [showLogout, setShowLogout] = useState(null);
  const openLogout = Boolean(showLogout);
  const handleClickLogout = (event) => {
    setShowLogout(event.currentTarget);
  };

  const [showSkill, setShowSkill] = useState(null);
  const openSkill = Boolean(showSkill);
  const handleClickSkill = (event) => {
    setShowSkill(event.currentTarget);
  };
  const handleCloseSkill = () => {
    setShowSkill(null);
  };

    
  return (
    <div
      className={`z-10 fixed w-full flex justify-between gap-4 items-center bg-white pt-5 pb-3 transition-all duration-[300ms] ${showNav ? "pl-64" : "pl-32"}`}
    >
      <div className=" w-full text-center text-lg font-bold py-2 px-3 text-gray-700  " >
       BEFIT CMS
       

      </div>

      <div className="flex items-center pr-4 md:pr-16 gap-6">

        <div onClick={handleClickLogout} className="flex gap-2 items-center cursor-pointer select-none">
          <span className="font-cap ">
            Abdulrasaq
          </span>
        </div>
          <div className="px-6  text-red-500 cursor-pointer flex items-center">
              <FiLogOut />
              <span>Logout</span>
          </div>
      </div>
    </div>
  );
}