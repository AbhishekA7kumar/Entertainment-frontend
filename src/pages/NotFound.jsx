import { Link } from "react-router"

export function NotFound() {
    return (
      <div className="bg-black">
          <div className="flex flex-col justify-center items-center h-screen">
         <h1 className="text-6xl font-bold text-white">404</h1>
            {/* GIF comes first */}
            <img 
                src="tribal.gif" 
                alt="Not Found Animation" 
                className="w-[550px] mt-2"
            />

            {/* Text content */}
            <div className=" text-white text-2xl p-8 rounded-lg text-center">
               
                <p className="text-xl mt-4 font-bold">Oops! The page you're looking for doesn't exist.</p>
                <a href="/home"
                    className="text-blue-400 font-semibold mt-6 inline-block hover:underline">
                    Go Back to Homepage                
                </a>
            </div>
        </div>
      </div>
    );
};
