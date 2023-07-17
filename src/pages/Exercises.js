import React, { useEffect, useState } from "react";
import pushup from "../assets/pushup.jpeg";
import FormInput from "../components/FormInput";
import { Exercise } from "../models";
import { DataStore, Storage } from "aws-amplify";
import {AiOutlineEdit} from 'react-icons/ai'
import {BsFillTrash3Fill} from 'react-icons/bs'

const Exercises = () => {
  const [all, setAll] = useState([]);
  const [clicked, setClicked] = useState({});

  const [editMode, seteditMode] = useState(false)

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

  const [exercise, setexerice] = useState({
    name: "",
    sets: "",
    reps: "",
    duration: "",
  });

  const [image, setimage] = useState({});
  const [image_url, setimage_ur] = useState('');

  const switchToEdit = ()=>{

    setexerice({
      name: clicked.name,
      sets: clicked.sets.toString(),
      reps: clicked.reps.toString(),
      duration: clicked.duration.toString()
    })
    setimage_ur(clicked.image)
    seteditMode(true)
  }

 


  const setValues = (e) => {
    setexerice({ ...exercise, [e.target.name]: e.target.value });
  };

  const [addClicked, setaddClicked] = useState(true);

  const convertToSlug = (input) => {
    let slug = input.toLowerCase();
    slug = slug.replace(/[^\w\s-]/g, "");
    slug = slug.replace(/\s+/g, "-");
    slug = slug.replace(/--+/g, "-");
    slug = slug.replace(/^-+|-+$/g, "");
    const randomString = Math.random().toString(36).substring(2, 6);
    const finalSlug = `${slug}-${randomString}`;
    return finalSlug;
  };

  const handleSubmit = async () => {
    if (!image?.name) return alert("Image is required!");
    
       const imageKey = convertToSlug(exercise.name);

      await Storage.put(imageKey, image);

      const url = await Storage.get(imageKey,{
        level: "public"
    });

    DataStore.save(
      new Exercise({
        ...exercise,
        image: url,
        sets: parseInt(exercise.sets),
        reps: parseInt(exercise.reps),
        duration: parseInt(exercise.duration),
      })
    ).then(async (res) => {
      setexerice({
        name: "",
        sets: "",
        reps: "",
        duration: "",
      });
      setimage({});
      fetchall()
    });
  };


  const handleUpdateSubmit = async () => {
    if (!image?.name && image_url === "") return alert("Image is required here!");
    
    let url = image_url

    if(image.name){
       const imageKey = convertToSlug(exercise.name);

      await Storage.put(imageKey, image);
  
      url = await Storage.get(imageKey, {
        level: "public"
    });
    }

    await DataStore.save(Exercise.copyOf(clicked, (updated) => {
        updated.name = exercise.name
        updated.image = url
        updated.sets = parseInt(exercise.sets)
        updated.reps = parseInt(exercise.reps)
        updated.duration = parseInt(exercise.duration)
      }),
      
        setexerice({
          name: "",
          sets: "",
          reps: "",
          duration: "",
        }),
        setimage({}),
        fetchall()
    )
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

        {all.map((res) => (
          <div onClick={()=>{setClicked(res); setaddClicked(false); seteditMode(false) }} key={res.id} className="flex items-center  mx-auto border-b py-3 mb-3 border-gray-200 sm:flex-row flex-col cursor-pointer select-none ">
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
        {addClicked || editMode ? (
          <>
          <div className=" bg-white rounded-lg p-8 flex flex-col  w-full  relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
             {
              editMode ? "Edit execrise" : "Add new execrise"
             }
            </h2>
            <FormInput
              type="text"
              value={exercise.name}
              onChange={setValues}
              name="name"
              placeholder="Enter exercise name"
              label="Exercise name"
            />
            <FormInput
              type="number"
              value={exercise.reps}
              onChange={setValues}
              name="reps"
              placeholder="Enter number of reps"
              label="Reps"
            />
            <FormInput
              type="number"
              value={exercise.sets}
              onChange={setValues}
              name="sets"
              placeholder="Enter number of sets"
              label="Sets"
            />
            <FormInput
              type="number"
              value={exercise.duration}
              onChange={setValues}
              name="duration"
              placeholder="Enter estimate duration in seconds"
              label="Duration (secs)"
            />

            <div className="relative ">
              <label
                htmlFor={"images"}
                className="leading-7 text-sm text-gray-600"
              >
                {" "}
                Exercise Gif Image{" "}
              </label>
              <input
                type={"file"}
                id={"images"}
                name={"images"}
                placeholder={"Enter exercise GIF image"}
                onChange={(e) => setimage(e.target.files[0])}
                accept="image/x-png,image/gif,image/jpeg,image/webp"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
             {
              editMode ? 
              <button
              onClick={handleUpdateSubmit}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Update exercise
            </button>
            :
            <button
            onClick={handleSubmit}
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Add
          </button>
             }
           
          </div>
          </>
        ) : (
          <>
            <div className="flex w-full items-center justify-between"> 
              <div className="text font-bold ">
                Exercise information
              </div>  
              <div className="flex items-center gap-2">
                <div onClick={switchToEdit} className="cursor-pointer w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 ">
                 <AiOutlineEdit />
                </div>

                <div className="cursor-pointer w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-red-400 ">
                  <BsFillTrash3Fill/>
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
              <span className=" text-base text-gray-600">{clicked.name.toUpperCase()} </span>
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
              <span className=" text-base text-gray-600">{clicked.duration} secs </span>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default Exercises;
