import React from "react";

const Users = () => {
  return (
    <div className="flex h-[calc(100vh-90px)] bg-zinc-50 p-6 gap-6">
      <div className=" shadow-xl rounded-lg flex-1 p-5 border overflow-scroll ">
        <p className="text-lg font-bold "> Users </p>
        <div className="flex items-center  mx-auto border-b py-5 mb-5 border-gray-200 sm:flex-row flex-col cursor-pointer select-none ">
          <div className="h-16 w-16 sm:mr-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 text-2xl">
            A
          </div>
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
              Shooting Stars
            </h2>
            <p className="leading-relaxed text-base text-gray-600">
              Blue bottle crucifix vinyl post-ironic four dollar toast vegan
              taxidermy. Gastropub indxgo juice poutine.
            </p>
          </div>
        </div>
      </div>
      <div className=" shadow-xl rounded-lg flex-1 p-5 border ">
        <p className="text font-bold "> Personal information </p>
        <div className="p-3 mb-2 border-b border-gray-200">
            <span className="font-semibold text-base text-gray-800">Name: </span> 
            <span className=" text-base text-gray-600">Abdulradaq jamiu adewuyi </span>
        </div>
        <div className="p-3 mb-2 border-b border-gray-200">
            <span className="font-semibold text-base text-gray-800">Age: </span> 
            <span className=" text-base text-gray-600">24 </span>
        </div>
      </div>
    </div>
  );
};

export default Users;
