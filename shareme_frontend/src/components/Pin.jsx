import React from "react";
import { useNavigate } from "react-router-dom";
import { urlFor, client } from "../client";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCirclFill } from "react-icons/bs";

const Pin = ({ pin: { postedBY, image, _id, destination } }) => {
  const [postHovered, setPostHovered] = React.useState(false);
  const [savingPost, setSavingPost] = React.useState(false);

  const navigate = useNavigate();
  return (
    <div className="m-3">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      ></div>
      <img
        className="rounded-lg w-full "
        src={urlFor(image).width(250).url()}
        alt="user-post"
      />
      {postHovered && (
        <div
          className="absolute top-0 left-0 w-full h-full p-1 pr-2 pt-2 pb-2 z-50 flex flex-col justify-between "
          style={{ height: "100%" }}
        >
          <div className="flex flex-row justify-between items-center">
            <div className="flex gap-2">
              <a
                href={`${image?.asset?.url}?dl=`}
                download
                onClick={(e) => {
                  e.stopPropagation();
                
                }}
                className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline className="text-2xl text-white" />

              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pin;
