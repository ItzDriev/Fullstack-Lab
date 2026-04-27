import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import UpcomingSessions from "./UpcomingSessions";
import SessionHistory from "./SessionHistory";
import ProfileHeader from "./ProfileHeader";

interface ProfileData {
  fullName: string;
  username: string;
  email: string;
  createdAt: string;
}

function ProfilePage() {
  const { isLoggedIn, loading } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/login");
      return;
    }

    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn, loading, navigate]);

  async function fetchProfile() {
    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        credentials: "include",
      });

      const res = await response.json();

      if (res.success) {
        setProfile(res.ProfileData);
      } else {
        setError(res.error);
      }
    } catch (e) {
      setError("Failed to load profile");
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="w-full h-[calc(100vh-4rem)] bg-(--mainBG) flex justify-center items-center">
          <p className="text-[#94A3B8]">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="w-full h-[calc(100vh-4rem)] bg-(--mainBG) flex flex-col items-center">
        <ProfileHeader />
        <section className="flex gap-40 mt-20">
          <UpcomingSessions />
          <SessionHistory />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ProfilePage;
