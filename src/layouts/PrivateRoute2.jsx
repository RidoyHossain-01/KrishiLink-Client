import React, { use } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router";



const PrivateRoute2 = ({ children }) => {
  const { user } = use(AuthContext);

  if (!user) {
    return children;
  }
  else{
    return <Navigate to={"/"} />;
  }
   
};

export default PrivateRoute2;