import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Search from "./search";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const location=useLocation();
  
  useEffect(()=>{
    setSearchQuery("");
   },[location.pathname])

  const handleSearchChange = (query) => {
    setSearchQuery(query); 
  };


  return (
    <div className="flex md:flex-row flex-col bg-black py-5 min-h-screen text-white main-container">
      <Navbar className="w-full md:w-16 h-auto md:h-screen" />
      <div className=" flex flexing flex-col flex-1 main-container" id="main-body">
        <Search className="flex-shrink-0 p-4 padding" onSearchChange={handleSearchChange} searchQuery={searchQuery} />
        <div className="flexing flex-1  md:mt-8 px-16 overflow-auto">
          <Outlet context={{ searchQuery }}></Outlet>
        </div>
      </div>
    </div>
  )

}

export default Layout;