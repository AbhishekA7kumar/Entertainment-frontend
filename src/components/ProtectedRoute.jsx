import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { UnAuthorized } from "../pages/UnAuthorizedPage";
import WelcomeSpinner from './Loading/LoaderSpinner';
import { GeneralLoading } from './Loading/GeneralLoading';


const ProtectedRoute = () => {
  const location = useLocation();
  const { state } = useAuth();

  if (state.loading) {
    return <GeneralLoading/>
  }

  if (!state.isLoggedIn) {
    if (location.pathname === "/") {
      return <WelcomeSpinner />;
    }
    return <UnAuthorized/>;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
