import axios from "axios";
import React from "react";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const AxiosSecureHook = () => {
  axiosInstance.interceptors.request.use((config) => {
    config.headers.athorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  });
  return axiosInstance;
};

export default AxiosSecureHook;
