import React, { useEffect, useState } from "react";
import './LoaderSpinner.css'
import { useNavigate } from "react-router";
import { useAuth } from "../../store/auth";
import LandingPage from "../LandingPage/LandingPage";

const WelcomeSpinner = () => {

  const { state } = useAuth();
  const [countdown, setCountdown] = useState(3);
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
    if (state.isLoggedIn) {
      navigate("/home");
    }else {
      return <LandingPage/>
    }
  }
 
  return (
    <div className="spinnerdiv">
        <span className="spinnercontent">FlixHub</span>
    </div>
  );
};

export default WelcomeSpinner;
