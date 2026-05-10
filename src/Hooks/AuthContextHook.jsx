import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const authContext = use(AuthContext);
  return authContext;
};

export default useAuth;
