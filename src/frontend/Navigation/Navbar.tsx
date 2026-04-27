import { useState } from "react";
import NavLink from "./NavLink.tsx";
import BigButton from "../Components/BigButton.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileIcon from "./ProfileIcon.tsx";

function Navbar() {
  const location = useLocation();

  const hoverEffects =
    "relative after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-red-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-red-500 transition-colors duration-300";

  const activeStyle =
    "relative text-red-500 after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-red-500 after:scale-x-100";

  function getLinkStyle(path: string) {
    return location.pathname === path ? activeStyle : hoverEffects;
  }

  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <header className="flex justify-center h-16">
      <header
        className="box-border fixed top-0 left-0 flex justify-between items-center
        bg-(--navBG) border-red-500 border-b w-full h-16 z-20"
      >
        <NavLink
          to={"/"}
          className={"ml-8 md:ml-15 font-bold text-2xl!"}
          text="Driev Coaching"
        />

        <nav className="hidden md:flex items-center gap-10 h-full">
          <NavLink to={"/"} text={"Home"} className={getLinkStyle("/")} />
          <NavLink
            to={"/services"}
            text={"Services"}
            className={getLinkStyle("/services")}
          />
          <NavLink
            to={"/about"}
            text={"About"}
            className={getLinkStyle("/about")}
          />
          <NavLink
            to={"/contact"}
            text={"Contact"}
            className={getLinkStyle("/contact")}
          />
        </nav>

        {isLoggedIn ? (
          <ProfileIcon
            className="hover:outline-2 hover:outline-white"
            dropDown={true}
          />
        ) : (
          <BigButton
            text="Login"
            className="hidden md:block shadow-none mr-8 px-2! py-2! text-sm!"
            onClick={() => navigate("/login")}
          />
        )}

        <div
          className="md:hidden right-8 absolute flex flex-col justify-center space-y-1.5 cursor-pointer"
          onClick={toggleNav}
        >
          <span
            className={`w-9 h-0.75 bg-white transition-all duration-300 ${
              navOpen ? "rotate-45 translate-y-2.25" : ""
            }`}
          ></span>
          <span
            className={`w-9 h-0.75 bg-white transition-all duration-300 ${
              navOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-9 h-0.75 bg-white transition-all duration-300 ${
              navOpen ? "-rotate-45 -translate-y-2.25" : ""
            }`}
          ></span>
        </div>
      </header>

      <nav
        className={`fixed flex justify-center top-16 right-0 h-full w-[50%] bg-(--navBG) z-50 transform transition-transform duration-300 ease-in-out md:hidden ${navOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col">
          <NavLink to={"/"} text={"Home"} className={getLinkStyle("/")} />
          <NavLink
            to={"/services"}
            text={"Services"}
            className={getLinkStyle("/services")}
          />
          <NavLink
            to={"/about"}
            text={"About"}
            className={getLinkStyle("/about")}
          />
          <NavLink
            to={"/contact"}
            text={"Contact"}
            className={getLinkStyle("/contact")}
          />
        </div>
      </nav>

      <div
        className={`z-10 bg-black/50 backdrop-blur-xs w-full h-full fixed animate-fadeIn ${navOpen ? "" : "hidden"}`}
        onClick={toggleNav}
      ></div>
    </header>
  );
}

export default Navbar;
