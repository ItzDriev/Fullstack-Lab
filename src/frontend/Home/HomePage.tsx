import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Shield, Swords, Trophy, ChevronDown } from "lucide-react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import BigButton from "../Components/BigButton";
import WhyCard from "./WhyCard";
import StatBlock from "./StatBlock";

function HomePage() {
  const { isLoggedIn, user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/Naxx.png')" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-(--mainBG)/75 backdrop-blur-[2px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Red glow */}
        <div className="top-1/3 left-1/2 absolute bg-[radial-gradient(circle,rgba(255,40,40,0.06)_0%,transparent_70%)] w-[800px] h-[400px] -translate-x-1/2 -translate-y-1/2" />

        {/* Hero Content */}
        <div className="z-10 relative flex flex-col justify-center items-center px-8 h-full text-center">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-green-500 rounded-full w-2 h-2 animate-pulse" />
                <span className="text-green-400 text-xs uppercase tracking-[0.3em]">
                  Session Active
                </span>
              </div>

              <h1 className="mb-4 font-bold text-white text-6xl tracking-tight">
                Welcome back, {user?.username}
              </h1>
              <p className="mb-10 max-w-xl text-[#94A3B8] text-lg">
                Ready to continue your journey? Check your upcoming sessions or
                browse new coaching packages.
              </p>

              <div className="flex gap-4">
                <BigButton
                  text="My Profile"
                  className="px-8! py-3! text-sm!"
                  onClick={() => navigate("/profile")}
                />
                <button
                  onClick={() => navigate("/services")}
                  className="px-8 py-3 border border-[#1a2d42] hover:border-red-500/40 font-bold text-[#94A3B8] hover:text-white text-sm uppercase tracking-widest transition-all cursor-pointer"
                >
                  Browse Services
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-red-500 rounded-full w-2 h-2 animate-pulse" />
                <span className="text-red-400 text-xs uppercase tracking-[0.3em]">
                  Now Accepting Students
                </span>
              </div>

              <h1 className="mb-2 font-bold text-white text-7xl tracking-tight">
                DRIEV COACHING
              </h1>
              <p className="mb-4 max-w-2xl text-[#94A3B8] text-xl">
                Top-tier World of Warcraft coaching from a player who's been at
                the highest level. VOD reviews, hands-on sessions, and
                personalized improvement plans.
              </p>
              <p className="mb-10 text-[#4a6274] text-sm uppercase tracking-wider">
                Top Classic Warrior · Speedrunning Experience · Extensive
                Knowledge
              </p>

              <div className="flex gap-4">
                <BigButton
                  text="Get Started"
                  className="px-10! py-4! text-sm!"
                  onClick={() => navigate("/login")}
                />
                <button
                  onClick={() => navigate("/services")}
                  className="px-10 py-4 border border-[#1a2d42] hover:border-red-500/40 font-bold text-[#94A3B8] hover:text-white text-sm uppercase tracking-widest transition-all cursor-pointer"
                >
                  View Services
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
