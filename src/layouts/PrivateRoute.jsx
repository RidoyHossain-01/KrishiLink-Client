import { Navigate, useLocation } from "react-router";
import AuthContext from "../context/AuthContext";
import { use } from "react";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = use(AuthContext);
  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }

  return <Navigate state={location?.pathname} to={"/login"} />;
};

export default PrivateRoute;
