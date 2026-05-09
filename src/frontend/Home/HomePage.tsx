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
      <section className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
        {/* Background Image */}
        <img
          src="/Naxx.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Thee Blur Ovelray */}
        <div className="absolute inset-0 bg-(--mainBG)/75 backdrop-blur-[2px]" />

        {/* Cool Red Background Glow */}
        <div className="top-1/3 left-1/2 absolute bg-[radial-gradient(circle,rgba(255,40,40,0.06)_0%,transparent_70%)] w-200 h-100 -translate-x-1/2 -translate-y-1/2" />

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
          {/* Scroll indicator */}
          <div className="bottom-8 absolute flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[#4a6274] text-[10px] uppercase tracking-[0.2em]">
              Scroll
            </span>
            <ChevronDown className="w-4 h-4 text-[#4a6274]" />
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="w-full bg-(--mainBG) border-t border-[#1a2d42]">
        <div className="gap-8 grid grid-cols-4 mx-auto px-8 py-16 max-w-5xl">
          <StatBlock number="300+" label="Naxxramas Done" />
          <StatBlock number="Sub 38" label="Fastest Naxxramas" />
          <StatBlock number="#2" label="Ranked on Overall DPS leaderboard" />
          <StatBlock number="1629.7" label="Highest DPS" />
        </div>
      </section>
      {/* Why Choose Section */}
      <section className="w-full bg-(--mainBG)">
        <div className="mx-auto px-8 py-20 max-w-5xl">
          <div className="mb-16 text-center">
            <div className="flex justify-center gap-3 mb-4">
              <span className="bg-red-500 mt-1.5 rounded-full w-2 h-2 animate-pulse" />
              <span className="text-red-400 text-xs uppercase tracking-[0.3em]">
                Why Driev
              </span>
            </div>
            <h2 className="font-bold text-white text-4xl">
              What Sets me Apart?
            </h2>
          </div>

          <div className="gap-8 grid grid-cols-3">
            <WhyCard
              icon={<Trophy className="w-8 h-8" />}
              title="Proven Track Record"
              description="Participated in multple high end speedruns and currently ranked #2 on the Naxxramas Overall DPS Leaderboard"
            />
            <WhyCard
              icon={<Swords className="w-8 h-8" />}
              title="Hands-On Approach"
              description="No generic guides or recycled advice. Every session is tailored to your spec and skill level with appropriate feedback you can apply immediately."
            />
            <WhyCard
              icon={<Shield className="w-8 h-8" />}
              title="Results Guaranteed"
              description="You are guaranteed to see improvement towards your goals as long as you put in the work and apply the critique"
            />
          </div>
        </div>
      </section>
      {/* Kinda Useless Balast Section but it looks cool i guess */}
      <section className="w-full bg-(--mainBG) border-t border-[#1a2d42]">
        <div className="mx-auto px-8 py-20 max-w-3xl text-center">
          <h2 className="mb-4 font-bold text-white text-4xl">
            Ready to BALAST?
          </h2>
          <p className="mb-10 text-[#94A3B8] text-lg">
            Whether you're new, intermediate or experienced, there's a plan
            built for you!
          </p>
          <BigButton
            text={isLoggedIn ? "Browse Services" : "Start Now"}
            className="mx-auto py-4! max-w-xs!"
            onClick={() => navigate(isLoggedIn ? "/services" : "/login")}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default HomePage;
