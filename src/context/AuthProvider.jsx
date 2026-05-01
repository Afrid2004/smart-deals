import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userValue = {
    user,
    setUser,
    loading,
  };

  return <AuthContext value={userValue}>{children}</AuthContext>;
};

export default AuthProvider;
