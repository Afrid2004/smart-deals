import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center bg-gray-100">
      <div className="flex items-center justify-center gap-2">
        <p className="text-xl">Loading</p>
        <div className="w-4.5 h-4.5 border-2 border-black border-t-black/30 border-r-black/30 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
