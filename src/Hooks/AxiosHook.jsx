import axios from "axios";
import React from "react";
const axiosInstance = axios.create({
  baseURL: "https://smart-deals-backend-server.vercel.app",
});

const AxiosHook = () => {
  return axiosInstance;
};

export default AxiosHook;
