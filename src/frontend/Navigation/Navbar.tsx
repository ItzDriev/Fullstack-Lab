//import { useState } from "react";
import { useState } from "react";
import NavLink from "./NavLink.tsx";
import NavLinkDropDown from "./NavLinkDropDown.tsx";
import BigButton from "../Components/BigButton.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const hoverEffects =
    "relative after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-red-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-red-500 transition-colors duration-300";

  const sidebarNavLinkStyle = " pt-5";

  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  //track if burger menu is open
  //const [isOpen, setIsOpen] = useState(false);

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
        {/*The hidden applies to all screen sizes but the md:flex overrides it at screens >=768px the flex basically makes it visible */}
        <nav className="hidden md:flex items-center gap-10 mr-40 h-full">
          <NavLink to={"/"} text={"Home"} className={hoverEffects} />
          <NavLink
            to={"/BIGBLACKBROLICDUDES"}
            text={"Services"}
            className={hoverEffects}
          />
          <NavLink
            to={"/BIGBLACKBROLICDUDES"}
            text={"About"}
            className={hoverEffects}
          />
          <NavLink
            to={"/BIGBLACKBROLICDUDES"}
            text={"Contact"}
            className={hoverEffects}
          />
        </nav>

        <BigButton
          text={isLoggedIn ? "Logout" : "Login"}
          className="shadow-none mr-8 px-2! py-2! text-sm!"
          onClick={isLoggedIn ? logout : () => navigate("/login")}
        />

        {/*THe burger Menu */}
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
      {/*Mobile Sidebar */}
      <nav
        className={`fixed flex justify-center top-16 right-0 h-full w-[50%] bg-(--navBG) z-50 transform transition-transform duration-300 ease-in-out md:hidden ${navOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col">
          <NavLink
            to={"/"}
            text={"Home"}
            className={hoverEffects + sidebarNavLinkStyle}
          />
          <NavLink
            to={"/BIGBLACKBROLICDUDES"}
            text={"About"}
            className={hoverEffects + sidebarNavLinkStyle}
          />
          {/* Only render dropdown items when hovered */}
          <NavLinkDropDown
            text="WoW"
            className={hoverEffects + sidebarNavLinkStyle}
          ></NavLinkDropDown>
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
