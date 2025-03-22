import { FaSearch } from "react-icons/fa";
import "../App.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export default function Search({ onSearchChange }) {
  const [input, setInput] = useState("");
  const location = useLocation();
  const handleInputChange = (e) => {
    const query = e.target.value;
    setInput(query);
    onSearchChange(query);
  };

  useEffect(() => {
    setInput("");
  }, [location.pathname]);

 

// re-rendering component when route changes
  useEffect(() => {
    setInput("");   /// resetting input field
  }, [location.pathname]);

  return (
    <div className="flex gap-2 justify-center  mt-4 ml-4 sm:justify-start sm:ml-8">
      <div>
        <FaSearch className="w-7 h-5 mt-3 text-white " />
      </div>
      <div>
        <input
          type="search"
          name="search"
          id="search"
          autoFocus
          onChange={handleInputChange}
          value={input}
          placeholder="Search for movies or TV series"
          className="h-10 w-full sm:w-96 min-w-[200px] text-xl bg-black text-white outline-none px-3"
        />
      </div>
    </div>
  );
}
