import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "./Loading";
import useAuth from "../Hooks/AuthContextHook";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (user && user.emailVerified) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/login"></Navigate>;
};

export default PrivateRoute;
