import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import UpcomingSessions from "./UpcomingSessions";
import SessionHistory from "./SessionHistory";
import ProfileHeader from "./ProfileHeader";
import {
  fetchProfile,
  fetchUpcomingSessions,
  fetchSessionHistory,
} from "./profileApi.ts";

interface ProfileData {
  fullName: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt: string;
}

function ProfilePage() {
  const { isLoggedIn, loading, updateProfilePicture } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [upcoming, setUpcoming] = useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/login");
      return;
    }

    if (isLoggedIn) {
      loadProfileData();
    }
  }, [isLoggedIn, loading, navigate]);

  async function loadProfileData() {
    const profileResult = await fetchProfile();
    if (profileResult.success) setProfile(profileResult.data);
    else setError(profileResult.error);

    const upcomingResult = await fetchUpcomingSessions();
    if (upcomingResult.success) setUpcoming(upcomingResult.data);

    const historyResult = await fetchSessionHistory();
    if (historyResult.success) setHistory(historyResult.data);
  }

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be smaller than 2MB");
      return;
    }

    setUploading(true);
    setError("");

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const success = await updateProfilePicture(base64);

      if (success) {
        setProfile((prev) =>
          prev ? { ...prev, profilePicture: base64 } : null,
        );
      } else {
        setError("Failed to upload picture");
      }
      setUploading(false);
    };

    reader.onerror = () => {
      setError("Failed to read file");
      setUploading(false);
    };

    reader.readAsDataURL(file);
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
      <main className="w-full min-h-[calc(100vh-4rem)] bg-(--mainBG) flex flex-col items-center">
        <ProfileHeader
          uploading={uploading}
          onAvatarClick={handleAvatarClick}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}

        <section className="flex gap-40 mt-20">
          <UpcomingSessions sessions={upcoming} />
          <SessionHistory sessions={history} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ProfilePage;
