import React from 'react'
import { FiPieChart } from 'react-icons/fi'
import { NavLink } from "react-router-dom";
import { HiChartPie} from 'react-icons/hi'
import { GrWorkshop } from 'react-icons/gr'
import { FaRegUser, FaUserAlt, FaRunning} from 'react-icons/fa'

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
        icon: <GrWorkshop size={22} className=" text-gray-700 cursor-pointer" />,
        active_icon: <GrWorkshop size={24} className=" text-black cursor-pointer" />,
    },
   
    {
        title: "Workouts",
        to: '/workouts',
        icon: <FaRunning size={22} className=" text-gray-700 cursor-pointer" />,
        active_icon: <FaRunning size={24} className=" text-black cursor-pointer" />,
    },
   
    
    
]



