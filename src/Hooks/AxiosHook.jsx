import axios from "axios";
import React from "react";
const axiosInstance = axios.create({
  baseURL: "https://smart-deals-backend-989k.onrender.com",
});

const AxiosHook = () => {
  return axiosInstance;
};

export default AxiosHook;
