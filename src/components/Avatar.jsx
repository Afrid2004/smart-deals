import React, { use } from "react";
import useAuth from "../Hooks/AuthContextHook";

const Avatar = () => {
  const { user } = useAuth();
  const name = user?.displayName || "User";
  const [first, last] = name.split(" ");
  const avatar = (first[0] || "") + (last ? last[0] : "");

  return user?.photoURL ? (
    <div className="flex items-center gap-2 bg-gray-200/70 border border-gray-200 p-2 rounded-sm md:bg-transparent md:border-0 md:p-0">
      <img
        src={user?.photoURL}
        alt={user?.displayName}
        className="w-10 h-10 rounded-full"
        title={user?.displayName}
      />
      <div className="md:hidden">
        <p className="font-medium">{user?.displayName}</p>
        <p className="text-sm">{user?.email}</p>
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-2 bg-gray-200/70 border border-gray-200 p-2 rounded-sm md:bg-transparent md:border-0 md:p-0">
      <div
        title={user?.displayName}
        className="w-10 h-10 gradient text-white flex items-center justify-center rounded-full"
      >
        {avatar}
      </div>
      <div className="md:hidden">
        <p className="font-medium">{user?.displayName}</p>
        <p className="text-sm">{user?.email}</p>
      </div>
    </div>
  );
};

export default Avatar;
