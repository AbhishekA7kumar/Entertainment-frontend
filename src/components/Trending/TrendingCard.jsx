import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { RiFilmFill } from "react-icons/ri";

import { toggleMovieBookmark } from "../Recommended/api";
import { BASE_IMAGE_URL } from "../../constants";

const TrendingCard = ({ id, bookmark,first_air_date, poster_path, title,name,release_date, adult, media_type }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookMarkClick = (event) => {
    event.stopPropagation();
    if (media_type === 'movie') {
      toggleMovieBookmark(id, bookmarked)
        .then((result) => {
          if (result.isSuccess) {
            setBookmarked(result.result.bookmark);
          } else {
           console.error('error', result);
          }
        });
    }
  }

  useEffect(() => {
    setBookmarked(bookmark);
  }, [bookmark]);

  return (
    <div className="bg-black shadow-lg rounded-lg w-96 text-white overflow-hidden trending-cart">
      <div className="relative">
        <img src={`${BASE_IMAGE_URL}/${poster_path}`} alt={title} className="w-full h-48 object-cover" />
        <div onClick={handleBookMarkClick} className="top-2 right-2 absolute bg-black bg-opacity-75 p-2.5 rounded-full cursor-pointer">
          {bookmarked ? (
            <FaBookmark className="text-white" />
          ) : (
            <FaRegBookmark className="text-white" />
          )}
        </div>
        <div className="bottom-2 left-2 absolute bg-transparent px-2 py-1 rounded text-black text-sm">
          <ul className="flex gap-4 px-2">
            <li className="flex items-center font-semibold text-white">
              <span className="mr-1">{}</span>
            </li>
            <li className="flex items-center font-semibold text-white">
              <RiFilmFill className="mr-1 text-white" />
              <span>{media_type.toUpperCase()}</span>
            </li>
            <li className="flex items-center font-semibold text-white">
              <span>{}</span>
            </li>
          </ul>
          <h3 className="mt-1 font-semibold text-lg text-white">{}</h3>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
