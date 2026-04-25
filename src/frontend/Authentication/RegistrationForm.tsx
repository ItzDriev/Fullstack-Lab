import React, { useState } from "react";
import { User, Key, Eye, EyeOff, KeyRound, Mail, BookUser } from "lucide-react";
import InputField from "../Components/InputField";
import BigButton from "../Components/BigButton";
import NavLink from "../Navigation/NavLink";

interface Props {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginForm({ setRegister }: Props) {
  const [passShown, setPassShown] = useState(false);

  return (
    <div className="flex justify-center items-center bg-[#051424]/80 shadow-[0_4px_12px_rgba(0,0,0,0.25),0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-lg border border-[#122030] w-1/4 min-h-3/4">
      {/*Cool red corners */}
      <div className="-top-3 -left-3 absolute border-red-500 border-t-2 border-l-2 w-20 h-20"></div>
      <div className="-right-3 -bottom-3 absolute border-red-500 border-r-2 border-b-2 w-20 h-20"></div>

      {/*The Form */}
      <div className="mt-7 w-44/50 h-45/50">
        <div className="pb-4 border-[#122030] border-b">
          <h1 className="text-white text-2xl">Register New User</h1>
          <h2 className="font-light text-red-400">PenisPenisPenis</h2>
        </div>

        <div className="mt-7 text-white">
          <label
            htmlFor="name"
            className="block mb-1 font-light text-[#94A3B8]"
          >
            Full Name
          </label>
          <div className="flex items-center gap-3 pb-3 border-[#122030] border-b">
            <BookUser className="text-[#94A3B8]" />
            <InputField
              id="name"
              placeholder={"Enter Full Name"}
              className="border-none w-full h-10"
            />
          </div>
        </div>
        <div className="mt-7 text-white">
          <label
            htmlFor="username"
            className="block mb-1 font-light text-[#94A3B8]"
          >
            Username
          </label>
          <div className="flex items-center gap-3 pb-3 border-[#122030] border-b">
            <User className="text-[#94A3B8]" />
            <InputField
              id="username"
              placeholder={"Enter Username"}
              className="border-none w-full h-10"
            />
          </div>
        </div>
        <div className="mt-7 text-white">
          <label
            htmlFor="email"
            className="block mb-1 font-light text-[#94A3B8]"
          >
            Email Address
          </label>
          <div className="flex items-center gap-3 pb-3 border-[#122030] border-b">
            <Mail className="text-[#94A3B8]" />
            <InputField
              id="email"
              placeholder={"Enter Email Address"}
              className="border-none w-full h-10"
            />
          </div>
        </div>
        <div className="mt-7 text-white">
          <label
            htmlFor="username"
            className="block mb-1 font-light text-[#94A3B8]"
          >
            Password
          </label>
          <div className="flex items-center gap-3 pb-3 border-[#122030] border-b">
            <KeyRound className="text-[#94A3B8]" />
            <InputField
              id="username"
              type={passShown ? "Text" : "Password"}
              placeholder={"Enter Password"}
              className="border-none w-full h-10"
            />
            <div
              className="flex justify-center ml-2 w-6 cursor-pointer"
              onClick={() => setPassShown(!passShown)}
            >
              {passShown ? (
                <i className="ml-2 text-[#94A3B8] text-xl cursor-pointer fa-fw fa-solid fa-eye" />
              ) : (
                <i className="ml-2 text-[#94A3B8] text-xl cursor-pointer fa-fw fa-sharp fa-solid fa-eye-slash" />
              )}
            </div>
          </div>
        </div>
        <BigButton text={"REGISTER"} className="mt-15" />

        <div className="flex justify-between items-center gap-3 mt-3 mb-10 pb-10 border-[#122030] border-b">
          <NavLink
            to={"/BIGBLACKBROLICDUDES"}
            text={"Recover Access"}
            className="text-[#94A3B8]! text-xs!"
          />
          <span
            className="px-2 py-1 rounded-xs text-[#94A3B8]! text-[1.2rem] text-xs! text-center cursor-pointer"
            onClick={() => setRegister(false)}
          >
            Login to User
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
