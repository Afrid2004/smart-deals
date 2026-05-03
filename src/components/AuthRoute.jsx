import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import { Navigate, useLocation } from "react-router";

const AuthRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
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
