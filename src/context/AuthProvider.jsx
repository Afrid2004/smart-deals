import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  //create user
  const creteUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login user
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout user
  const logout = () => {
    return signOut(auth);
  };

  //signin with google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //email verification
  const emailVerify = () => {
    return sendEmailVerification(auth.currentUser);
  };

  //password reset
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //updateProfile
  const updateUser = (userDetails) => {
    return updateProfile(auth.currentUser, userDetails);
  };

  //observe user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      //get JWT token
      if (currentUser) {
        const email = { email: currentUser.email };
        fetch("https://smart-deals-backend-server.vercel.app/get-jwt-token", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(email),
        })
          .then((res) => res.json())
          .then((data) => localStorage.setItem("token", data.token))
          .catch((err) => console.log(err.message));
      } else {
        localStorage.removeItem("token");
      }
      //get JWT token

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const userValue = {
    user,
    setUser,
    loading,
    creteUser,
    login,
    logout,
    signInWithGoogle,
    emailVerify,
    resetPassword,
    updateUser,
  };

  return <AuthContext value={userValue}>{children}</AuthContext>;
};

export default AuthProvider;
