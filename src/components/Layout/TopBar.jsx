import { FiLogOut } from 'react-icons/fi'
import { Auth } from "aws-amplify";

export default function TopBar({ showNav, user }) {


    return (
        <div
            className={`z-10 fixed w-full flex justify-between gap-4 items-center bg-white pt-5 pb-3 transition-all duration-[300ms] ${showNav ? "pl-64" : "pl-32"}`}
        >
            <div className=" w-full text-center text-lg font-bold py-2 px-3 text-gray-700  " >
                BEFIT CMS
            </div>

            <div className="flex items-center pr-4 md:pr-16 gap-6">

                <div className="flex gap-2 items-center cursor-pointer select-none">
                    <span className="font-cap ">
                        {user?.name}
                        {/* {
                            console.log(dbUser,"dbUser")
                        } */}
                    </span>
                </div>
                <div onClick={()=>Auth.signOut()} className="px-6  text-red-500 cursor-pointer flex items-center">
                    <FiLogOut />
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
}