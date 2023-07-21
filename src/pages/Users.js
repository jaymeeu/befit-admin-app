import { DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { User } from "../models";
const Users = () => {
  const [users, setusers] = useState([]);
  const [clickedUser, setClickedUser] = useState({});

  const fetchall = async () => {
    try {
      const users = await DataStore.query(User);
      setusers(users);
    } catch (error) {
      console.log(error, "eoorr");
    }
  };

  useEffect(() => {
    fetchall();
  }, []);

  return (
    <div className="flex h-[calc(100vh-90px)] bg-zinc-50 p-6 gap-6">
      <div className=" shadow-xl rounded-lg flex-1 p-5 border overflow-scroll ">
        <p className="text-lg font-bold "> Users </p>
        {users.map((user) => (
          <div
            onClick={() => setClickedUser(user)}
            className="flex items-center  mx-auto border-b py-5 mb-5 border-gray-200 sm:flex-row flex-col cursor-pointer select-none "
          >
            <div className="h-14 w-14 sm:mr-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 text-2xl">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                {user.name}
              </h2>
              <p className="leading-relaxed text-base text-gray-600">
                {user.email}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className=" shadow-xl rounded-lg flex-1 p-5 border ">
        <p className="text font-bold "> Personal information </p>
        <div className="p-3 mb-2 border-b border-gray-200">
          <span className="font-semibold text-base text-gray-800">Name: </span>
          <span className=" text-base text-gray-600">{clickedUser?.name}</span>
        </div>
        <div className="p-3 mb-2 border-b border-gray-200">
          <span className="font-semibold text-base text-gray-800">Email: </span>
          <span className=" text-base text-gray-600">{clickedUser?.email}</span>
        </div>
        <div className="p-3 mb-2 border-b border-gray-200">
          <span className="font-semibold text-base text-gray-800">Age: </span>
          <span className=" text-base text-gray-600">{clickedUser?.age}</span>
        </div>
        <div className="p-3 mb-2 border-b border-gray-200">
          <span className="font-semibold text-base text-gray-800">
            Height:{" "}
          </span>
          <span className=" text-base text-gray-600">
            {clickedUser?.height}
          </span>
        </div>
        <div className="p-3 mb-2 border-b border-gray-200">
          <span className="font-semibold text-base text-gray-800">
            Weight:{" "}
          </span>
          <span className=" text-base text-gray-600">
            {clickedUser?.weight}
          </span>
        </div>
        {clickedUser?.isAdmin && (
          <div className="p-3 mb-2 border-b border-gray-200">
            <span className=" p-2 bg-blue-200 text-blue-800 text-base font-bold rounded-full">Admin</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
