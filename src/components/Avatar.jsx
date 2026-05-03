import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";

const Avatar = () => {
  const { user } = use(AuthContext);
  const name = user?.displayName || "User";
  const [first, last] = name.split(" ");
  const avatar = (first[0] || "") + (last ? last[0] : "");

  return user?.photoURL ? (
    <img
      src={user.photoURL}
      alt={user.displayName}
      className="w-10 h-10 rounded-full"
      title={user.displayName}
    />
  ) : (
    <div
      title={user.displayName}
      className="w-10 h-10 cursor-default gradient text-white flex items-center justify-center rounded-full"
    >
      {avatar}
    </div>
  );
};

export default Avatar;
