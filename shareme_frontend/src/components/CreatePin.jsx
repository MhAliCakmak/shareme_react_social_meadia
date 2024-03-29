import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import { categories } from "../utils/data";
import { client } from "../client";
import Spinner from "./Spinner";

const CreatePin = ({user}) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCatergory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();
  const savePin=() =>{

    if (title && about && destination && category && imageAsset?._id) {
    const doc = {
      _type: "pin",
      title,
      about,
      destination,
      image:{
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset?._id,
        },
      },
      userId: user._id,
      postedBy:{
        _type: "postedBy",
        _ref:user._id
      },
      category,
      }
      client.create(doc).then((res) => {
        navigate("/");
      }
      ).catch((err) => {
        console.log("Error: ", err);
      }
      );

    }else{
      setFields(true);
      setTimeout(() => setFields(false),2000)
    }
   
  }
  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    const fileTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (fileTypes.includes(type)) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((imageAsset) => {
          setImageAsset(imageAsset);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Image upload error: ",err);
          setLoading(false);
        });
    } else {
      setWrongImageType(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields.
        </p>
      )}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && (
              <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
                Please upload a valid image.
              </p>
            )}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high-quality JPG, SVG ,PNG, GIF or TIFF less than 20 MB
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => uploadImage(e)}
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img src={imageAsset.url} alt="pin" className="h-full" />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 bg-black text-white text-xl rounded-full cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />

                </button>
              </div>
              
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
            <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Pin is about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="url"
            vlaue={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
          <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Pin Category</p>
           <select
            onChange={(e) => setCatergory(e.target.value)}
            className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
           >
             <option value="others" className="sm:text-bg border-0 outline-none bg-white">Select Category</option>
            {
              categories.map((item) => (
                <option value={item.name} className="text-base border-0 outline-none capitalize bg-white text-black" >{item.name}</option>
              ))
            }
           </select>
           </div>
           <div className="flex justify-end items-end mt-5">
            <button
              type="button"
              onClick={savePin}
              className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
            >
              Save
            </button>
           </div>
                
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
