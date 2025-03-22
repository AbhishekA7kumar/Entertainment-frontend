import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";
import Bookmarks from "./pages/Bookmarks";
import HomePage from "./pages/HomePage";
import Movies from "./pages/Movies";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { AuthProvider } from "./store/auth";
import Logout from "./pages/Logout";
import Layout from "./components/Layout";
import Movie from "./pages/movie";
import ProtectedRoute from "./components/ProtectedRoute";
import TVSeries from "./pages/TvSeries";
import { SingleTVSerieis } from "./pages/TvSeries/SingleTVSeries";
import { NotFound } from "./pages/NotFound";
import { useEffect } from "react";
import WelcomeSpinner from "./components/Loading/LoaderSpinner";
const RouteChangeHandler = () => {
  const location = useLocation();

  useEffect(() => {
    console.info('Route changed to:', location.pathname);
    // You can perform actions like analytics tracking or logging
  }, [location]);

  return null; // This component doesn't render anything
};
function App() {

  return (
    <AuthProvider>
      <RouteChangeHandler />
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/bookmark" element={<Bookmarks />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-series" element={<TVSeries />} />
          </Route>
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tv/:id" element={<SingleTVSerieis />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<WelcomeSpinner />} />
        <Route path="*" element={ <NotFound/> }/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
