

import { Navigate, useLocation } from "react-router";
import AuthContext from "../context/AuthContext";
import { use } from "react";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = use(AuthContext);
  if (loading) {
    return (
      <span className="loading loading-spinner loading-xl text-lime-400 my-auto">loading from PrivateRoute </span>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate state={location?.pathname} to={"/login"} />;
};

export default PrivateRoute;
