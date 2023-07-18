import React, { useEffect, useState } from "react";
import { Exercise, Workout } from "../models";
import { DataStore } from "aws-amplify";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import WorkoutCreateForm from "../ui-components/WorkoutCreateForm";
import WorkoutUpdateForm from "../ui-components/WorkoutUpdateForm";

const Workouts = () => {
  const [all, setAll] = useState([]);
  const [clicked, setClicked] = useState({});

  const [editMode, seteditMode] = useState(false);


 

  // useEffect(() => {
  //   const subscription = DataStore.observe(Workout).subscribe(msg => {
  //     console.log(msg.model, msg.opType, msg.element);
  //   });

  //   return subscription
  // }, [])
  

  const fetchall = async () => {
    try {
      const workouts = await DataStore.query(Workout);

      const exerciseIds = workouts.flatMap(workout => workout.exercises);

      const exercises = await DataStore.query(Exercise, exerc => exerc.or(e => exerciseIds.map(id => e.id.eq(id)) )); 

      const exerciseMap = exercises.reduce((map, exercise) => {
        map[exercise.id] = exercise;
        return map;
      }, {});

      const workoutsWithExercises = workouts.map(workout => ({
        ...workout,
        exercises: workout.exercises.map(exerciseId => exerciseMap[exerciseId]),
      }));

      setAll(workoutsWithExercises);


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
          <div className="text-lg font-bold "> Workouts </div>
          <div
            onClick={() => setaddClicked(true)}
            className="absolute top-8 right-8 rounded-2xl bg-zinc-200 p-4 py-2 shadow-lg cursor-pointer select-none"
          >
            + Add workout
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
                {res?.title?.toUpperCase()}
              </h2>
              <p className="leading-relaxed text-base text-gray-600">
                {res?.level}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className=" shadow-xl rounded-lg flex-1 p-5 border overflow-scroll ">
        {addClicked ? (
          <>
            <div className=" bg-white rounded-lg p-8 flex flex-col  w-full  relative z-10 shadow-md">
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                Add new workout
              </h2>
              <WorkoutCreateForm onAddSuccess={fetchall} />
            </div>
          </>
        ) : editMode ? (
          <>
            <div className=" bg-white rounded-lg p-8 flex flex-col  w-full  relative z-10 shadow-md">
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                Edit workout
              </h2>
              <WorkoutUpdateForm
                defaultData={clicked}
                workout={clicked}
                onUpdateSuccess={fetchall}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full items-center justify-between">
              <div className="text font-bold ">Workout info</div>
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
                Workout name:{" "}
              </span>
              <span className=" text-base text-gray-600">
                {clicked.title.toUpperCase()}{" "}
              </span>
            </div>
            {clicked.description && (
              <div className="p-3 mb-2 border-b border-gray-200">
                <span className="font-semibold text-base text-gray-800">
                  Description:{" "}
                </span>
                <span className=" text-base text-gray-600">
                  x{clicked.description}{" "}
                </span>
              </div>
            )}

            <div className="p-3 mb-2 border-b border-gray-200">
              <span className="font-semibold text-base text-gray-800">
                Level:{" "}
              </span>
              <span className=" text-base text-gray-600">{clicked.level} </span>
            </div>
            <div className="p-3 mb-2 border-b border-gray-200">
              <span className="font-semibold text-base text-gray-800">
                Duration:{" "}
              </span>
              <span className=" text-base text-gray-600">
                {clicked.duration} secs{" "}
              </span>
            </div>

            {clicked.focus.length > 0 && (
              <div className="p-3 mb-2 border-b border-gray-200 flex gap-2">
                <span className="font-semibold text-base text-gray-800">
                  Focus area:{" "}
                </span>
                <div className="flex flex-wrap">
                  {clicked.focus.map((res, i) => (
                    <span key={i} className=" mr-1 p-1 px-2 rounded-full bg-gray-200 text-base text-gray-800">
                      {res.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {clicked.expectedResult.length > 0 && (
              <div className="p-3 mb-2 border-b border-gray-200 flex gap-2">
                <span className="font-semibold text-base text-gray-800">
                  Exepected result:{" "}
                </span>
                <div className="flex flex-wrap">
                  {clicked.expectedResult.map((res, i) => (
                    <span key={i} className=" mr-1 p-1 px-2 rounded-full bg-gray-200 text-base text-gray-800">
                      {res.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {clicked.exercises.length > 0 && (
              <div className="p-3 mb-2 border-b border-gray-200">
                <span className="font-semibold text-base text-gray-800">
                  Exercises:{" "}
                </span>
                {clicked.exercises.map((res, i) => (
                  <div
                  key={res.id}
                  className="flex items-center  mx-auto border-b py-2 mb-1 border-gray-200 sm:flex-row flex-col cursor-pointer select-none "
                >
                  <div className="h-14 w-14 sm:mr-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 text-2xl">
                    <img src={res.image} className="rounded-full" />
                  </div>
                  <div className="flex-grow sm:text-left text-center">
                    <h2 className="text-gray-900 text-sm title-font font-medium mb-1">
                      {res?.name.toUpperCase()}
                    </h2>
                    <p className="leading-relaxed text-sm text-gray-600">
                      X {res?.reps}
                    </p>
                  </div>
                </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Workouts;
