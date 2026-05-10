import React, { use } from "react";
import Loading from "./Loading";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/AuthContextHook";

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (user && user.emailVerified) {
    return (
      <Navigate to={location.state?.from?.pathname || "/"} replace></Navigate>
    );
  }
  return children;
};

export default AuthRoute;
