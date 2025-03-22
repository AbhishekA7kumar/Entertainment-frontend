import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeSpinner from "../components/Loading/LoaderSpinner";

export function UnAuthorized() {
    const [countdown, setCountdown] = useState(5);
    const [showContent, setShowContent] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Countdown function
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setShowContent(true); 
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);  
    }, [navigate]);

    if (showContent) {
        return <WelcomeSpinner/>; 
      }

    return (
        <div className="bg-black">
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-6xl font-bold text-white">401 Unauthorized</h1>
                <img 
                    src="401.gif"   
                    alt="Unauthorized animation" 
                    className="w-[450px] mt-4"
                />
                {/* Text content */}
                <div className="text-white text-2xl p-8 rounded-lg text-center">
                    <p className="text-xl mt-4 font-bold">
                        You do not have access to this page, redirecting to the login page in <span className="text-userHover">{countdown}s</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
