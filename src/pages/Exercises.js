import React, { useState } from "react";
import pushup from "../assets/pushup.jpeg";
import FormInput from "../components/FormInput";

const Exercises = () => {
  const [exercise, setexerice] = useState({
    name: "",
    sets: "",
    reps: "",
    duration: "",
  });

  const [image, setimage] = useState({});

  const setValues = (e) => {
    setexerice({ ...exercise, [e.target.name]: e.target.value });
  };

  const [addClicked, setaddClicked] = useState(false);

  const handleSubmit = () => {
    console.log(exercise, "exercixe");
  };

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

        <div className="flex items-center  mx-auto border-b py-5 mb-5 border-gray-200 sm:flex-row flex-col cursor-pointer select-none ">
          <div className="h-16 w-16 sm:mr-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 text-2xl">
            <img src={pushup} className="rounded-full" />
          </div>
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
              Push up
            </h2>
            <p className="leading-relaxed text-base text-gray-600">X 16</p>
          </div>
        </div>
      </div>

      <div className=" shadow-xl rounded-lg flex-1 p-5 border ">
        {addClicked ? (
          <div className=" bg-white rounded-lg p-8 flex flex-col  w-full  relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Add execrise
            </h2>
            <FormInput type="text" value={exercise.name} onChange={setValues} name="name" placeholder="Enter exercise name" label="Exercise name"/>
            <FormInput type="number" value={exercise.reps} onChange={setValues} name="reps" placeholder="Enter number of reps" label="Reps"/>
            <FormInput type="number" value={exercise.sets} onChange={setValues} name="sets" placeholder="Enter number of sets" label="Sets"/>
            <FormInput type="number" value={exercise.duration} onChange={setValues} name="duration" placeholder="Enter estimate duration in seconds" label="Duration (secs)"/>

            <div className="relative mb-4">
              <label for={"images"} className="leading-7 text-sm text-gray-600">
                {" "}
                Exercise Gif Image{" "}
              </label>
              <input type={"file"}  id={"images"}  name={"images"}
                placeholder={"Enter exercise GIF image"}
                onChange={(e) => setimage(e.target.files[0])}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Submit
            </button>
          </div>
        ) : (
          <>
            <p className="text font-bold "> Personal information </p>
            <div className="p-3 mb-2 border-b border-gray-200">
              <span className="font-semibold text-base text-gray-800">
                Name:{" "}
              </span>
              <span className=" text-base text-gray-600">Push up </span>
            </div>
            <div className="p-3 mb-2 border-b border-gray-200">
              <span className="font-semibold text-base text-gray-800">
                Sets:{" "}
              </span>
              <span className=" text-base text-gray-600">16 </span>
            </div>
            <div className="p-3 mb-2 border-b border-gray-200">
              <span className="font-semibold text-base text-gray-800">
                Reps:{" "}
              </span>
              <span className=" text-base text-gray-600">10 </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Exercises;
