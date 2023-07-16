import React, { useEffect, useState } from 'react'
import { FiPieChart } from 'react-icons/fi'
import { NavLink, useLocation } from "react-router-dom";
import { HiChartPie, HiOutlineSpeakerphone, HiSpeakerphone } from 'react-icons/hi'
import { HiOutlineRectangleStack, HiRectangleStack } from 'react-icons/hi2'
import { MdShowChart, MdOutlinePayments, MdPayments } from 'react-icons/md'
import { FaRegUser, FaRegUserCircle, FaUserCircle, FaUserAlt, FaRegFolder, FaFolder } from 'react-icons/fa'
import { FiBox, FiCodesandbox } from 'react-icons/fi'
import { BsTag, BsTagFill, BsCreditCard2Back, BsCreditCard2BackFill } from 'react-icons/bs'
import { IoNotificationsOutline, IoNotificationsSharp, IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5'
import { AiOutlineCode, AiFillCode } from 'react-icons/ai'

const Links = ({ showNav, path }) => {

    return (
        <>
            {
                links.map((link, index) => (
                    <NavLink key={index}
                        className={({ isActive }) => `${isActive  ? "border-r-2 border-violet-800 bg-zinc-50" : ""} ${!showNav && "justify-center"} pt-4 pb-4 flex flex-row items-center pl-10 pr-10 gap-4`}
                        to={link.to}
                    >
                        {({ isActive }) => (
                            <>
                                {
                                    isActive  ?
                                        link.active_icon
                                        :
                                        link.icon
                                }
                               
                                {
                                    showNav &&
                                    <span className={`${isActive  ? "text-black text-base font-semibold" : link.title === "Transaction" && path === '/singletransaction' || isActive ? "text-black text-base font-semibold" : "text-gray-700"} font-work`}>
                                        {link.title}
                                    </span>
                                }



                            </>
                        )}
                    </NavLink>
                ))
            }
        </>
    )
}
export default Links

export const links = [
    {
        title: "Overview",
        to: '/overview',
        icon: <FiPieChart size={22} className=" text-gray-700 cursor-pointer" />,
        active_icon: <HiChartPie size={24} className=" text-black cursor-pointer" />,
    },
    {
        title: "Users",
        to: '/users',
        icon: <FaRegUser size={22} className=" text-gray-700 cursor-pointer" />,
        active_icon: <FaUserAlt size={24} className=" text-black cursor-pointer" />,
    },
    {
        title: "Exercises",
        to: '/exercises',
        icon: <MdShowChart size={22} className=" text-gray-700 cursor-pointer" />,
        active_icon: <MdShowChart size={24} className=" text-black cursor-pointer" />,
    },
   
    {
        title: "Workouts",
        to: '/workouts',
        icon: <HiOutlineSpeakerphone size={22} className=" text-gray-700 cursor-pointer" />,
        active_icon: <HiSpeakerphone size={24} className=" text-black cursor-pointer" />,
    },
    {
        title: "App",
        to: '/app',
        icon: <FiBox size={22} className=" text-gray-700 cursor-pointer" />,
        active_icon: <FiCodesandbox size={24} className=" text-black cursor-pointer" />,
    },
    {
        title: "Admins",
        to: '/admins',
        icon: <FaRegUserCircle size={22} className=" text-gray-700 cursor-pointer" />,
        active_icon: <FaUserCircle size={24} className=" text-black cursor-pointer" />,
    },
    
]



