import React, { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import BigButton from "../Components/BigButton";
import { Camera } from "lucide-react";

interface ProfileHeaderProps {
  uploading: boolean;
  onAvatarClick: () => void;
}

function ProfileHeader({ uploading, onAvatarClick }: ProfileHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="flex justify-start items-center mt-20 pb-10 border-(--navBG) border-b w-6/10 font-bold text-white">
      {/* Clickable Avatar */}
      <div
        className="group relative mr-8 cursor-pointer"
        onClick={onAvatarClick}
      >
        <div className="rounded-full w-45 h-45 overflow-hidden">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex justify-center items-center bg-red-500 w-full h-full text-[400%] select-none">
              {user?.username.charAt(0)}
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
          {uploading ? (
            <span className="text-white text-sm">Uploading...</span>
          ) : (
            <Camera className="w-10 h-10 text-white" />
          )}
        </div>
      </div>

      <div className="flex flex-col items-start w-1/2">
        <span className="text-5xl">{user?.username}</span>
        <span className="my-4">User ID: {user?.userId}</span>
        <BigButton text={"EDIT PROFILE"} className="p-3! tracking-widest!" />
      </div>
    </header>
  );
}

export default ProfileHeader;
