import React from "react";
import { useAuth } from "../context/AuthContext";
import ProfileIcon from "../Navigation/ProfileIcon";
import BigButton from "../Components/BigButton";

interface ProfileInfo {
  username?: string;
  userId?: string;
}

function ProfileHeader() {
  const { user } = useAuth();
  return (
    <header className="flex justify-start items-center mt-20 pb-10 border-(--navBG) border-b w-6/10 font-bold text-white">
      <ProfileIcon className="w-45! h-45! text-[400%]" />
      <div className="flex flex-col items-start w-1/2">
        <span className="text-5xl">{user?.username}</span>
        <span className="my-4">User ID: {user?.userId}</span>
        <BigButton text={"EDIT PROFILE"} className="p-3! tracking-widest!" />
      </div>
    </header>
  );
}

export default ProfileHeader;
