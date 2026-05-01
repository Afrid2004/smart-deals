import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex bg-white justify-center items-center h-screen">
      <div className="flex justify-center items-center flex-col gap-3 max-w-sm">
        <h1 className="text-8xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-500 font-medium text-center">
          Oops, This Page Not Found!
        </p>
        <p className="text-gray-700 font-medium text-center">
          The link may be corrupted or the page may have been removed.
        </p>
        <Link
          to="/"
          className="px-4 py-2 items-center gap-2 flex rounded-4xl bg-gray-800 text-white hover:bg-gray-900"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
