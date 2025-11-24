import React, { use } from "react";
import AuthContext from "../context/AuthContext";



const PrivateRoute2 = ({ children }) => {
  const { user } = use(AuthContext);

  if (!user) {
    return children;
  }
};

export default PrivateRoute2;