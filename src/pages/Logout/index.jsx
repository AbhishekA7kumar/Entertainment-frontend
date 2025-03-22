import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../store/auth";
import logoutUserApi from "./api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ToastContext";
import WelcomeSpinner from "../../components/Loading/LoaderSpinner";

function Logout() {
  const [showContent, setShowContent] = useState(false);

  const { logout, state } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast(); 
  const hasLoggedOut = useRef(false); //using ref hook to check logout state

  useEffect(() => {
    const logoutUser = async () => {
      if (hasLoggedOut.current) return; // if it is true it simply returns ;
      hasLoggedOut.current = true;

      try {
        const result = await logoutUserApi();
        if (result.isSuccess) {
          addToast("Logged out successfully!", "success");
          setShowContent(true); 
        } else {
          addToast(result.message || "Logout failed. Please try again.", "error"); 
        }
      } catch (error) {
        console.error(error);
        addToast("An unexpected error occurred during logout.", "error"); 
      } finally {
        logout();
      }
    };

    logoutUser();
  }, [logout, navigate, state.token, addToast]);

  if (showContent) {
    return <WelcomeSpinner/>; 
  }

  return null; 
}

export default Logout;
