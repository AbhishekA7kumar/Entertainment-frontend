import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toggleMovieBookmark, toggleTVSeriesBookmark } from "../Content/api";
import { MEDIA_TYPE } from "../../constants";

export function Bookmark({ bookmark, media_type, id }) {
  useEffect(() => {
    setIsBookmarked(bookmark);
  }, [bookmark]);

  const [isBookmarked, setIsBookmarked] = useState(bookmark || false);

  const bookmarkContent = (event) => {
    event.stopPropagation();
    if (media_type === MEDIA_TYPE.MOVIES) {
      toggleMovieBookmark(id, isBookmarked).then(({ result }) => {
        setIsBookmarked(result.bookmark);
      });
    } else if (media_type === MEDIA_TYPE.TV_SERIES) {
      toggleTVSeriesBookmark(id, isBookmarked).then(({ result }) => {
        setIsBookmarked(result.bookmark);
      });
    }
  };

  return (
    <span
      onClick={bookmarkContent}
      className="top-2 right-2 absolute flex flex-row-reverse bg-black bg-opacity-75 p-2.5 rounded-full cursor-pointer"
    >
      {isBookmarked ? (
        <FaBookmark className="text-white" />
      ) : (
        <FaRegBookmark className="text-white" />
      )}
    </span>
  );
}
