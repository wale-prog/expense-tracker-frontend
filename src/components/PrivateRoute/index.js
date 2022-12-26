import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userStatus = JSON.parse(localStorage.getItem("login"));
    
  return userStatus ? children : <Navigate to="/login" />;
  
};

export default PrivateRoute;