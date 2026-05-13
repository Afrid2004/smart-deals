import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./AuthContextHook";
import { useNavigate } from "react-router";
const axiosInstance = axios.create({
  baseURL: "https://smart-deals-backend-989k.onrender.com",
});

const AxiosSecureHook = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //axios request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
    );

    //axios response interceptor for error handling
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          navigate("/", { replace: true });
        }
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.request.eject(responseInterceptor);
    };
  }, [user, navigate]);

  return axiosInstance;
};

export default AxiosSecureHook;
