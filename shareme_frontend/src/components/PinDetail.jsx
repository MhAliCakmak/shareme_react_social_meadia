import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";

import Spinner from "./Spinner";
const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query).then((res) => {
        setPinDetail(res[0]);
        if (res[0]) {
          const morePinQuery = pinDetailMorePinQuery(res[0]);
          if (morePinQuery) {
            client.fetch(morePinQuery).then((res) => {
              setPins(res);
            });
          }
        }
      });
    }
  };
  useEffect(() => {
    fetchPinDetails();
  }, []);

  if (!pinDetail) return <Spinner message="Loading pin..." />;

  return(
    <div className="flex xl-flex-row flex-col m-auto bg-white" style ={{maxWidth:"1500px",border:"32px"}}>
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={pinDetail?.image && urlFor(pinDetail.image).url() }
          alt={pinDetail?.image?.alt}
          className="rounded-t-3xl rounded-b-lg"
          />


      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
          <a
                  href={`${pinDetail.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                ><MdDownloadForOffline />
                </a>

          </div>
          <a href={pinDetail.destination} target="_blank" rel="noreferrer">
            {pinDetail.destination}
          </a>

        </div>
        <div >
          <h1 className="text-4xl font-bold break-words mt-3">
            {pinDetail.title}
          </h1>
          <p className=" mt-3">{pinDetail.about}</p>
        </div>
        <Link to={`/user-profile/${pinDetail.postedBy?._id}`} className="flex gap-2 mt-2 bg-white rounded-lg items-center">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={pinDetail.postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{pinDetail.postedBy?.userName}</p>
      </Link>
      <h2 className="mt-5 text-2xl">Comments</h2>
              
      <div className="max-h-370 overflow-y-wauto">
        {pinDetail?.comments?.map((comment,i) => (
          <div
            key={i}
            className="flex gap-2 mt-5 bg-white rounded-lg items-center "
          >
            <img
              className="w-10 h-10 rounded-full cursor-pointer"
              src={comment.posteBy.image}
              alt="user-profile"
            />



          </div>))
        }

      </div>
      </div>
    </div>
  )
};

export default PinDetail;
