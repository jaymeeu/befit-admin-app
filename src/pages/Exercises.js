import React, { useEffect, useState } from "react";
import { Exercise } from "../models";
import { DataStore } from "aws-amplify";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import ExerciseCreateForm from "../ui-components/ExerciseCreateForm";
import ExerciseUpdateForm from "../ui-components/ExerciseUpdateForm";

const Exercises = () => {
  const [all, setAll] = useState([]);
  const [clicked, setClicked] = useState({});

  const [editMode, seteditMode] = useState(false);

  const fetchall = async () => {
    try {
      const res = await DataStore.query(Exercise);
      setAll(res);
    } catch (error) {
      console.log(error, "eoorr");
    }
  };

  useEffect(() => {
    fetchall();
  }, []);

  const [addClicked, setaddClicked] = useState(true);

  return (
    <div className="flex h-[calc(100vh-90px)] bg-zinc-50 p-6 gap-6">
      <div className=" shadow-xl rounded-lg flex-1 p-5 border overflow-scroll relative ">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold "> Exercises </div>
          <div
            onClick={() => setaddClicked(true)}
            className="absolute top-8 right-8 rounded-2xl bg-zinc-200 p-4 py-2 shadow-lg cursor-pointer select-none"
          >
            + Add exercise
          </div>
        </div>

        {all.map((res) => (
          <div
            onClick={() => {
              setClicked(res);
              setaddClicked(false);
              seteditMode(false);
            }}
            key={res.id}
            className="flex items-center  mx-auto border-b py-3 mb-3 border-gray-200 sm:flex-row flex-col cursor-pointer select-none "
          >
            <div className="h-14 w-14 sm:mr-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 text-2xl">
              <img src={res.image} className="rounded-full" />
            </div>
            <div className="flex-grow sm:text-left text-center mt-2 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                {res?.name.toUpperCase()}
              </h2>
              <p className="leading-relaxed text-base text-gray-600">
                X {res?.reps}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className=" shadow-xl rounded-lg flex-1 p-5 border ">
        {addClicked ? (
          <>
            <div className=" bg-white rounded-lg p-8 flex flex-col  w-full  relative z-10 shadow-md">
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                Add new execrise
              </h2>
              <ExerciseCreateForm 
                onAddSuccess={fetchall} 
              />
            </div>
          </>
        ) : editMode ? (
          <>
            <div className=" bg-white rounded-lg p-8 flex flex-col  w-full  relative z-10 shadow-md">
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                Edit execrise
              </h2>
              <ExerciseUpdateForm
                defaultData={clicked}
                exercise={clicked}
                onUpdateSuccess={fetchall}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full items-center justify-between">
              <div className="text font-bold ">Exercise information</div>
              <div className="flex items-center gap-2">
                <div
                  onClick={() => seteditMode(true)}
                  className="cursor-pointer w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 "
                >
                  <AiOutlineEdit />
                </div>
                <div className="cursor-pointer w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-red-400 ">
                  <BsFillTrash3Fill />
                </div>
              </div>
            </div>

            <div className="h-40 w-40 sm:mr-5 inline-flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-500 flex-shrink-0 text-2xl">
              <img src={clicked.image} className="rounded-lg" />
            </div>

            <div className="p-3 mb-2 border-b border-gray-200">
              <span className="font-semibold text-base text-gray-800">
                Exercise name:{" "}
              </span>
              <span className=" text-base text-gray-600">
                {clicked.name.toUpperCase()}{" "}
              </span>
            </div>
            <div className="p-3 mb-2 border-b border-gray-200">
              <span className="font-semibold text-base text-gray-800">
                Sets:{" "}
              </span>
              <span className=" text-base text-gray-600">x{clicked.sets} </span>
            </div>
            <div className="p-3 mb-2 border-b border-gray-200">
              <span className="font-semibold text-base text-gray-800">
                Reps:{" "}
              </span>
              <span className=" text-base text-gray-600">{clicked.reps} </span>
            </div>
            <div className="p-3 mb-2 border-b border-gray-200">
              <span className="font-semibold text-base text-gray-800">
                Duration:{" "}
              </span>
              <span className=" text-base text-gray-600">
                {clicked.duration} secs{" "}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Exercises;
