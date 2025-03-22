import React from "react";
import { RiFilmFill } from "react-icons/ri";
import { BASE_IMAGE_URL } from "../../constants";
// import { Bookmark } from "../../components/common-media/Bookmark";
// import styles from "../../components/common-media/content.module.css";
// import {v4 as uuidv4} from 'uuid';

// This card is the wider card used compared to other cards. These cards are placed first.
const TrendingCard = ({ id, poster_path, bookmark, name, title,first_air_date  ,release_date, adult,media_type}) => {
  // console.log(media_type);
  return (

    <div className="bg-black shadow-lg rounded-lg w-96 text-white overflow-hidden trending-cart ">

      <div className="relative">
        <img src={`${BASE_IMAGE_URL}/${poster_path}`} alt={title} className="w-full h-48 object-cover" />
        {/* <Bookmark
          className={styles.bookmark}
          id={id} bookmark={bookmark} media_type={media_type} key={uuidv4()}></Bookmark> */}
          <div className="absolute inset-0 bg-black bg-opacity-25 hover:bg-opacity-0"></div>
        <div className="bottom-2 left-2 absolute bg-transparent px-2 py-1 rounded text-black text-sm">
          <ul className="flex gap-4 px-2 pl-0">
            <li className="flex items-center font-semibold text-white">
              <span className="mr-1">{release_date?release_date.slice(0,4):first_air_date.slice(0,4)}</span>
            </li>
            <li className="flex items-center font-semibold text-white">
              <RiFilmFill className="mr-1 text-white" />
              <span>{media_type}</span>
            </li>
            <li className="flex items-center font-semibold text-white">
              <span>{adult?"PG":"UG"}</span>
            </li>
          </ul>
          <h3 className="mt-1 font-semibold text-lg text-white">{title?title:name}</h3>
        </div>
      </div>
     
    </div>
    
  );
   
};

export default TrendingCard;
