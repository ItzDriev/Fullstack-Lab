import { useState } from "react";
import { Eye, Gamepad2, Star, Zap, Target, Monitor } from "lucide-react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import { vodTiers, handsonTiers } from "./serviceTiers.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ServiceTab from "./ServiceTab";
import FeatureCard from "./FeatureCard";
import PricingCard from "./PricingCard";

function ServicesPage() {
  const [activeTab, setActiveTab] = useState<"vod" | "handson">("vod");
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Navbar />
      <main className="relative w-full min-h-screen bg-(--mainBG) pt-4">
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="z-10 relative mx-auto px-8 py-10 max-w-5xl text-center">
            <div className="flex justify-center gap-3 mb-6">
              <span className="bg-red-500 mt-2 rounded-full w-2 h-2 animate-pulse" />
              <span className="text-red-400 text-sm uppercase tracking-[0.3em]">
                Level Up Your Game
              </span>
            </div>

            <h1 className="font-bold text-white text-5xl">
              Available Services
            </h1>
          </div>
        </section>

        {/* Service Type Selector */}
        <section className="mx-auto px-8 max-w-5xl">
          <div className="flex gap-4 mb-12">
            <ServiceTab
              icon={<Eye className="w-5 h-5" />}
              label="VOD Review"
              description="Expert analysis of your recorded gameplay"
              active={activeTab === "vod"}
              onClick={() => setActiveTab("vod")}
            />
            <ServiceTab
              icon={<Gamepad2 className="w-5 h-5" />}
              label="Hands-On Coaching"
              description="Live 1-on-1 sessions with a coach"
              active={activeTab === "handson"}
              onClick={() => setActiveTab("handson")}
            />
          </div>
        </section>

        {/* What's Included */}
        <section className="mx-auto mb-12 px-8 max-w-5xl">
          {activeTab === "vod" ? (
            <div className="gap-4 grid grid-cols-4">
              <FeatureCard
                icon={<Monitor className="w-6 h-6" />}
                title="Video Analysis"
                text="Frame-by-frame breakdown of key moments"
              />
              <FeatureCard
                icon={<Target className="w-6 h-6" />}
                title="Mistake Identification"
                text="Pinpoint exactly where you're going wrong"
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="Actionable Tips"
                text="Concrete steps to fix each issue"
              />
              <FeatureCard
                icon={<Star className="w-6 h-6" />}
                title="Appropriate Advice"
                text="Advice given is tailored to your skill leevel"
              />
            </div>
          ) : (
            <div className="gap-4 grid grid-cols-4">
              <FeatureCard
                icon={<Gamepad2 className="w-6 h-6" />}
                title="Live Gameplay"
                text="Coach watches and guides in real-time"
              />
              <FeatureCard
                icon={<Target className="w-6 h-6" />}
                title="Custom Drills"
                text="Practice routines built for your weaknesses"
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="Instant Feedback"
                text="No delay — corrections happen mid-round"
              />
              <FeatureCard
                icon={<Star className="w-6 h-6" />}
                title="Accountability"
                text="Scheduled sessions keep you on track"
              />
            </div>
          )}
        </section>

        {/* Pricing Cards */}
        <section className="mx-auto px-8 pb-20 max-w-5xl">
          <div className="gap-6 grid grid-cols-3">
            {(activeTab === "vod" ? vodTiers : handsonTiers).map((tier) => (
              <PricingCard
                key={tier.name}
                tier={tier}
                onSelect={() => {
                  if (isLoggedIn) {
                    navigate("/dashboard");
                  } else {
                    navigate("/login");
                  }
                }}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ServicesPage;
